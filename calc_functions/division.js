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

function calcularDiviEnteros() {
    // Obtiene los valores de los campos
    const enteroA = parseInt(document.getElementById('enteroA').value);
    const enteroB = parseInt(document.getElementById('enteroB').value);
    const numBits = parseInt(document.getElementById('numBits').value);
    // Llama a la función y obtiene el resultado
    const resultado = divisionEnteroConSigno(enteroA, enteroB, numBits);
    let cocienteBinario = decimalABinarioConSigno(resultado.cociente);
    let residuoBinario = decimalABinarioConSigno(resultado.residuo);

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
            document.getElementById('resultado').innerText = `Cociente de la operación: ${resultado.cociente}
            Residuo: ${resultado.residuo} 
            Cociente en binario: ${cocienteBinario}
            Residuo en binario ${residuoBinario}`;
        }
    }
}
function calcularDiviBin() {
    // Obtiene los valores de los campos
    const binarioA = document.getElementById('binarioA').value;
    const binarioB = document.getElementById('binarioB').value;
    const numBitsDos = parseInt(document.getElementById('numBitsDos').value);

    // Llama a la función y obtiene el resultado
    const resultadoBinarios = divisionBinarioConSigno(binarioA, binarioB, numBitsDos);
    let cocienteBinario = decimalABinarioConSigno(resultadoBinarios.cociente);
    let residuoBinario = decimalABinarioConSigno(resultadoBinarios.residuo);
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
            document.getElementById('resultado2').innerText = `Cociente de la operación: ${resultadoBinarios.cociente}
            Residuo: ${resultadoBinarios.residuo} 
            Cociente en binario: ${cocienteBinario}
            Residuo en binario: ${residuoBinario}`;
        }
    }
}

function divisionEnteroConSigno(entero1, entero2, bits) {
    const dividendo = Math.abs(entero1); // Valor absoluto del dividendo
    const divisor = Math.abs(entero2); // Valor absoluto del divisor
    const signoResultado = (entero1 < 0) ^ (entero2 < 0) ? -1 : 1; // Determinar el signo del resultado

    if (divisor === 0) {
        alert('División por 0')
        limpiar();
        return 'Error: División por cero';
    }

    let cociente = Math.floor(dividendo / divisor) * signoResultado; // Calcular el cociente

    // Verificar si el cociente está fuera del rango permitido por los bits
    const maxPositiveValue = (1 << (bits - 1)) - 1;
    const minNegativeValue = -(1 << (bits - 1));

    if (cociente > maxPositiveValue || cociente < minNegativeValue) {
        // El cociente está fuera del rango permitido por los bits
        cociente = cociente & ((1 << bits) - 1); // Ajustar al rango permitido
    }

    const residuo = Math.abs(entero1) % Math.abs(entero2) * signoResultado; // Calcular el residuo

    return { cociente, residuo };
}

function divisionBinarioConSigno(binario1, binario2, bits) {
    binario1 = binarioADecimalConSigno(binario1)
    binario2 = binarioADecimalConSigno(binario2)
    const dividendo = Math.abs(binario1); // Valor absoluto del dividendo
    const divisor = Math.abs(binario2); // Valor absoluto del divisor
    const signoResultado = (binario1 < 0) ^ (binario2 < 0) ? -1 : 1; // Determinar el signo del resultado

    if (divisor === 0) {
        alert('División por 0');
        limpiarDos();
        return 'Error: División por cero';
    }

    let cociente = Math.floor(dividendo / divisor) * signoResultado;

    // Verificar si el resultado está fuera del rango permitido por los bits
    const maxPositiveValue = (1 << (bits - 1)) - 1;
    const minNegativeValue = -(1 << (bits - 1));

    if (cociente > maxPositiveValue || cociente < minNegativeValue) {
        // El resultado está fuera del rango permitido por los bits
        cociente = cociente & ((1 << bits) - 1); // Ajustar al rango permitido
    }

    const residuo = Math.abs(binario1) % Math.abs(binario2) * signoResultado; // Calcular el residuo

    return { cociente, residuo };
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
//const entero1 = -13; // Número entero
//const entero2 = 6; // Número entero
//const bits = 8; // Número de bits para representar el número
//const resultado = divisionEnteroConSigno(entero1, entero2, bits);
//const { cociente, residuo } = divisionEnteroConSigno(entero1, entero2, bits);
//console.log(`Cociente en decimal: ${cociente}, Residuo en decimal: ${residuo}`);
//cociente_binario = decimalABinarioConSigno(cociente, bits)
//residuo_binario = decimalABinarioConSigno(residuo, bits)
//console.log(`Cociente en binario: ${cociente_binario}, Residuo en binario: ${residuo_binario}`)



// Ejemplo de uso entrada en binario:
// const entero1 = '11110011'; // Número entero
// const entero2 = '00000110'; // Número entero
// const bits = 8; // Número de bits para representar el número
// const resultado = divisionBinarioConSigno(entero1, entero2, bits);
// const { cociente, residuo } = divisionBinarioConSigno(entero1, entero2, bits);
// console.log(`Cociente en decimal: ${cociente}, Residuo en decimal: ${residuo}`);
// cociente_binario = decimalABinarioConSigno(cociente, bits)
// residuo_binario = decimalABinarioConSigno(residuo, bits)
// console.log(`Cociente en binario: ${cociente_binario}, Residuo en binario: ${residuo_binario}`)