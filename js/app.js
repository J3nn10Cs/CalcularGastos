import { promts,form } from "./funciones.js";
import { agregarGasto } from "./funciones.js";
//Eventos
document.addEventListener('DOMContentLoaded', () => {
    promts();
    form.addEventListener('submit', agregarGasto)
})





