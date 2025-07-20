import { camera_initialize } from "./camera.mjs";
import { matrix_perspective } from "../math/matrix.mjs";

const perspective_camera_initialize = (fov, aspect, near, far) => {
    const camera = {
        ...camera_initialize(),
        fov: fov || 90,
        aspect: aspect || window.innerWidth / window.innerHeight,
        near: near || 0.1,
        far: far || 1000,
    }
    camera.projection_matrix = matrix_perspective(fov, aspect, near, far);
    return camera;
}

const perspective_camera_update = (camera) => {
    camera_update(camera);
    camera.projection_matrix = matrix_perspective(camera.fov, camera.aspect, camera.near, camera.far);
}

export {
    perspective_camera_initialize,
    perspective_camera_update,
}
