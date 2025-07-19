import { matrix_initialise } from "./matrix.mjs";
import { vector_initialise } from "./vector.mjs";


const quartenion_initialise = () => {
    return {
        x: 0,
        y: 0,
        z: 0,
        w: 1
    };
}

const quartenion_multiply = (q1, q2) => {
    return {
        x: q1.x * q2.w + q1.y * q2.z - q1.z * q2.y + q1.w * q2.x,
        y: -q1.x * q2.z + q1.y * q2.w + q1.z * q2.x + q1.w * q2.y,
        z: q1.x * q2.y - q1.y * q2.x + q1.z * q2.w + q1.w * q2.z,
        w: -q1.x * q2.x - q1.y * q2.y - q1.z * q2.z + q1.w * q2.w
    };
}
const quartenion_conjugate = (q) => {
    return {
        x: -q.x,
        y: -q.y,
        z: -q.z,
        w: q.w
    };
}

const quartenion_normalise = (q) => {
    const length = Math.sqrt(q.x * q.x + q.y * q.y + q.z * q.z + q.w * q.w);
    if (length === 0) {
        return quartenion_initialise();
    }
    return {
        x: q.x / length,
        y: q.y / length,
        z: q.z / length,
        w: q.w / length
    };
}
const quartenion_to_matrix = (q) => {
    const x2 = q.x + q.x;
    const y2 = q.y + q.y;
    const z2 = q.z + q.z;

    const xx = q.x * x2;
    const xy = q.x * y2;
    const xz = q.x * z2;
    const yy = q.y * y2;
    const yz = q.y * z2;
    const zz = q.z * z2;
    const wx = q.w * x2;
    const wy = q.w * y2;
    const wz = q.w * z2;

    return matrix_initialise(
        1 - (yy + zz), xy + wz, xz - wy,
        xy - wz, 1 - (xx + zz), yz + wx,
        xz + wy, yz - wx, 1 - (xx + yy)
    );
}

const quartenion_to_vector = (q) => {
    return vector_initialise(q.x, q.y, q.z);
}

export {
    quartenion_initialise,
    quartenion_multiply,
    quartenion_conjugate,
    quartenion_normalise,
    quartenion_to_matrix,
    quartenion_to_vector
}
