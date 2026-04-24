// ===== SHOW / HIDE =====
function hideAll() {
    document.getElementById("bisectionBox").style.display = "none";
    document.getElementById("falseBox").style.display = "none";
    document.getElementById("newtonBox").style.display = "none";
    document.getElementById("secantBox").style.display = "none";
    document.getElementById("fixedBox").style.display = "none";
}

function showBisection() { hideAll(); bisectionBox.style.display = "block"; }
function showFalsePosition() { hideAll(); falseBox.style.display = "block"; }
function showNewton() { hideAll(); newtonBox.style.display = "block"; }
function showSecant() { hideAll(); secantBox.style.display = "block"; }
function showFixed() { hideAll(); fixedBox.style.display = "block"; }

// ===== CALC =====
function calc(expr, x) {
    return eval(expr.replace(/x/g, "(" + x + ")"));
}

// ===== BISECTION =====
function solveBisection() {
    let expr = fx.value;
    let xl = parseFloat(xl.value);
    let xu = parseFloat(xu.value);

    let xr;

    for (let i = 0; i < 20; i++) {
        xr = (xl + xu) / 2;
        if (calc(expr, xl) * calc(expr, xr) < 0) xu = xr;
        else xl = xr;
    }

    result.innerText = "Root = " + xr;
}

// ===== FALSE POSITION =====
function solveFalsePosition() {
    let expr = fx2.value;
    let xl = parseFloat(xl2.value);
    let xu = parseFloat(xu2.value);

    let xr;

    for (let i = 0; i < 20; i++) {
        let fl = calc(expr, xl);
        let fu = calc(expr, xu);

        xr = xu - (fu * (xl - xu)) / (fl - fu);

        if (fl * calc(expr, xr) < 0) xu = xr;
        else xl = xr;
    }

    result2.innerText = "Root = " + xr;
}

// ===== NEWTON =====
function solveNewton() {
    let expr = fx3.value;
    let dfxVal = dfx.value;
    let x = parseFloat(x0n.value);

    for (let i = 0; i < 10; i++) {
        x = x - calc(expr, x) / calc(dfxVal, x);
    }

    result3.innerText = "Root = " + x;
}

// ===== SECANT =====
function solveSecant() {
    let expr = fx5.value;
    let x0 = parseFloat(x0.value);
    let x1 = parseFloat(x1.value);

    for (let i = 0; i < 10; i++) {
        let f0 = calc(expr, x0);
        let f1 = calc(expr, x1);

        if (f1 - f0 === 0) {
            result5.innerText = "Math Error";
            return;
        }

        let x2 = x1 - (f1 * (x1 - x0)) / (f1 - f0);
        x0 = x1;
        x1 = x2;
    }

    result5.innerText = "Root = " + x1;
}

// ===== FIXED POINT =====
function solveFixed() {
    let expr = gx.value;
    let x = parseFloat(x0f.value);

    for (let i = 0; i < 10; i++) {
        x = calc(expr, x);
    }

    result4.innerText = "Root = " + x;
}
