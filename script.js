function solveBisection() {
    let expr = document.getElementById("fx").value.trim();
    let xl = document.getElementById("xl").value.trim();
    let xu = document.getElementById("xu").value.trim();

    // Validation: empty fields
    if (expr === "" || xl === "" || xu === "") {
        document.getElementById("result").innerText = "❌ Please fill in all fields";
        return;
    }

    xl = parseFloat(xl);
    xu = parseFloat(xu);

    // Validation: numbers only
    if (isNaN(xl) || isNaN(xu)) {
        document.getElementById("result").innerText = "❌ xl and xu must be numbers";
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
