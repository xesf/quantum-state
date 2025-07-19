
const matrix_initialise = () => {
    return {
        m01: 1, m02: 0, m03: 0,
        m11: 0, m12: 1, m13: 0,
        m21: 0, m22: 0, m23: 1,
        m31: 0, m32: 0, m33: 1
    }
}

const matrix_identity = () => {
    return {
        m01: 1, m02: 0, m03: 0,
        m11: 0, m12: 1, m13: 0,
        m21: 0, m22: 0, m23: 1,
        m31: 0, m32: 0, m33: 1
    }
}

const matrix_multiply = (m1, m2) => {
    return {
        m01: m1.m01 * m2.m01 + m1.m02 * m2.m11 + m1.m03 * m2.m21,
        m02: m1.m01 * m2.m02 + m1.m02 * m2.m12 + m1.m03 * m2.m22,
        m03: m1.m01 * m2.m03 + m1.m02 * m2.m13 + m1.m03 * m2.m23,
        m11: m1.m11 * m2.m01 + m1.m12 * m2.m11 + m1.m13 * m2.m21,
        m12: m1.m11 * m2.m02 + m1.m12 * m2.m12 + m1.m13 * m2.m22,
        m13: m1.m11 * m2.m03 + m1.m12 * m2.m13 + m1.m13 * m2.m23,
        m21: m1.m21 * m2.m01 + m1.m22 * m2.m11 + m1.m23 * m2.m21,
        m22: m1.m21 * m2.m02 + m1.m22 * m2.m12 + m1.m23 * m2.m22,
        m23: m1.m21 * m2.m03 + m1.m22 * m2.m13 + m1.m23 * m2.m23,
        m31: m1.m31 * m2.m01 + m1.m32 * m2.m11 + m1.m33 * m2.m21,
        m32: m1.m31 * m2.m02 + m1.m32 * m2.m12 + m1.m33 * m2.m22,
        m33: m1.m31 * m2.m03 + m1.m32 * m2.m13 + m1.m33 * m2.m23
    }
}

const matrix_transpose = (m) => {
    return {
        m01: m.m01, m02: m.m11, m03: m.m21,
        m11: m.m02, m12: m.m12, m13: m.m22,
        m21: m.m03, m22: m.m13, m23: m.m23,
        m31: m.m31, m32: m.m32, m33: m.m33
    }
}

const matrix_to_string = (m) => {
    return `(${m.m01}, ${m.m02}, ${m.m03})\n(${m.m11}, ${m.m12}, ${m.m13})\n(${m.m21}, ${m.m22}, ${m.m23})`
}

const matrix_clone = (m) => {
    return {
        m01: m.m01, m02: m.m02, m03: m.m03,
        m11: m.m11, m12: m.m12, m13: m.m13,
        m21: m.m21, m22: m.m22, m23: m.m23,
        m31: m.m31, m32: m.m32, m33: m.m33
    }
}

const matrix_scale = (m, sx, sy) => {
    return {
        m01: m.m01 * sx, m02: m.m02 * sy, m03: m.m03,
        m11: m.m11 * sx, m12: m.m12 * sy, m13: m.m13,
        m21: m.m21 * sx, m22: m.m22 * sy, m23: m.m23,
        m31: m.m31 * sx, m32: m.m32 * sy, m33: m.m33
    }
}

const matrix_translate = (m, tx, ty) => {
    return {
        m01: m.m01, m02: m.m02, m03: m.m03 + tx,
        m11: m.m11, m12: m.m12, m13: m.m13 + ty,
        m21: m.m21, m22: m.m22, m23: m.m23,
        m31: m.m31, m32: m.m32, m33: m.m33
    }
}

const matrix_rotate = (m, angle) => {
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)

    return {
        m01: m.m01 * cos - m.m02 * sin, m02: m.m01 * sin + m.m02 * cos, m03: m.m03,
        m11: m.m11 * cos - m.m12 * sin, m12: m.m11 * sin + m.m12 * cos, m13: m.m13,
        m21: m.m21 * cos - m.m22 * sin, m22: m.m21 * sin + m.m22 * cos, m23: m.m23,
        m31: m.m31 * cos - m.m32 * sin, m32: m.m31 * sin + m.m32 * cos, m33: m.m33
    }
}

