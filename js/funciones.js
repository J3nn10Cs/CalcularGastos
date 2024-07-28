//Importaciones
import Presupuesto from "./class/Presupuesto.js";
import Ui from "./class/Ui.js";

export let presupuesto
//Instancias
export const ui = new Ui();
//Funciones
export const promts = () => {
    let question = prompt('¿Cual es el presupuesto?');
    if(question === ' ' || question === null|| isNaN(question) || question<=0){
        window.location.reload();
    }
    //Presupuesto valido
    presupuesto = new Presupuesto(question);
    
    //Insertar todo el objeto completo
    ui.insertPresupuesto(presupuesto);
}

//Agregar gastos
const agregarGasto = (e) => {
    e.preventDefault();
    //Leer datos
    const nombre = document.querySelector('#gasto').value;
    const cantidad = Number(document.querySelector('#cantidad').value);

    if(nombre==='' || cantidad === ''){
        ui.mostrarMensaje('Ambos campos son obligatorios','error');
        return;
    }else if( isNaN(cantidad) || cantidad <= 0) {
        ui.mostrarMensaje('Cantidad ingresada no es correcta','error');
        return;
    }

    //Crear un objeto con el gasto -> une nombre cant y id al gasto
    const gasto = {
        nombre,
        cantidad,
        id: Date.now()
    }
    
    //crea los nuevos gastos del objeto creado anteriormente
    presupuesto.nuevoGasto(gasto);

    //Mensaje correcto
    ui.mostrarMensaje('Gasto agregado correctamente');

    //Imprimir los gastos
    //--Extraer los datos del presupuesto
    const {gastos, restante} = presupuesto;
    ui.mostrarGatos(gastos)

    //Actualizar restante
    ui.actualizarRestante(restante);

    //Actualizar color de restante
    ui.comprobarPresupuesto(presupuesto);

    //reinicia el formulario
    form.reset();
}

function eliminarGasto(id){
    //Eliminar del objeto - clase
    presupuesto.eliminarGasto(id);

    //Elimina los gastos del html
    const {gastos,restante} = presupuesto;
    ui.mostrarGatos(gastos);

    //Actualizar restante
    ui.actualizarRestante(restante);

    //Actualizar color de restante
    ui.comprobarPresupuesto(presupuesto);
}