import { vector_initialise, vector_subtract } from './vector.mjs'
import { quaternion_initialise, quaternion_look_at } from './quaternion.mjs'
import { matrix_initialise, matrix_compose } from './matrix.mjs'


const object_initialise = () => {
    const obj = {
        position: vector_initialise(0, 0, 0),
        rotation: quaternion_initialise(0, 0, 0, 1),
        scale: vector_initialise(1, 1, 1),
        model_matrix: matrix_initialise(),
        up: vector_initialise(0, 1, 0),
        parent: null,
        children: [],
        visible: true,
    }
    return obj
}

const object_add = (parent, child) => {
    if (!parent.children) {
        parent.children = []
    }
    parent.children.push(child)
    child.parent = parent
}

const object_remove = (parent, child) => {
    if (!parent.children) {
        return
    }
    const index = parent.children.indexOf(child)
    if (index > -1) {
        parent.children.splice(index, 1)
    }
    child.parent = null
}

const object_update = (obj) => {
    obj.model_matrix = matrix_compose(
        obj.position,
        obj.rotation,
        obj.scale
    )
    if (obj.parent) {
        obj.model_matrix = matrix_multiply(obj.parent.model_matrix, obj.model_matrix)
    }
    for (const child of obj.children) {
        object_update(child)
    }
}

const object_traverse = (obj, callback) => {
    if (callback(obj) === false) {
        return
    }
    for (const child of obj.children) {
        object_traverse(child, callback)
    }
}

const object_look_at = (obj, target) => {
    const direction = vector_subtract(target, obj.position)
    obj.rotation = quaternion_look_at(direction, obj.up)
    object_update_model_matrix(obj)
}

export {
    object_initialise,
    object_add,
    object_remove,
    object_update,
    object_traverse,
    object_look_at,
}