const matrix_rotate_x = (m, angle) => {
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)
    return {
        m01: m.m01, m02: m.m02 * cos - m.m03 * sin, m03: m.m02 * sin + m.m03 * cos,
        m11: m.m11, m12: m.m12 * cos - m.m13 * sin, m13: m.m12 * sin + m.m13 * cos,
        m21: m.m21, m22: m.m22 * cos - m.m23 * sin, m23: m.m22 * sin + m.m23 * cos,
        m31: m.m31, m32: m.m32 * cos - m.m33 * sin, m33: m.m32 * sin + m.m33 * cos
    }
}

const matrix_rotate_y = (m, angle) => {
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)
    return {
        m01: m.m01 * cos + m.m03 * sin, m02: m.m02, m03: -m.m01 * sin + m.m03 * cos,
        m11: m.m11 * cos + m.m13 * sin, m12: m.m12, m13: -m.m11 * sin + m.m13 * cos,
        m21: m.m21 * cos + m.m23 * sin, m22: m.m22, m23: -m.m21 * sin + m.m23 * cos,
        m31: m.m31 * cos + m.m33 * sin, m32: m.m32, m33: -m.m31 * sin + m.m33 * cos
    }
}

const matrix_rotate_z = (m, angle) => {
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)
    return {
        m01: m.m01 * cos - m.m02 * sin, m02: m.m01 * sin + m.m02 * cos, m03: m.m03,
        m11: m.m11 * cos - m.m12 * sin, m12: m.m11 * sin + m.m12 * cos, m13: m.m13,
        m21: m.m21 * cos - m.m22 * sin, m22: m.m21 * sin + m.m22 * cos, m23: m.m23,
        m31: m.m31 * cos - m.m32 * sin, m32: m.m31 * sin + m.m32 * cos, m33: m.m33
    }
}

const matrix_determinant = (m) => {
    return m.m01 * (m.m12 * m.m23 - m.m13 * m.m22) -
           m.m02 * (m.m11 * m.m23 - m.m13 * m.m21) +
           m.m03 * (m.m11 * m.m22 - m.m12 * m.m21) +
           m.m31 * (m.m12 * m.m23 - m.m13 * m.m22) -
           m.m32 * (m.m11 * m.m23 - m.m13 * m.m21) +
           m.m33 * (m.m11 * m.m22 - m.m12 * m.m21)
}

const matrix_inverse = (m) => {
    const det = matrix_determinant(m)

    if (Math.abs(det) < 1e-6) {
        console.debug('math/matrix_inverse: Matrix is not invertible')
        return {
            m01: 0, m02: 0, m03: 0,
            m11: 0, m12: 0, m13: 0,
            m21: 0, m22: 0, m23: 0,
            m31: 0, m32: 0, m33: 0
        }
    }
    const invDet = 1 / det
    return {
        m01: (m.m12 * m.m23 - m.m13 * m.m22) * invDet,
        m02: (m.m03 * m.m22 - m.m02 * m.m23) * invDet,
        m03: (m.m02 * m.m13 - m.m03 * m.m12) * invDet,
        m11: (m.m13 * m.m21 - m.m11 * m.m23) * invDet,
        m12: (m.m01 * m.m23 - m.m03 * m.m21) * invDet,
        m13: (m.m03 * m.m11 - m.m01 * m.m13) * invDet,
        m21: (m.m11 * m.m22 - m.m12 * m.m21) * invDet,
        m22: (m.m02 * m.m21 - m.m01 * m.m22) * invDet,
        m23: (m.m01 * m.m12 - m.m02 * m.m11) * invDet
    }
}

