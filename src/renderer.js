
class Renderer {
    clear_color = { r: 1.0, g: 1.0, b: 1.0, a: 1.0 };

    vertices = new Float32Array([
        0.0,  0.6, 0, 1, 0.5, 0.7, 0.5, 1,
        -0.5, -0.6, 0, 1, 0.5, 0.7, 0.5, 1,
        0.5, -0.6, 0, 1, 0.5, 0.7, 0.5, 1
    ])

    default_shaders = `
        struct VertexOut {
            @builtin(position) position : vec4f,
            @location(0) color : vec4f
        }

        @vertex
        fn vertex_main(@location(0) position: vec4f,
                    @location(1) color: vec4f) -> VertexOut
        {
            var output : VertexOut;
            output.position = position;
            output.color = color;
            return output;
        }

        @fragment
        fn fragment_main(fragData: VertexOut) -> @location(0) vec4f
        {
            return fragData.color;
        }
    `;

    constructor(canvas, config) {
        this.canvas = canvas
        this.config = config || {
            width: window.innerWidth,
            height: window.innerHeight,
            aspect: window.innerWidth / window.innerHeight,
            clear_color: this.clear_color
        }
        this.adapter = null
        this.device = null
        this.shader_module = null
        this.context = null
    }

    async initialise() {
        if (!navigator.gpu) {
            throw Error('WebGPU not supported!')
        }

        this.adapter = await navigator.gpu.requestAdapter()
        if (!this.adapter) {
            throw Error('Couldn\'t request WebGPU adapter.')
        }

        this.device = await this.adapter.requestDevice()
        this.shader_module = this.device.createShaderModule({
            code: this.default_shaders
        })

        this.context = this.canvas.getContext('webgpu')

        this.context.configure({
            device: this.device,
            format: navigator.gpu.getPreferredCanvasFormat(),
            alphaMode: 'premultiplied'
        })

        const vertex_buffer = this.device.createBuffer({
            size: this.vertices.byteLength,
            usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
        })

        this.device.queue.writeBuffer(vertex_buffer, 0, this.vertices, 0, this.vertices.length)

        const vertex_buffers = [{
            attributes: [
                {
                    shaderLocation: 0, // position
                    offset: 0,
                    format: 'float32x4'
                },
                {
                    shaderLocation: 1, // color
                    offset: 16,
                    format: 'float32x4'
                }
            ],
            arrayStride: 32,
            stepMode: 'vertex'
        }]

        const pipeline_descriptor = {
            vertex: {
                module: this.shader_module,
                entryPoint: 'vertex_main',
                buffers: vertex_buffers
            },
            fragment: {
                module: this.shader_module,
                entryPoint: 'fragment_main',
                targets: [{
                    format: navigator.gpu.getPreferredCanvasFormat()
                }]
            },
            primitive: {
                topology: 'triangle-list'
            },
            layout: 'auto'
        }

        const render_pipeline = this.device.createRenderPipeline(pipeline_descriptor)
        const command_encoder = this.device.createCommandEncoder()

        const render_pass_descriptor = {
            colorAttachments: [{
                clearValue: this.clear_color,
                loadOp: 'clear',
                storeOp: 'store',
                view: this.context.getCurrentTexture().createView()
            }]
        }
        const pass_encoder = command_encoder.beginRenderPass(render_pass_descriptor)
        pass_encoder.setPipeline(render_pipeline)
        pass_encoder.setVertexBuffer(0, vertex_buffer)
        pass_encoder.draw(3)
        pass_encoder.end()

        this.device.queue.submit([command_encoder.finish()])
    }
}

export default Renderer;
