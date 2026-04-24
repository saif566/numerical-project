// ===== GOLDEN SECTION =====
function solveGolden() {
  let expr = document.getElementById("fx").value;
let result1 = document.getElementById("result1");
    let xl = parseFloat(document.getElementById("xl").value);
    let xu = parseFloat(document.getElementById("xu").value);

    if (!expr || isNaN(xl) || isNaN(xu)) {
        result1.innerText = "Error";
        return;
    }

    let R = 0.618;
    let x1, x2;

    for (let i = 0; i < 20; i++) {
        x1 = xu - R * (xu - xl);
        x2 = xl + R * (xu - xl);

        let f1 = eval(expr.replace(/x/g, x1));
        let f2 = eval(expr.replace(/x/g, x2));

        if (f1 < f2) {
            xu = x2;
        } else {
            xl = x1;
        }
    }

    let xopt = (xl + xu) / 2;

    result1.innerText = "Optimal x = " + xopt;
}

// ===== CONJUGATE GRADIENT (Simple 1D) =====
function solveCG() {
    let fexpr = f2.value;
    let dfexpr = df2.value;
    let x = parseFloat(x0.value);

    if (!fexpr || !dfexpr || isNaN(x)) {
        result2.innerText = "Error";
        return;
    }

    for (let i = 0; i < 20; i++) {
        let grad = eval(dfexpr.replace(/x/g, x));
        x = x - 0.1 * grad; // step
    }

    result2.innerText = "Minimum at x = " + x;
}
