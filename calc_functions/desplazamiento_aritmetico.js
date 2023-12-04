function decimalABinarioConSigno(numeroDecimal, numBits) {
    if (numeroDecimal >= 0) {
        return numeroDecimal.toString(2).padStart(numBits, '0');
    } else {
        const complemento = (Math.pow(2, numBits) + numeroDecimal).toString(2);
        return complemento;
    }
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

function desplazar() {
    // Obtener valores de los campos
    const entrada = document.getElementById('entrada').value;
    const bitsRepre = parseInt(document.getElementById('numBits').value);
    const desplazar = document.getElementById('cantBits').value;
    const dcc = document.getElementById('dcc').value;
    // Llamar a la función desplazamientoAritmetico
    const resultado = desplazamientoAritmetico(entrada, bitsRepre, desplazar, dcc);
    // Validaciones
    if (validarEntradas(entrada,bitsRepre,desplazar)) {
        if (![4, 8, 16].includes(bitsRepre)) {
            alert('DEBE SELECCIONAR 4 8 U 16 BITS UNICAMENTE');
            limpiar();
        } else {
            // Mostrar resultado en el elemento con id "resultado"
            document.getElementById('resultado').innerText = `Desplazamiento: ${resultado}`;
        }
    }

}


function extenderSigno(numeroBinario, numBits) {
    const bitSigno = numeroBinario.charAt(0);
    return bitSigno.repeat(numBits - numeroBinario.length) + numeroBinario;
}

function desplazamientoAritmetico(numeroDecimalOBinario, numBitsRepresentacion, numBitsDesplazamiento, direccion) {
    let numeroBinario;
    if (typeof numeroDecimalOBinario === 'number') {
        numeroBinario = decimalABinarioConSigno(numeroDecimalOBinario, numBitsRepresentacion);
    } else if (typeof numeroDecimalOBinario === 'string' && /^[01]+$/.test(numeroDecimalOBinario)) {
        numeroBinario = numeroDecimalOBinario.padStart(numBitsRepresentacion, '0');
    } else {
        alert('ENTRADA NO VÁLIDA')
        return 'Entrada no válida';
    }

    const longitud = numeroBinario.length;

    if (direccion === 'izquierda') {
        return numeroBinario.slice(numBitsDesplazamiento).padEnd(longitud, '0');
    } else if (direccion === 'derecha') {
        const bitsSigno = numeroBinario.charAt(0).repeat(numBitsDesplazamiento); // Extender el bit de signo
        const bitsRestantes = numeroBinario.slice(0, longitud - numBitsDesplazamiento); // Obtener los bits sin los que se desplazarán
        return extenderSigno(bitsSigno + bitsRestantes, longitud); // Extender y ajustar la longitud
    } else {
        alert('DIRECCIÓN  DE DESPLAZAMIENTO NO VÁLIDA')
        return 'Dirección de desplazamiento inválida';
    }
}
function limpiar() {
    document.getElementById('entrada').value = '';
    document.getElementById('numBits').value = '';
    document.getElementById('cantBits').value = '';
}

// Ejemplo de uso
//const numeroDecimal = -121; // Número entero a desplazar
//const numeroBinario = '10000111'; // Número binario a desplazar
//const bitsRepresentacion = 8; // Bits para representar el número
//const bitsDesplazamiento = 2; // Cantidad de bits para el desplazamiento
//const direccion = 'derecha'; // Dirección del desplazamiento: 'izquierda' o 'derecha'

//const resultadoDecimal = desplazamientoAritmetico(numeroDecimal, bitsRepresentacion, bitsDesplazamiento, direccion);
//console.log('Desplazamiento de número decimal:', resultadoDecimal);

//const resultadoBinario = desplazamientoAritmetico(numeroBinario, bitsRepresentacion, bitsDesplazamiento, direccion);
//console.log('Desplazamiento de número binario:', resultadoBinario);
