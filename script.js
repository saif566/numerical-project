function showBisection() {
    document.getElementById("bisectionBox").style.display = "block";
}

function solveBisection() {
    let expr = document.getElementById("fx").value.trim();
    let xl = document.getElementById("xl").value.trim();
    let xu = document.getElementById("xu").value.trim();

    // Validation: empty fields
    if (expr === "" || xl === "" || xu === "") {
        document.getElementById("result").innerText = " Please fill in all fields";
        return;
    }

    xl = parseFloat(xl);
    xu = parseFloat(xu);

    // Validation: numbers only
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
