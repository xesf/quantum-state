
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
    }
}

const matrix_transpose = (m) => {
    return {
        m01: m.m01, m02: m.m11, m03: m.m21,
        m11: m.m02, m12: m.m12, m13: m.m22,
        m21: m.m03, m22: m.m13, m23: m.m23
    }
}

const matrix_to_string = (m) => {
    return `(${m.m01}, ${m.m02}, ${m.m03})\n(${m.m11}, ${m.m12}, ${m.m13})\n(${m.m21}, ${m.m22}, ${m.m23})`
}

const matrix_clone = (m) => {
    return {
        m01: m.m01, m02: m.m02, m03: m.m03,
        m11: m.m11, m12: m.m12, m13: m.m13,
        m21: m.m21, m22: m.m22, m23: m.m23
    }
}

const matrix_scale = (m, sx, sy) => {
    return {
        m01: m.m01 * sx, m02: m.m02 * sy, m03: m.m03,
        m11: m.m11 * sx, m12: m.m12 * sy, m13: m.m13,
        m21: m.m21 * sx, m22: m.m22 * sy, m23: m.m23
    }
}

const matrix_translate = (m, tx, ty) => {
    return {
        m01: m.m01, m02: m.m02, m03: m.m03 + tx,
        m11: m.m11, m12: m.m12, m13: m.m13 + ty,
        m21: m.m21, m22: m.m22, m23: m.m23
    }
}

const matrix_rotate = (m, angle) => {
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)

    return {
        m01: m.m01 * cos - m.m02 * sin, m02: m.m01 * sin + m.m02 * cos, m03: m.m03,
        m11: m.m11 * cos - m.m12 * sin, m12: m.m11 * sin + m.m12 * cos, m13: m.m13,
        m21: m.m21 * cos - m.m22 * sin, m22: m.m21 * sin + m.m22 * cos, m23: m.m23
    }
}

const matrix_rotate_x = (m, angle) => {
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)
    return {
        m01: m.m01, m02: m.m02 * cos - m.m03 * sin, m03: m.m02 * sin + m.m03 * cos,
        m11: m.m11, m12: m.m12 * cos - m.m13 * sin, m13: m.m12 * sin + m.m13 * cos,
        m21: m.m21, m22: m.m22 * cos - m.m23 * sin, m23: m.m22 * sin + m.m23 * cos
    }
}

const matrix_rotate_y = (m, angle) => {
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)
    return {
        m01: m.m01 * cos + m.m03 * sin, m02: m.m02, m03: -m.m01 * sin + m.m03 * cos,
        m11: m.m11 * cos + m.m13 * sin, m12: m.m12, m13: -m.m11 * sin + m.m13 * cos,
        m21: m.m21 * cos + m.m23 * sin, m22: m.m22, m23: -m.m21 * sin + m.m23 * cos
    }
}

const matrix_rotate_z = (m, angle) => {
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)
    return {
        m01: m.m01 * cos - m.m02 * sin, m02: m.m01 * sin + m.m02 * cos, m03: m.m03,
        m11: m.m11 * cos - m.m12 * sin, m12: m.m11 * sin + m.m12 * cos, m13: m.m13,
        m21: m.m21 * cos - m.m22 * sin, m22: m.m21 * sin + m.m22 * cos, m23: m.m23
    }
}

const matrix_determinant = (m) => {
    return m.m01 * (m.m12 * m.m23 - m.m13 * m.m22) -
           m.m02 * (m.m11 * m.m23 - m.m13 * m.m21) +
           m.m03 * (m.m11 * m.m22 - m.m12 * m.m21);
}

const matrix_inverse = (m) => {
    const det = matrix_determinant(m);

    if (Math.abs(det) < 1e-6) {
        console.debug('math/matrix_inverse: Matrix is not invertible');
        return {
            m01: 0, m02: 0, m03: 0,
            m11: 0, m12: 0, m13: 0,
            m21: 0, m22: 0, m23: 0,
            m31: 0, m32: 0, m33: 0
        }
    }
    const invDet = 1 / det;
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
    };
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
}
