document.getElementById("generarCuadruplos").addEventListener("click", generarCuadruplos);

function generarCuadruplos() {
    const expresion = document.getElementById("expresion").value;
    const tablaCuadruplos = document.getElementById("tablaCuadruplos");
    const resultadoFinal = document.getElementById("resultadoFinal");
    tablaCuadruplos.innerHTML = "";
    resultadoFinal.textContent = "";

    let resultadosCuadruplos = [];
    let resultadoFinalValor = procesarExpresion(expresion, resultadosCuadruplos);

    resultadosCuadruplos.forEach(cuadruplo => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${cuadruplo.operador}</td>
            <td>${cuadruplo.operando1}</td>
            <td>${cuadruplo.operando2}</td>
            <td>${cuadruplo.resultado}</td>
        `;
        tablaCuadruplos.appendChild(fila);
    });

    resultadoFinal.textContent = `Resultado final: ${resultadoFinalValor}`;
}

function procesarExpresion(expresion, resultadosCuadruplos) {
    while (/\([^\(\)]+\)/.test(expresion)) {
        expresion = expresion.replace(/\(([^\(\)]+)\)/, (match, subExp) => {
            const resultado = resolverSubExpresion(subExp, resultadosCuadruplos);
            return resultado;
        });
    }

    return resolverSubExpresion(expresion, resultadosCuadruplos);
}

function resolverSubExpresion(subExp, resultadosCuadruplos) {
    let resultadoParcial = parseFloat(subExp);

    const operaciones = [
        { operador: "/", regex: /(\d+)\s*\/\s*(\d+)/ },
        { operador: "*", regex: /(\d+)\s*\*\s*(\d+)/ },
        { operador: "+", regex: /(\d+)\s*\+\s*(\d+)/ },
        { operador: "-", regex: /(\d+)\s*-\s*(\d+)/ }
    ];

    operaciones.forEach(op => {
        while (op.regex.test(subExp)) {
            subExp = subExp.replace(op.regex, (match, operando1, operando2) => {
                const resultado = realizarOperacion(op.operador, parseFloat(operando1), parseFloat(operando2));
                resultadosCuadruplos.push({
                    operador: op.operador,
                    operando1: operando1,
                    operando2: operando2,
                    resultado: resultado
                });
                resultadoParcial = resultado;
                return resultado;
            });
        }
    });

    return resultadoParcial;
}

function realizarOperacion(operador, operando1, operando2) {
    switch (operador) {
        case '+': return operando1 + operando2;
        case '-': return operando1 - operando2;
        case '*': return operando1 * operando2;
        case '/': return operando2 !== 0 ? operando1 / operando2 : "Error (División por 0)";
        default: return 0;
    }
}
