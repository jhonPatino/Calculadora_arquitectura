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

function extenderEntero() {
    // Obtener valores de los campos
    const numero = document.getElementById('entero').value;
    const bitEntrada = parseInt(document.getElementById('bitE').value);
    const bitSalida = document.getElementById('bitS').value;

    // Llamar a la función desplazamientoAritmetico
    const resultado = extensionBitsEntero(numero, bitEntrada, bitSalida);
    // Validaciones
    if (validarEntradas(numero,bitEntrada,bitSalida)) {
        // Mostrar resultado en el elemento con id "resultado"
        document.getElementById('resultado2').innerText = `Extensión de ceros: ${resultado}`;
    }else{
        limpiar();
    }
}
function extenderBinario() {
    // Obtener valores de los campos
    const binario = document.getElementById('binario').value;
    const bitEntrada = parseInt(document.getElementById('bitEn').value);
    const bitSalida = document.getElementById('bitSa').value;

    // Llamar a la función desplazamientoAritmetico
    const resultado = extensionBitsBinario(binario, bitEntrada, bitSalida);
    // Validaciones
    if (validarEntradas(binario,bitEntrada,bitSalida)) {
        // Mostrar resultado en el elemento con id "resultado"
        document.getElementById('resultado3').innerText = `Extensión de ceros: ${resultado}`;
    }
}

function extensionBitsEntero(numero, bitsEntrada, bitsSalida) {
    // Convierte el número a su representación binaria con el número de bits de entrada
    let binario = (numero >>> 0).toString(2);

    // Verifica la longitud actual del número binario
    let longitudActual = binario.length;

    if (longitudActual < bitsEntrada) {
        // Extiende ceros a la izquierda para alcanzar la longitud deseada de bits de entrada
        binario = binario.padStart(bitsEntrada, '0');
    } else if (longitudActual > bitsEntrada) {
        // Reduce la longitud al número de bits de entrada
        binario = binario.slice(-bitsEntrada);
    }

    // Ajusta la longitud al número de bits de salida
    if (bitsSalida !== bitsEntrada) {
        if (bitsSalida > bitsEntrada) {
            // Extiende o reduce la longitud al número de bits de salida
            binario = binario.padStart(bitsSalida, binario.charAt(0));
        } else {
            // Reduce la longitud al número de bits de salida
            binario = binario.slice(-bitsSalida);
        }
    }

    return binario;
}

function extensionBitsBinario(binario, bitsEntrada, bitsSalida) {

    // Verifica la longitud actual del número binario
    let longitudActual = binario.length;

    if (longitudActual < bitsEntrada) {
        // Extiende ceros a la izquierda para alcanzar la longitud deseada de bits de entrada
        binario = binario.padStart(bitsEntrada, '0');
    } else if (longitudActual > bitsEntrada) {
        // Reduce la longitud al número de bits de entrada
        binario = binario.slice(-bitsEntrada);
    }

    // Ajusta la longitud al número de bits de salida
    if (bitsSalida !== bitsEntrada) {
        if (bitsSalida > bitsEntrada) {
            // Extiende o reduce la longitud al número de bits de salida
            binario = binario.padStart(bitsSalida, binario.charAt(0));
        } else {
            // Reduce la longitud al número de bits de salida
            binario = binario.slice(-bitsSalida);
        }
    }

    return binario;
}

function limpiar() {
    document.getElementById('entrada').value = '';
    document.getElementById('bitE').value = '';
    document.getElementById('bitS').value = '';
}
function limpiar() {
    document.getElementById('binario').value = '';
    document.getElementById('bitEn').value = '';
    document.getElementById('bitSa').value = '';
}

// Ejemplo de uso entrada en decimal:
// let entero = 7
// let bitsEntrada = 4
// let bitsSalida = 8
// resultado = extensionBitsEntero(entero, bitsEntrada, bitsSalida)
// console.log(resultado)

// Ejemplo de uso entrada en binario:
//let binario = '1000'
//let bitsEntrada = 4
//let bitsSalida = 8
//resultado = extensionBitsBinario(binario, bitsEntrada, bitsSalida)
//console.log(resultado)