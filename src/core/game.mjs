import { ui_initialise, ui_draw_text, ui_clear } from './ui.mjs'
import { renderer_initialise } from './renderer.mjs'


const game_initialise = async () => {
    const game = {
        canvas: null,
        ui: null,
        renderer: null,
        is_running: false
    }

    game.renderer = await renderer_initialise()
    game.ui = ui_initialise()

    document.body.appendChild(game.renderer.canvas)
    document.body.appendChild(game.ui)

    return game
}

const game_run = (game) => {
    if (game.is_running) {
        return
    }

    game.is_running = true

    const game_loop = () => {
        if (!game.is_running) {
            return
        }
        const now = performance.now()
        const fps = 1000 / (now - (game.last_render_time || now))
        game.last_render_time = now

        ui_clear()
        ui_draw_text(
            10,
            window.innerHeight - 20,
            `FPS: ${Math.round(fps)}`,
            { color: 'blue', font: '16px Patua One' }
        )

        // ui_draw_text(
        //     10,
        //     20,
        //     `Quantum State`,
        //     { 
        //         color: 'white',
        //         font: '24px Patua One',
        //         shadow: true,
        //         background_color: 'rgba(0, 0, 0, 0.5)'
        //     }
        // )

        // game.renderer.render()
        requestAnimationFrame(game_loop)
    }

    requestAnimationFrame(game_loop)
}

const game_resize = (game, width, height) => {
    if (!game.canvas) {
        return
    }

    game.canvas.width = width
    game.canvas.height = height
    game.ui.width = width
    game.ui.height = height

    // game.renderer.set_size(game.canvas.width, game.canvas.height)
}

export {
    game_initialise,
    game_run,
    game_resize,
}
