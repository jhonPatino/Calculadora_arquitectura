function validarEntradas(entradaA, entradaB, entradaC) {
    // Definir patron a respetar
    var patron = /^-?\d+$/;
    // Evaluar
    if (patron.test(entradaA) && patron.test(entradaB) && patron.test(entradaC)) {
        return true;
    } else {
        alert("SOLO SE ACEPTA EL INGRESO DE NUMEROS")
        return false;
    }
}
function calcularRestaEnteros() {
    // Obtiene los valores de los campos
    const enteroA = parseInt(document.getElementById('enteroA').value);
    const enteroB = parseInt(document.getElementById('enteroB').value);
    const numBits = parseInt(document.getElementById('numBits').value);

    // Llama a la función y obtiene el resultado
    const resultado = restaEnterosComplementoDos(enteroA, enteroB, numBits);
    // Validaciones
    if (validarEntradas(enteroA, enteroB, numBits)) {
        if (![4, 8, 16].includes(numBits)) {
            alert('DEBE SELECCIONAR 4 8 U 16 BITS UNICAMENTE');
            limpiar();
        } else {
            if (resultado.huboDesbordamientoBin == true) {
                alert('HUBO DESBORDAMIENTO');
            };
            // Mostrar resultado
            document.getElementById('resultado').innerText = `Resultado de la resta de enteros, complemento a 2: ${resultado.resultado}
            ,Resultado en decimal: ${resultado.resultadoDecimal}`;
        }
    }
}
function calcularSumaBinarios() {
    // Obtiene los valores de los campos
    const binarioA = document.getElementById('binarioA').value;
    const binarioB = document.getElementById('binarioB').value;
    const numBitsDos = parseInt(document.getElementById('numBitsDos').value);

    // Llama a la función y obtiene el resultado
    const resultadoBinarios = restaBinariosComplementoDos(binarioA, binarioB, numBitsDos);

    // Validaciones
    if (validarEntradas(binarioA, binarioB, numBitsDos)) {
        if (![4, 8, 16].includes(numBitsDos)) {
            alert('DEBE SELECCIONAR 4 8 U 16 BITS UNICAMENTE');
            limpiarDos();
        } else {
            if (resultadoBinarios.huboDesbordamientoBin == true) {
                alert('HUBO DESBORDAMIENTO');
            };
            //Mostrar resultado    
            document.getElementById('resultado2').innerText = `Resultado de la resta de los binarios en complemento a 2: ${resultadoBinarios.resultadoBin}
            ,Resultado en decimal: ${resultadoBinarios.resultadoDecimalBin}`;
        }
    }
}

function restaBinariosComplementoDos(binarioA, binarioB, numBits) {

    // Obtiene la longitud máxima de bits entre los dos números y la longitud máxima proporcionada
    let maxLength = Math.max(binarioA.length, binarioB.length, numBits);

    // Calcula el complemento a 2 del segundo número (B)
    let complementoB = '';
    for (let i = 0; i < binarioB.length; i++) {
        complementoB += (binarioB[i] === '0' ? '1' : '0');
    }

    let carry = 1;
    let sumaComplementoB = '';
    for (let i = maxLength - 1; i >= 0; i--) {
        const bitB = parseInt(complementoB[i] || '0');
        const suma = bitB + carry;

        sumaComplementoB = (suma % 2) + sumaComplementoB;
        carry = Math.floor(suma / 2);
    }

    // Realiza la suma binaria entre A y el complemento a 2 de B
    let carrySuma = 0;
    let resultadoBin = '';
    for (let i = maxLength - 1; i >= 0; i--) {
        const bitA = parseInt(binarioA[i] || '0');
        const bitSumaComplementoB = parseInt(sumaComplementoB[i] || '0');
        const suma = bitA + bitSumaComplementoB + carrySuma;

        resultadoBin = (suma % 2) + resultadoBin;
        carrySuma = Math.floor(suma / 2);
    }

    // Verificar si el resultado está fuera del rango permitido por los bits
    const maxPositiveValue = (1 << (numBits - 1)) - 1;
    const minNegativeValue = -(1 << (numBits - 1));

    let huboDesbordamientoBin = false;
    if (parseInt(resultadoBin, 2) > maxPositiveValue || parseInt(resultadoBin, 2) < minNegativeValue) {
        resultadoBin = resultadoBin.slice(1); // Descartar el bit más alto
        huboDesbordamientoBin = true;
    }

    // Ajusta el resultado al número de bits especificado
    resultadoBin = resultadoBin.slice(-numBits);
    let resultadoDecimalBin = binarioADecimalConSigno(resultadoBin);
    return { resultadoBin, huboDesbordamientoBin, resultadoDecimalBin };
}