const matrix_to_quartenion = (m) => {
    const trace = m.m01 + m.m12 + m.m23
    let x, y, z, w

    if (trace > 0) {
        const s = Math.sqrt(trace + 1.0) * 2
        w = 0.25 * s
        x = (m.m23 - m.m32) / s
        y = (m.m31 - m.m13) / s
        z = (m.m12 - m.m21) / s
    } else if (m.m01 > m.m12 && m.m01 > m.m23) {
        const s = Math.sqrt(1.0 + m.m01 - m.m12 - m.m23) * 2
        w = (m.m23 - m.m32) / s
        x = 0.25 * s
        y = (m.m12 + m.m21) / s
        z = (m.m31 + m.m13) / s
    } else if (m.m12 > m.m23) {
        const s = Math.sqrt(1.0 + m.m12 - m.m01 - m.m23) * 2
        w = (m.m31 - m.m13) / s
        x = (m.m12 + m.m21) / s
        y = 0.25 * s
        z = (m.m23 + m.m32) / s
    } else {
        const s = Math.sqrt(1.0 + m.m23 - m.m01 - m.m12) * 2
        w = (m.m12 - m.m21) / s
        x = (m.m31 + m.m13) / s
        y = (m.m23 + m.m32) / s
        z = 0.25 * s
    }

    return { x, y, z, w }
}

const matrix_perspective = (fov, aspect, near, far) => {
    const f = 1.0 / Math.tan(fov / 2)
    return {
        m01: f / aspect, m02: 0, m03: 0,
        m11: 0, m12: f, m13: 0,
        m21: 0, m22: 0, m23: (far + near) / (near - far),
        m31: 0, m32: 0, m33: (2 * far * near) / (near - far)
    }
}

const matrix_orthographic = (left, right, bottom, top, near, far) => {
    return {
        m01: 2 / (right - left), m02: 0, m03: -(right + left) / (right - left),
        m11: 0,
        m12: 2 / (top - bottom), m13: -(top + bottom) / (top - bottom),
        m21: 0, m22: 0,
        m23: -2 / (far - near),
        m31: 0, m32: 0, m33: -(far + near) / (far - near)
    }
}

const matrix_look_at = (eye, target, up) => {
    const z = vector_normalise(vector_subtract(eye, target))
    const x = vector_normalise(vector_cross(up, z))
    const y = vector_cross(z, x)

    return {
        m01: x.x, m02: y.x, m03: z.x, m04: 0,
        m11: x.y, m12: y.y, m13: z.y, m14: 0,
        m21: x.z, m22: y.z, m23: z.z, m24: 0,
        m31: -vector_dot(x, eye), m32: -vector_dot(y, eye), m33: -vector_dot(z, eye), m34: 1
    }
}

const matrix_compose = (position, quartenion, scale) => {
    const m = matrix_initialise();
    m.m01 = scale.x;
    m.m12 = scale.y;
    m.m23 = scale.z;
    m.m31 = position.x;
    m.m32 = position.y;
    m.m33 = position.z;
    const q = quartenion_to_matrix(quartenion);
    return matrix_multiply(m, q);
}

const matrix_normalise = (m) => {
    const length = Math.sqrt(m.m01 * m.m01 + m.m02 * m.m02 + m.m03 * m.m03 +
                            m.m11 * m.m11 +
                            m.m12 * m.m12 + m.m13 * m.m13 +
                            m.m21 * m.m21 + m.m22 * m.m22 + m.m23 * m.m23 +
                            m.m31 * m.m31 + m.m32 * m.m32 + m.m33 * m.m33);
    if (length === 0) {
        return matrix_initialise();
    }
    return {
        m01: m.m01 / length, m02: m.m02 / length,
        m03: m.m03 / length,
        m11: m.m11 / length, m12: m.m12 / length,
        m13: m.m13 / length,
        m21: m.m21 / length, m22: m.m22 / length,
        m23: m.m23 / length,
        m31: m.m31 / length, m32: m.m32 / length,
        m33: m.m33 / length
    }
}

export {
    matrix_initialise,
    matrix_identity,
    matrix_multiply,
    matrix_transpose,
    matrix_to_string,
    matrix_clone,
    matrix_scale,
    matrix_translate,
    matrix_rotate,
    matrix_rotate_x,
    matrix_rotate_y,
    matrix_rotate_z,
    matrix_determinant,
    matrix_inverse,
    matrix_to_quartenion,
    matrix_perspective,
    matrix_orthographic,
    matrix_look_at,
    matrix_compose,
    matrix_normalise
}
