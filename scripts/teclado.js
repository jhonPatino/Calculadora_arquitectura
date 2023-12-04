function agregar(value) {
    document.getElementById('display').value += value;
}
function limpiar() {
    document.getElementById('display').value = '';
}
function calculadora() {
    try {
        const result = eval(document.getElementById('display').value);
        document.getElementById('display').value = result;
    } catch (error) {
        document.getElementById('display').value = 'Error';
    }
}