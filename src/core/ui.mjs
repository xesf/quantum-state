let ui = null
let ui_context = null

const ui_initialise = () => {
    ui = document.createElement('canvas')

    ui.id = 'ui'
    ui.width = window.innerWidth
    ui.height = window.innerHeight
    ui.style.width = '100%'
    ui.style.height = '100%'
    ui.style.display = 'block'
    ui.style.position = 'absolute'
    ui.style.top = '0'
    ui.style.left = '0'
    ui.style.zIndex = '1'
    ui.style.pointerEvents = 'none'
    ui.style.userSelect = 'none'
    ui.style.touchAction = 'none'
    ui.style.overflow = 'hidden'
    ui.style.backgroundColor = 'transparent'
    ui.style.border = 'none'
    ui.style.outline = 'none'
    ui.style.boxSizing = 'border-box'
    ui.style.overflowX = 'hidden'
    ui.style.overflowY = 'hidden'
    ui.style.display = 'flex'
    ui.style.justifyContent = 'center'
    ui.style.alignItems = 'center'
    ui.style.imageRendering = 'pixelated'

    ui_context = ui.getContext('2d')

    return ui
}

const ui_draw_text = (x, y, text, { color = 'black', font = '16px patua one', shadow = false, background_color = 'transparent' } = {}) => {
    ui_context.fillStyle = background_color
    // semi transparent background
    ui_context.fillRect(x, y - parseInt(font), ui_context.measureText(text).width, parseInt(font))
    ui_context.fillStyle = color
    ui_context.font = font
    if (shadow) {
        ui_context.shadowColor = 'rgba(0, 0, 0, 0.5)'
        ui_context.shadowOffsetX = 1
        ui_context.shadowOffsetY = 1
        ui_context.shadowBlur = 2
    }
    ui_context.fillText(text, x, y)
}

const ui_clear = () => {
    ui_context.clearRect(0, 0, ui.width, ui.height)
}

export {
    ui_initialise,
    ui_draw_text,
    ui_clear,
}
