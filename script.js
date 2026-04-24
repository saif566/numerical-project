function showBisection() {
    document.getElementById("bisectionBox").style.display = "block";
}

function f(x, expr) {
    return eval(expr);
}

function solveBisection() {
    let expr = document.getElementById("fx").value;
    let xl = parseFloat(document.getElementById("xl").value);
    let xu = parseFloat(document.getElementById("xu").value);

    let xr;

    for (let i = 0; i < 20; i++) {
        xr = (xl + xu) / 2;

        if (f(xl, expr) * f(xr, expr) < 0) {
            xu = xr;
        } else {
            xl = xr;
        }
    }

    document.getElementById("result").innerText = "Root = " + xr;
}
