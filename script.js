

function showBisection() {
    document.getElementById("bisectionBox").style.display = "block";
}

function showFalsePosition() {
    document.getElementById("falseBox").style.display = "block";
}

// ====== BISECTION METHOD ======

function solveBisection() {
    let expr = document.getElementById("fx").value.trim();
    let xl = document.getElementById("xl").value.trim();
    let xu = document.getElementById("xu").value.trim();

    // Validation
    if (expr === "" || xl === "" || xu === "") {
        document.getElementById("result").innerText = " Please fill in all fields";
        return;
    }

    xl = parseFloat(xl);
    xu = parseFloat(xu);

    if (isNaN(xl) || isNaN(xu)) {
        document.getElementById("result").innerText = " xl and xu must be numbers";
        return;
    }

    let xr;

    for (let i = 0; i < 20; i++) {
        xr = (xl + xu) / 2;

        let fxl = eval(expr.replace(/x/g, xl));
        let fxr = eval(expr.replace(/x/g, xr));

        if (fxl * fxr < 0) {
            xu = xr;
        } else {
            xl = xr;
        }
    }

    document.getElementById("result").innerText = "Root = " + xr;
}

// ====== FALSE POSITION METHOD ======

function solveFalsePosition() {
    let expr = document.getElementById("fx2").value.trim();
    let xl = document.getElementById("xl2").value.trim();
    let xu = document.getElementById("xu2").value.trim();

    if (expr === "" || xl === "" || xu === "") {
        document.getElementById("result2").innerText = " Please fill in all fields";
        return;
    }

    xl = parseFloat(xl);
    xu = parseFloat(xu);

    if (isNaN(xl) || isNaN(xu)) {
        document.getElementById("result2").innerText = " xl and xu must be numbers";
        return;
    }

    let xr;

    for (let i = 0; i < 20; i++) {
        let fxl = eval(expr.replace(/x/g, xl));
        let fxu = eval(expr.replace(/x/g, xu));

        xr = xu - (fxu * (xl - xu)) / (fxl - fxu);

        let fxr = eval(expr.replace(/x/g, xr));

        if (fxl * fxr < 0) {
            xu = xr;
        } else {
            xl = xr;
        }
    }

    document.getElementById("result2").innerText = "Root = " + xr;
}
