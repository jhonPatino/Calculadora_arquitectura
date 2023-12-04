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
function calcularSumaEnteros() {
    // Obtiene los valores de los campos
    const enteroA = parseInt(document.getElementById('enteroA').value);
    const enteroB = parseInt(document.getElementById('enteroB').value);
    const numBits = parseInt(document.getElementById('numBits').value);

    // Llama a la función y obtiene el resultado
    const resultado = sumaEnterosComplementoDos(enteroA, enteroB, numBits);
    // Validaciones
    if (validarEntradas(enteroA, enteroB, numBits)) {
        if (![4, 8, 16].includes(numBits)) {
            alert('DEBE SELECCIONAR 4 8 U 16 BITS UNICAMENTE');
            limpiar();
        } else {
            if (resultado.huboDesbordamiento == true) {
                alert('HUBO DESBORDAMIENTO');
            };
            // Mostrar resultado
            document.getElementById('resultado').innerText = `Resultado de la suma en binario complemento a 2: ${resultado.resultado}
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
    const resultadoBinarios = sumaBinariosComplementoDos(binarioA, binarioB, numBitsDos);

    // Validaciones
    if (validarEntradas(binarioA, binarioB, numBitsDos)) {
        if (![4, 8, 16].includes(numBitsDos)) {
            alert('DEBE SELECCIONAR 4 8 U 16 BITS UNICAMENTE');
            limpiarDos();
        } else {
            if (resultadoBinarios.huboDesbordamientoBin == true) {
                alert('HUBO DESBORDAMIENTO');
            };
            // Mostrar resultado
            document.getElementById('resultado2').innerText = `Resultado de la suma de los binarios en complemento a 2: ${resultadoBinarios.resultadoBin}
            ,Resultado en decimal: ${resultadoBinarios.resultadoDecimalBin}`;
        }
    }
}
function sumaBinariosComplementoDos(binarioA, binarioB, numBits) {
    enteroA = binarioADecimalConSigno(binarioA)
    enteroB = binarioADecimalConSigno(binarioB)
    // Convierte los enteros a su representación binaria en complemento a 2
    binarioA = (enteroA >>> 0).toString(2); // Usando >>> 0 para forzar la interpretación como número sin signo
    binarioB = (enteroB >>> 0).toString(2);

    // Obtiene la longitud máxima de bits entre los dos números y la longitud máxima proporcionada
    let maxLength = Math.max(binarioA.length, binarioB.length, numBits);

    // Ajusta la longitud de los números binarios para que tengan la misma longitud
    binarioA = binarioA.padStart(maxLength, '0');
    binarioB = binarioB.padStart(maxLength, '0');

    // Realiza la suma binaria en complemento a 2
    let carry = 0;
    let resultadoBin = '';
    for (let i = maxLength - 1; i >= 0; i--) {
        const bitA = parseInt(binarioA[i] || '0'); // Si el bit no existe, se asume como 0
        const bitB = parseInt(binarioB[i] || '0'); // Si el bit no existe, se asume como 0
        const suma = bitA + bitB + carry;

        resultadoBin = (suma % 2) + resultadoBin;
        carry = Math.floor(suma / 2);
    }

    // Si hay desbordamiento, descarta el bit más alto
    if (carry !== 0) {
        resultadoBin = resultadoBin.slice(1);
    }

    // Ajusta el resultado al número de bits especificado
    resultadoBin = resultadoBin.slice(-numBits);

    // Obtener el bit más significativo antes y después del ajuste de longitud
    const msbBefore = resultadoBin.charAt(0); // Bit más significativo antes del ajuste de longitud
    const msbAfter = resultadoBin.charAt(1); // Segundo bit más significativo después del ajuste

    // Verificar si hubo desbordamiento
    const huboDesbordamientoBin = msbBefore !== msbAfter;
    let resultadoDecimalBin = binarioADecimalConSigno(resultadoBin);


    return { resultadoBin, huboDesbordamientoBin, resultadoDecimalBin };
}

function sumaEnterosComplementoDos(enteroA, enteroB, numBits) {
    // Convierte los enteros a su representación binaria en complemento a 2
    let binarioA = (enteroA >>> 0).toString(2); // Usando >>> 0 para forzar la interpretación como número sin signo
    let binarioB = (enteroB >>> 0).toString(2);

    // Obtiene la longitud máxima de bits entre los dos números y la longitud máxima proporcionada
    let maxLength = Math.max(binarioA.length, binarioB.length, numBits);

    // Ajusta la longitud de los números binarios para que tengan la misma longitud
    binarioA = binarioA.padStart(maxLength, '0');
    binarioB = binarioB.padStart(maxLength, '0');

    // Realiza la suma binaria en complemento a 2
    let carry = 0;
    let resultado = '';
    for (let i = maxLength - 1; i >= 0; i--) {
        const bitA = parseInt(binarioA[i] || '0'); // Si el bit no existe, se asume como 0
        const bitB = parseInt(binarioB[i] || '0'); // Si el bit no existe, se asume como 0
        const suma = bitA + bitB + carry;

        resultado = (suma % 2) + resultado;
        carry = Math.floor(suma / 2);
    }

    // Si hay desbordamiento, descarta el bit más alto
    if (carry !== 0) {
        resultado = resultado.slice(1);
    }

    // Ajusta el resultado al número de bits especificado
    resultado = resultado.slice(-numBits);

    // Obtener el bit más significativo antes y después del ajuste de longitud
    const msbBefore = resultado.charAt(0); // Bit más significativo antes del ajuste de longitud
    const msbAfter = resultado.charAt(1); // Segundo bit más significativo después del ajuste

    // Verificar si hubo desbordamiento
    const huboDesbordamiento = msbBefore !== msbAfter;
    let resultadoDecimal = binarioADecimalConSigno(resultado);
    return { resultado, huboDesbordamiento, resultadoDecimal };
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
// let enteroA = -121; // Ejemplo de número entero con signo
// let enteroB = -89;  // Ejemplo de número entero con signo
// let bitsEntrada = 8; // Cantidad de bits de entrada
// const {resultado, huboDesbordamiento} = sumaEnterosComplementoDos(enteroA, enteroB, bitsEntrada);
// console.log(`Resultado de la suma en binario complemento a 2 (${bitsEntrada} bits): ${resultado}, Desbordamiento: ${huboDesbordamiento}`);
// let resultadoDecimal = binarioADecimalConSigno(resultado);
// console.log('Resultado en decimal:', resultadoDecimal);

// Ejemplo de uso entrada en binario:
// let binarioA = '10000111';
//let binarioB= '10100111';
//let bitsEntrada = 8;
//const {resultado, huboDesbordamiento} = sumaBinariosComplementoDos(binarioA, binarioB, bitsEntrada);
//console.log(`Resultado de la suma en binario complemento a 2 (${bitsEntrada} bits): ${resultado}, Desbordamiento: ${huboDesbordamiento}`);
//console.log('Resultado en decimal:', resultadoDecimal);
