function sumaEnterosComplementoDos(enteroA, enteroB, numBits) {
    // Convierte los enteros a su representación binaria en complemento a 2
    let binarioA = (enteroA >>> 0).toString(2); // Usando >>> 0 para forzar la interpretación como número sin signo
    let binarioB = (enteroB >>> 0).toString(2);
    console.log(binarioA, binarioB)

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
 
    return { resultado, huboDesbordamiento };
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

let enteroA = -121; // Ejemplo de número entero con signo
let enteroB = -89;  // Ejemplo de número entero con signo
let bitsEntrada = 8; // Cantidad de bits de entrada
const {resultado, huboDesbordamiento} = sumaEnterosComplementoDos(enteroA, enteroB, bitsEntrada);
console.log(`Resultado de la suma en binario complemento a 2 (${bitsEntrada} bits): ${resultado}, Desbordamiento: ${huboDesbordamiento}`);
let resultadoDecimal = binarioADecimalConSigno(resultado);
console.log('Resultado en decimal:', resultadoDecimal);