
// ===== GET MATRIX =====
function getMatrix() {
    return [
        [a11.value, a12.value, a13.value, b1.value].map(Number),
        [a21.value, a22.value, a23.value, b2.value].map(Number),
        [a31.value, a32.value, a33.value, b3.value].map(Number)
    ];
}

// ===== GAUSSIAN =====
function solveGaussian() {
    let A = getMatrix();

    for (let i = 0; i < 3; i++) {
        for (let j = i + 1; j < 3; j++) {
            let factor = A[j][i] / A[i][i];
            for (let k = 0; k < 4; k++) {
                A[j][k] -= factor * A[i][k];
            }
        }
    }

    let x3 = A[2][3] / A[2][2];
    let x2 = (A[1][3] - A[1][2]*x3) / A[1][1];
    let x1 = (A[0][3] - A[0][1]*x2 - A[0][2]*x3) / A[0][0];

    result.innerText = `Gaussian:\nX1=${x1} X2=${x2} X3=${x3}`;
}

// ===== GAUSS-JORDAN =====
function solveGaussJordan() {
    let A = getMatrix();

    for (let i = 0; i < 3; i++) {

        // make pivot = 1
        let pivot = A[i][i];
        for (let k = 0; k < 4; k++) {
            A[i][k] /= pivot;
        }

        // eliminate others
        for (let j = 0; j < 3; j++) {
            if (j !== i) {
                let factor = A[j][i];
                for (let k = 0; k < 4; k++) {
                    A[j][k] -= factor * A[i][k];
                }
            }
        }
    }

    result.innerText =
        `Gauss-Jordan:\nX1=${A[0][3]} X2=${A[1][3]} X3=${A[2][3]}`;
}

// ===== CRAMER =====
function det3(m) {
    return m[0][0]*(m[1][1]*m[2][2]-m[1][2]*m[2][1])
         - m[0][1]*(m[1][0]*m[2][2]-m[1][2]*m[2][0])
         + m[0][2]*(m[1][0]*m[2][1]-m[1][1]*m[2][0]);
}

function solveCramer() {
    let A = getMatrix();

    let M = [
        [A[0][0], A[0][1], A[0][2]],
        [A[1][0], A[1][1], A[1][2]],
        [A[2][0], A[2][1], A[2][2]]
    ];

    let B = [A[0][3], A[1][3], A[2][3]];

    let D = det3(M);

    if (D === 0) {
        result.innerText = "No unique solution";
        return;
    }

    let Dx = det3([[B[0],M[0][1],M[0][2]],[B[1],M[1][1],M[1][2]],[B[2],M[2][1],M[2][2]]]);
    let Dy = det3([[M[0][0],B[0],M[0][2]],[M[1][0],B[1],M[1][2]],[M[2][0],B[2],M[2][2]]]);
    let Dz = det3([[M[0][0],M[0][1],B[0]],[M[1][0],M[1][1],B[1]],[M[2][0],M[2][1],B[2]]]);

    let x1 = Dx / D;
    let x2 = Dy / D;
    let x3 = Dz / D;

    result.innerText = `Cramer:\nX1=${x1} X2=${x2} X3=${x3}`;
}

// ===== LU =====
function solveLU() {
    let A = getMatrix();

    let a11=A[0][0], a12=A[0][1], a13=A[0][2], b1=A[0][3];
    let a21=A[1][0], a22=A[1][1], a23=A[1][2], b2=A[1][3];
    let a31=A[2][0], a32=A[2][1], a33=A[2][2], b3=A[2][3];

    let l21 = a21 / a11;
    let l31 = a31 / a11;

    let u11 = a11;
    let u12 = a12;
    let u13 = a13;

    let u22 = a22 - l21*u12;
    let u23 = a23 - l21*u13;

    let l32 = (a32 - l31*u12) / u22;

    let u33 = a33 - l31*u13 - l32*u23;

    // Ly = b
    let y1 = b1;
    let y2 = b2 - l21*y1;
    let y3 = b3 - l31*y1 - l32*y2;

    // Ux = y
    let x3 = y3 / u33;
    let x2 = (y2 - u23*x3) / u22;
    let x1 = (y1 - u12*x2 - u13*x3) / u11;

    result.innerText = `LU:\nX1=${x1} X2=${x2} X3=${x3}`;
}
