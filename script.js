// ================= SHOW / HIDE =================

function hideAll() {
    document.getElementById("bisectionBox").style.display = "none";
    document.getElementById("falseBox").style.display = "none";
    document.getElementById("fixedBox").style.display = "none";
    document.getElementById("newtonBox").style.display = "none";
}

function showBisection() {
    hideAll();
    document.getElementById("bisectionBox").style.display = "block";
}

function showFalsePosition() {
    hideAll();
    document.getElementById("falseBox").style.display = "block";
}

function showFixedPoint() {
    hideAll();
    document.getElementById("fixedBox").style.display = "block";
}

function showNewton() {
    hideAll();
    document.getElementById("newtonBox").style.display = "block";
}

// ================= BISECTION =================

function solveBisection() {
    let expr = document.getElementById("fx").value;
    let xl = parseFloat(document.getElementById("xl").value);
    let xu = parseFloat(document.getElementById("xu").value);

    if (!expr || isNaN(xl) || isNaN(xu)) {
        document.getElementById("result").innerText = "Error";
        return;
    }

    let xr;

    for (let i = 0; i < 20; i++) {
        xr = (xl + xu) / 2;

        let fxl = eval(expr.replace(/x/g, xl));
        let fxr = eval(expr.replace(/x/g, xr));

        if (fxl * fxr < 0) xu = xr;
        else xl = xr;
    }

    document.getElementById("result").innerText = "Root = " + xr;
}

// ================= FALSE POSITION =================

function solveFalsePosition() {
    let expr = document.getElementById("fx2").value;
    let xl = parseFloat(document.getElementById("xl2").value);
    let xu = parseFloat(document.getElementById("xu2").value);

    if (!expr || isNaN(xl) || isNaN(xu)) {
        document.getElementById("result2").innerText = "Error";
        return;
    }

    let xr;

    for (let i = 0; i < 20; i++) {
        let fxl = eval(expr.replace(/x/g, xl));
        let fxu = eval(expr.replace(/x/g, xu));

        xr = xu - (fxu * (xl - xu)) / (fxl - fxu);

        let fxr = eval(expr.replace(/x/g, xr));

        if (fxl * fxr < 0) xu = xr;
        else xl = xr;
    }

    document.getElementById("result2").innerText = "Root = " + xr;
}

// ================= FIXED POINT =================

function solveFixedPoint() {
    let expr = document.getElementById("fx3").value;
    let x = parseFloat(document.getElementById("x0").value);

    if (!expr || isNaN(x)) {
        document.getElementById("result3").innerText = "Error";
        return;
    }

    for (let i = 0; i < 20; i++) {
        x = eval(expr.replace(/x/g, x));
    }

    document.getElementById("result3").innerText = "Root = " + x;
}

// ================= NEWTON =================

function solveNewton() {
    let fexpr = document.getElementById("fx4").value;
    let dfexpr = document.getElementById("dfx4").value;
    let x = parseFloat(document.getElementById("x0n").value);

    if (!fexpr || !dfexpr || isNaN(x)) {
        document.getElementById("result4").innerText = "Error";
        return;
    }

    for (let i = 0; i < 20; i++) {
        let fx = eval(fexpr.replace(/x/g, x));
        let dfx = eval(dfexpr.replace(/x/g, x));

        x = x - (fx / dfx);
    }

    document.getElementById("result4").innerText = "Root = " + x;
}
