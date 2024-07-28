//Importaciones
import Presupuesto from "./class/Presupuesto.js";
import Ui from "./class/Ui.js";
//Variables y selectores
const gastosListado = document.querySelector('#gastos ul');
const form = document.querySelector('#agregar-gasto');

//Eventos
document.addEventListener('DOMContentLoaded', () => {
    promts();
    form.addEventListener('submit', agregarGasto)
})





