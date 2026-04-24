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
    let x2 = (A[1][3] - A[1][2] * x3) / A[1][1];
    let x1 = (A[0][3] - A[0][1] * x2 - A[0][2] * x3) / A[0][0];

    document.getElementById("result").innerText =
        "Gaussian:\nX1=" + x1 + " X2=" + x2 + " X3=" + x3;
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

    let detA = det3(M);

    if (detA === 0) {
        result.innerText = "No unique solution";
        return;
    }

    let M1 = [[B[0],M[0][1],M[0][2]],[B[1],M[1][1],M[1][2]],[B[2],M[2][1],M[2][2]]];
    let M2 = [[M[0][0],B[0],M[0][2]],[M[1][0],B[1],M[1][2]],[M[2][0],B[2],M[2][2]]];
    let M3 = [[M[0][0],M[0][1],B[0]],[M[1][0],M[1][1],B[1]],[M[2][0],M[2][1],B[2]]];

    let x1 = det3(M1) / detA;
    let x2 = det3(M2) / detA;
    let x3 = det3(M3) / detA;

    document.getElementById("result").innerText =
        "Cramer:\nX1=" + x1 + " X2=" + x2 + " X3=" + x3;
}
