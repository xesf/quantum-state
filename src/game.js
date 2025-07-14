import Renderer from './renderer.js'

class Game {
    constructor(config) {
        this.name = 'game'
        this.config = {
            renderer: {
                width: window.innerWidth,
                height: window.innerHeight,
                aspect: window.innerWidth / window.innerHeight,
                color: 0xcccccc,
                ...config?.renderer
            },
            ...config
        }
        this.is_running = false
        this.canvas = null
        this.renderer = null
    }

    async initialise() {
        const canvas = document.createElement('canvas')
        canvas.id = 'renderer'
        canvas.className = 'game-container'
        document.body.appendChild(canvas)

        this.canvas = canvas
        this.renderer = new Renderer(canvas, this.config.renderer)
        await this.renderer.initialise()
    }

    async run() {
    }

    set_size() {
        const width = window.innerWidth
        const height = window.innerHeight
        this.config.renderer.width = width
        this.config.renderer.height = height
        // this.renderer.set_size(width, height, this.camera)
    }

    pause() {
        this.is_running = false
    }

    resume() {
        this.is_running = true
    }
}

export default Game
