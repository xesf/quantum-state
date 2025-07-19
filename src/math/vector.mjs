
const vector_initialise = (x = 0, y = 0, z = 0) => {
    return {
        x: x,
        y: y,
        z: z,
    };
}

const vector_add = (v1, v2) => {
    return {
        x: v1.x + v2.x,
        y: v1.y + v2.y,
        z: v1.z + v2.z,
    };
}

const vector_subtract = (v1, v2) => {
    return {
        x: v1.x - v2.x,
        y: v1.y - v2.y,
        z: v1.z - v2.z,
    };
}

const vector_multiply = (v, scalar) => {
    return {
        x: v.x * scalar,
        y: v.y * scalar,
        z: v.z * scalar,
    };
}

const vector_divide = (v, scalar) => {
    if (scalar === 0) {
        throw new Error('Division by zero');
    }
    return {
        x: v.x / scalar,
        y: v.y / scalar,
        z: v.z / scalar,
    };
}

const vector_length = (v) => {
    return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
}

const vector_distance = (v1, v2) => {
    return Math.sqrt(
        (v1.x - v2.x) * (v1.x - v2.x) +
        (v1.y - v2.y) * (v1.y - v2.y) +
        (v1.z - v2.z) * (v1.z - v2.z)
    );
}

const vector_normalise = (v) => {
    const length = vector_length(v);
    if (length === 0) {
        console.debug('math/vector_normalise: Cannot normalise a zero vector');
        return {
            x: 0,
            y: 0,
            z: 0
        };
    }
    return vector_divide(v, length);
}

const vector_inverse = (v) => {
    return {
        x: -v.x,
        y: -v.y,
        z: -v.z
    };
}

const vector_dot = (v1, v2) => {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
}

const vector_angle = (v1, v2) => {
    const dot = vector_dot(v1, v2);
    const length1 = vector_length(v1);
    const length2 = vector_length(v2);
    if (length1 === 0 || length2 === 0) {
        console.debug('math/vector_angle: Cannot calculate angle with zero vector');
        return 0;
    }
    return Math.acos(dot / (length1 * length2));
}

const vector_rotate_x = (v, angle) => {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return {
        x: v.x,
        y: v.y * cos - v.z * sin,
        z: v.y * sin + v.z * cos
    };
}

const vector_rotate_y = (v, angle) => {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return {
        x: v.x * cos + v.z * sin,
        y: v.y,
        z: v.y * sin + v.z * cos
    };
}

const vector_rotate_z = (v, angle) => {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return {
        x: v.x * cos - v.y * sin,
        y: v.x * sin + v.y * cos,
        z: v.z
    };
}

const vector_cross = (v1, v2) => {
    return {
        x: v1.y * v2.z - v1.z * v2.y,
        y: v1.z * v2.x - v1.x * v2.z,
        z: v1.x * v2.y - v1.y * v2.x
    };
}

const vector_lerp = (v1, v2, t) => {
    return {
        x: v1.x + (v2.x - v1.x) * t,
        y: v1.y + (v2.y - v1.y) * t,
        z: v1.z + (v2.z - v1.z) * t
    };
}

const vector_clamp = (v, min, max) => {
    return {
        x: Math.max(min.x, Math.min(max.x, v.x)),
        y: Math.max(min.y, Math.min(max.y, v.y)),
        z: Math.max(min.z, Math.min(max.z, v.z))
    };
}

const vector_to_string = (v) => {
    return `(${v.x}, ${v.y}, ${v.z})`;
}

const vector_equals = (v1, v2) => {
    return v1.x === v2.x && v1.y === v2.y && v1.z === v2.z;
}

const vector_clone = (v) => {
    return {
        x: v.x,
        y: v.y,
        z: v.z
    };
}

const vector_random = (min = 0, max = 1) => {
    return {
        x: Math.random() * (max - min) + min,
        y: Math.random() * (max - min) + min,
        z: Math.random() * (max - min) + min
    };
}

export {
    vector_initialise,
    vector_add,
    vector_subtract,
    vector_multiply,
    vector_divide,
    vector_length,
    vector_distance,
    vector_normalise,
    vector_inverse,
    vector_dot,
    vector_angle,
    vector_rotate_x,
    vector_rotate_y,
    vector_rotate_z,
    vector_cross,
    vector_lerp,
    vector_clamp,
    vector_to_string,
    vector_equals,
    vector_clone,
    vector_random
}