function restaEnterosComplementoDos(enteroA, enteroB, numBits) {
    // Convierte los enteros a su representación binaria en complemento a 2
    let binarioA = (enteroA >>> 0).toString(2); // Usando >>> 0 para forzar la interpretación como número sin signo
    let binarioB = (enteroB >>> 0).toString(2);

    // Obtiene la longitud máxima de bits entre los dos números y la longitud máxima proporcionada
    let maxLength = Math.max(binarioA.length, binarioB.length, numBits);

    // Ajusta la longitud de los números binarios para que tengan la misma longitud
    binarioA = binarioA.padStart(maxLength, '0');
    binarioB = binarioB.padStart(maxLength, '0');

    // Calcula el complemento a 2 del segundo número (B)
    let complementoB = '';
    for (let i = 0; i < binarioB.length; i++) {
        complementoB += (binarioB[i] === '0' ? '1' : '0');
    }

    let carry = 1;
    let sumaComplementoB = '';
    for (let i = maxLength - 1; i >= 0; i--) {
        const bitB = parseInt(complementoB[i] || '0');
        const suma = bitB + carry;

        sumaComplementoB = (suma % 2) + sumaComplementoB;
        carry = Math.floor(suma / 2);
    }

    // Realiza la suma binaria entre A y el complemento a 2 de B
    let carrySuma = 0;
    let resultado = '';
    for (let i = maxLength - 1; i >= 0; i--) {
        const bitA = parseInt(binarioA[i] || '0');
        const bitSumaComplementoB = parseInt(sumaComplementoB[i] || '0');
        const suma = bitA + bitSumaComplementoB + carrySuma;

        resultado = (suma % 2) + resultado;
        carrySuma = Math.floor(suma / 2);
    }

    // Verificar si el resultado está fuera del rango permitido por los bits
    const maxPositiveValue = (1 << (numBits - 1)) - 1;
    const minNegativeValue = -(1 << (numBits - 1));

    let huboDesbordamientoBin = false;
    if (parseInt(resultado, 2) > maxPositiveValue || parseInt(resultado, 2) < minNegativeValue) {
        resultado = resultado.slice(1); // Descartar el bit más alto
        huboDesbordamientoBin = true;
    }

    // Ajusta el resultado al número de bits especificado
    resultado = resultado.slice(-numBits);
    let resultadoDecimal = binarioADecimalConSigno(resultado);
    return { resultado, huboDesbordamientoBin, resultadoDecimal };
}

function binarioADecimalConSigno(binario) {
    const esNegativo = binario[0] === '1'; // Comprueba si el número es negativo

    // Si es negativo, calcula su complemento a 2
    if (esNegativo) {
        let complementoA2 = '';
        for (let i = 0; i < binario.length; i++) {
            complementoA2 += binario[i] === '0' ? '1' : '0';
        }
        return -(parseInt(complementoA2, 2) + 1); // Devuelve el valor negativo
    }
    return parseInt(binario, 2); // Devuelve el valor positivo
}
function limpiar() {
    document.getElementById('enteroA').value = '';
    document.getElementById('enteroB').value = '';
    document.getElementById('numBits').value = '';
}
function limpiarDos() {
    document.getElementById('binarioA').value = '';
    document.getElementById('binarioB').value = '';
    document.getElementById('numBitsDos').value = '';
}
// Ejemplo de uso entrada en decimal:
//let enteroA = 6; // Ejemplo de número entero con signo
//let enteroB = 3; // Ejemplo de número entero con signo
//let bitsEntrada = 4; // Cantidad de bits de entrada
//const {resultado, huboDesbordamientoBin} = restaEnterosComplementoDos(enteroA, enteroB, bitsEntrada);
//console.log(`Resultado de la resta en binario complemento a 2 (${bitsEntrada} bits): ${resultado}, Desbordamiento: ${huboDesbordamientoBin}`);
//let resultadoDecimal = binarioADecimalConSigno(resultado);
//console.log('Resultado en decimal:', resultadoDecimal);

// Ejemplo de uso entrada en binario:
// let binarioA = '0110'; // Ejemplo de número entero con signo
// let binarioB = '1001'; // Ejemplo de número entero con signo
// let bitsEntrada = 4; // Cantidad de bits de entrada
// const {resultado, huboDesbordamientoBin} = restaBinariosComplementoDos(binarioA, binarioB, bitsEntrada);
// console.log(`Resultado de la resta en binario complemento a 2 (${bitsEntrada} bits): ${resultado}, Desbordamiento: ${huboDesbordamientoBin}`);
// let resultadoDecimal = binarioADecimalConSigno(resultado);
// console.log('Resultado en decimal:', resultadoDecimal);