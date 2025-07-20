import { object_initialise, object_update } from './object.mjs'
import { matrix_initialise, matrix_inverse } from './matrix.mjs'


const camera_initialize = () => {
    const object = object_initialise()
    const camera = {
        ...object,
        projection_matrix: matrix_initialise(),
        view_matrix: matrix_initialise(),
        projection_view_matrix: matrix_initialise(),
    }
    return camera
}

const camera_update = (camera) => {
    object_update(camera)
    camera.view_matrix = matrix_inverse(camera.model_matrix)
}

export {
    camera_initialize,
    camera_update,
}
