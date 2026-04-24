
// ===== HIDE ALL =====
function hideAll() {
    document.getElementById("bisectionBox").style.display = "none";
    document.getElementById("falseBox").style.display = "none";
    document.getElementById("newtonBox").style.display = "none";
    document.getElementById("secantBox").style.display = "none";
    document.getElementById("fixedBox").style.display = "none";
}

// ===== SHOW FUNCTIONS =====
function showBisection() {
    hideAll();
    document.getElementById("bisectionBox").style.display = "block";
}

function showFalsePosition() {
    hideAll();
    document.getElementById("falseBox").style.display = "block";
}

function showNewton() {
    hideAll();
    document.getElementById("newtonBox").style.display = "block";
}

function showSecant() {
    hideAll();
    document.getElementById("secantBox").style.display = "block";
}

function showFixed() {
    hideAll();
    document.getElementById("fixedBox").style.display = "block";
}

// ===== CALC FUNCTION =====
function calc(expr, x) {
    return eval(expr.replace(/x/g, "(" + x + ")"));
}

// ===== BISECTION =====
function solveBisection() {
    let expr = document.getElementById("fx").value.trim();
    let xl = parseFloat(document.getElementById("xl").value);
    let xu = parseFloat(document.getElementById("xu").value);
    let result = document.getElementById("result");

    if (!expr || isNaN(xl) || isNaN(xu)) {
        result.innerText = "Enter valid inputs";
        return;
    }

    let xr;

    for (let i = 0; i < 20; i++) {
        xr = (xl + xu) / 2;

        let fl = calc(expr, xl);
        let fr = calc(expr, xr);

        if (fl * fr < 0) xu = xr;
        else xl = xr;
    }

    result.innerText = "Root = " + xr;
}

// ===== FALSE POSITION =====
function solveFalsePosition() {
    let expr = document.getElementById("fx2").value.trim();
    let xl = parseFloat(document.getElementById("xl2").value);
    let xu = parseFloat(document.getElementById("xu2").value);
    let result = document.getElementById("result2");

    if (!expr || isNaN(xl) || isNaN(xu)) {
        result.innerText = "Enter valid inputs";
        return;
    }

    let xr;

    for (let i = 0; i < 20; i++) {
        let fl = calc(expr, xl);
        let fu = calc(expr, xu);

        if (fu - fl === 0) {
            result.innerText = "Math Error";
            return;
        }

        xr = xu - (fu * (xl - xu)) / (fl - fu);

        let fr = calc(expr, xr);

        if (fl * fr < 0) xu = xr;
        else xl = xr;
    }

    result.innerText = "Root = " + xr;
}

// ===== NEWTON =====
function solveNewton() {
    let expr = document.getElementById("fx3").value.trim();
    let dfx = document.getElementById("dfx").value.trim();
    let x = parseFloat(document.getElementById("x0n").value);
    let result = document.getElementById("result3");

    if (!expr || !dfx || isNaN(x)) {
        result.innerText = "Enter valid inputs";
        return;
    }

    for (let i = 0; i < 10; i++) {
        let fx = calc(expr, x);
        let dfxVal = calc(dfx, x);

        if (dfxVal === 0) {
            result.innerText = "Math Error";
            return;
        }

        x = x - fx / dfxVal;
    }

    result.innerText = "Root = " + x;
}

// ===== SECANT =====
function solveSecant() {
    let expr = document.getElementById("fx5").value.trim();
    let x0 = parseFloat(document.getElementById("x0").value);
    let x1 = parseFloat(document.getElementById("x1").value);
    let result = document.getElementById("result5");

    if (!expr || isNaN(x0) || isNaN(x1)) {
        result.innerText = "Enter valid inputs";
        return;
    }

    let x2;

    for (let i = 0; i < 10; i++) {
        let f0 = calc(expr, x0);
        let f1 = calc(expr, x1);

        if (isNaN(f0) || isNaN(f1)) {
            result.innerText = "Invalid function";
            return;
        }

        if (f1 - f0 === 0) {
            result.innerText = "Math Error";
            return;
        }

        x2 = x1 - (f1 * (x1 - x0)) / (f1 - f0);

        x0 = x1;
        x1 = x2;
    }

    result.innerText = "Root = " + x2;
}

// ===== FIXED POINT =====
function solveFixed() {
    let expr = document.getElementById("gx").value.trim();
    let x = parseFloat(document.getElementById("x0f").value);
    let result = document.getElementById("result4");

    if (!expr || isNaN(x)) {
        result.innerText = "Enter valid inputs";
        return;
    }

    for (let i = 0; i < 10; i++) {
        x = calc(expr, x);
    }

    result.innerText = "Root = " + x;
}
