function decimalABinarioConSigno(numero, bits) {
    // Función para convertir un número decimal con signo a su representación binaria
    const esNegativo = numero < 0;
    if (esNegativo) {
        numero = (1 << bits) + numero; // Obtener el complemento a dos
    }
    return numero.toString(2).padStart(bits, esNegativo ? '1' : '0');
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
function calcularMultiEnteros() {
    // Obtiene los valores de los campos
    const enteroA = parseInt(document.getElementById('enteroA').value);
    const enteroB = parseInt(document.getElementById('enteroB').value);
    const numBits = parseInt(document.getElementById('numBits').value);
    // Llama a la función y obtiene el resultado
    const resultado = multiplicarEnterosConSigno(enteroA, enteroB, numBits);
    let resultadoDecimal = binarioADecimalConSigno(resultado);
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
            document.getElementById('resultado').innerText = `Resultado de la multiplicacion en binario complemento a 2: ${resultado}
            ,Resultado en decimal: ${resultadoDecimal}`;
        }
    }
}
function calcularMultiBinarios() {
    // Obtiene los valores de los campos
    const binarioA = document.getElementById('binarioA').value;
    const binarioB = document.getElementById('binarioB').value;
    const numBitsDos = parseInt(document.getElementById('numBitsDos').value);

    // Llama a la función y obtiene el resultado
    const resultadoBinarios = multiplicarBinariosConSigno(binarioA, binarioB, numBitsDos);
    let resultadoDecimalBin = binarioADecimalConSigno(resultadoBinarios);
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
            document.getElementById('resultado2').innerText = `Resultado de la suma de los binarios en complemento a 2: ${resultadoBinarios}
            ,Resultado en decimal: ${resultadoDecimalBin}`;
        }
    }
}


function multiplicarEnterosConSigno(entero1, entero2, bits) {
    const binario1 = decimalABinarioConSigno(entero1, bits);
    const binario2 = decimalABinarioConSigno(entero2, bits);

    const multiplicando = parseInt(binario1, 2);
    const multiplicador = parseInt(binario2, 2);
    let resultado = multiplicando * multiplicador;

    // Verificar si el resultado excede el rango permitido por los bits
    const maxPositiveValue = (1 << (bits - 1)) - 1;
    const minNegativeValue = -(1 << (bits - 1));

    if (resultado > maxPositiveValue || resultado < minNegativeValue) {
        // El resultado está fuera del rango permitido por los bits
        resultado = resultado & ((1 << bits) - 1); // Ajustar al rango permitido
    }

    return decimalABinarioConSigno(resultado, bits);
}

function multiplicarBinariosConSigno(binario1, binario2, bits) {
    const multiplicando = parseInt(binario1, 2);
    const multiplicador = parseInt(binario2, 2);
    let resultado = multiplicando * multiplicador;

    // Verificar si el resultado excede el rango permitido por los bits
    const maxPositiveValue = (1 << (bits - 1)) - 1;
    const minNegativeValue = -(1 << (bits - 1));

    if (resultado > maxPositiveValue || resultado < minNegativeValue) {
        // El resultado está fuera del rango permitido por los bits
        resultado = resultado & ((1 << bits) - 1); // Ajustar al rango permitido
    }

    return decimalABinarioConSigno(resultado, bits);
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
// const entero1 = 2; // Número entero
// const entero2 = -7; // Número entero
// const bits = 8; // Número de bits para representar el número
// const resultado = multiplicarEnterosConSigno(entero1, entero2, bits);
// console.log('El resultado de la multiplicación binaria con signo es:', resultado);
//let resultadoDecimal = binarioADecimalConSigno(resultado);
//console.log('Resultado en decimal:', resultadoDecimal);

// Ejemplo de uso entrada en binario:
//const entero1 = '10111'; // Número entero
//const entero2 = '0101'; // Número entero
//const bits = 8; // Número de bits para representar el número
//const resultado = multiplicarEnterosConSigno(entero1, entero2, bits);
//console.log('El resultado de la multiplicación binaria con signo es:', resultado);
//let resultadoDecimal = binarioADecimalConSigno(resultado);
//console.log('Resultado en decimal:', resultadoDecimal);