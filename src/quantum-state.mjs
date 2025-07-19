
import { game_initialise, game_run, game_resize } from './core/game.mjs'

const game = await game_initialise({
    renderer: {
        width: window.innerWidth,
        height: window.innerHeight,
        aspect: window.innerWidth / window.innerHeight,
        clear_color: [0.0, 0.0, 0.0, 1.0]
    }
})

window.addEventListener('resize', () => {
    game_resize(
        game,
        window.innerWidth,
        window.innerHeight
    )
})

game_run(game)
