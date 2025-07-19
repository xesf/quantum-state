const RENDERER_CLEAR_COLOR = { r: 1.0, g: 1.0, b: 1.0, a: 1.0 };

const RENDERER_VERTICES = new Float32Array([
    0.0,  0.6, 0, 1, 0.5, 0.7, 0.5, 1,
    -0.5, -0.6, 0, 1, 0.5, 0.7, 0.5, 1,
    0.5, -0.6, 0, 1, 0.5, 0.7, 0.5, 1
]);

const RENDERER_DEFAULT_SHADERS = `
    struct vertex_out {
        @builtin(position) position : vec4f,
        @location(0) color : vec4f
    }

    @vertex
    fn vertex_main(
        @location(0) position: vec4f,
        @location(1) color: vec4f
    ) -> vertex_out
    {
        var output : vertex_out;
        output.position = position;
        output.color = color;
        return output;
    }

    @fragment
    fn fragment_main(
        frag_data: vertex_out
    ) -> @location(0) vec4f
    {
        return frag_data.color;
    }
`;

const renderer_create_canvas = () => {
    const canvas = document.createElement('canvas');

    canvas.id = 'renderer';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '0';

    return canvas;
};

const renderer_initialise = async () => {
    if (!navigator.gpu) {
        throw Error('WebGPU not supported!');
    }

    const adapter = await navigator.gpu.requestAdapter();
    if (!adapter) {
        throw Error('Couldn\'t request WebGPU adapter.');
    }

    const device = await adapter.requestDevice();
    const shader_module = device.createShaderModule({
        code: RENDERER_DEFAULT_SHADERS
    });

    const canvas = renderer_create_canvas();
    const context = canvas.getContext('webgpu');

    context.configure({
        device: device,
        format: navigator.gpu.getPreferredCanvasFormat(),
        alphaMode: 'premultiplied'
    });

    const vertex_buffer = device.createBuffer({
        size: RENDERER_VERTICES.byteLength,
        usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
    });

    device.queue.writeBuffer(vertex_buffer, 0, RENDERER_VERTICES, 0, RENDERER_VERTICES.length);

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
    }];

    const pipeline_descriptor = {
        vertex: {
            module: shader_module,
            entryPoint: 'vertex_main',
            buffers: vertex_buffers
        },
        fragment: {
            module: shader_module,
            entryPoint: 'fragment_main',
            targets: [{
                format: navigator.gpu.getPreferredCanvasFormat()
            }]
        },
        primitive: {
            topology: 'triangle-list'
        },
        layout: 'auto'
    };

    const render_pipeline = device.createRenderPipeline(pipeline_descriptor);
    const command_encoder = device.createCommandEncoder();

    const render_pass_descriptor = {
        colorAttachments: [{
            clearValue: RENDERER_CLEAR_COLOR,
            loadOp: 'clear',
            storeOp: 'store',
            view: context.getCurrentTexture().createView()
        }]
    };
    const pass_encoder = command_encoder.beginRenderPass(render_pass_descriptor);
    pass_encoder.setPipeline(render_pipeline);
    pass_encoder.setVertexBuffer(0, vertex_buffer);
    pass_encoder.draw(3);
    pass_encoder.end();

    device.queue.submit([command_encoder.finish()]);

    return {
        canvas,
        context,
        adapter,
        device,
        shader_module,
    };
};

export { 
    renderer_initialise,
};
