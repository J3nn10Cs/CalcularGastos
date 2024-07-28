//Variables y selectores
const gastosListado = document.querySelector('#gastos ul');
const form = document.querySelector('#agregar-gasto');

//Eventos
document.addEventListener('DOMContentLoaded', () => {
    promts();
    form.addEventListener('submit', agregarGasto)
})

//Instancias
const ui = new Ui();
let presupuesto;


