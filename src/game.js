
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

        this.initialise()
    }

    initialise() {
        const canvas = document.createElement('canvas')
        canvas.id = 'renderer'
        canvas.className = 'game-container'
        document.body.appendChild(canvas)

        this.canvas = canvas
    }

    run() {
    }

    set_size() {
    }

    pause() {
        this.is_running = false
    }

    resume() {
        this.is_running = true
    }
}

export default Game
