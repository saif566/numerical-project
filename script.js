function showBisection() {
    document.getElementById("bisectionBox").style.display = "block";
}

function solveBisection() {
    let expr = document.getElementById("fx").value;
    let xl = parseFloat(document.getElementById("xl").value);
    let xu = parseFloat(document.getElementById("xu").value);

    if (!expr || isNaN(xl) || isNaN(xu)) {
        document.getElementById("result").innerText = "Error in input";
        return;
    }

    let xr;

    for (let i = 0; i < 20; i++) {
        xr = (xl + xu) / 2;

        if (eval(expr.replaceAll("x", xl)) * eval(expr.replaceAll("x", xr)) < 0) {
            xu = xr;
        } else {
            xl = xr;
        }
    }

    document.getElementById("result").innerText = "Root = " + xr;
}
