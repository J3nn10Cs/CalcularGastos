//Variables y selectores
const gastosListado = document.querySelector('#gastos ul');
const form = document.querySelector('#agregar-gasto');

//Eventos
document.addEventListener('DOMContentLoaded', () => {
    promts();
    form.addEventListener('submit', agregarGasto)
})

//Clases
class Presupuesto{
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = []; //acumular los gastos
    }

    nuevoGasto(gasto){
        //referencia al gasto
        this.gastos = [...this.gastos,gasto];
        console.log(this.gastos);
    }
}

class Ui{
    insertPresupuesto(cant){
        const total = document.querySelector('#total');
        const res = document.querySelector('#restante');
        //Extrayendo valor
        const {presupuesto,restante} = cant;
        //Asignar al html
        total.textContent = presupuesto;
        res.textContent = restante;
    }

    mostrarMensaje(mensaje, clase){
        const div = document.createElement('div');
        div.classList.add('text-center','alert');

        if(clase==='error'){
            div.classList.add('alert-danger');
        }else{
            div.classList.add('alert-success');
        }

        //Mensaje
        const prim = document.querySelector('.primario');
        div.textContent = mensaje;
        prim.insertBefore(div,form);

        setTimeout(() => {
            div.remove();
        }, 3000);
    }

    agregarGastoListado(gastos){
        this.limpiarHtml(); //Elimina html previo
        
        //Iterar sobre el Objeto gastos
        gastos.forEach( gasto => {
            //extrayendo los atributos
            const {cantidad,nombre,id} = gasto;

            //Crear LI
            const newgasto = document.createElement('li');
            //----> Agregar varias clases
            newgasto.className = 'list-group-item d-flex justify-content-between align-items-center';
             //----> dataset agrega lo que desees que coloques a la derecha
            newgasto.dataset.id = id;

            //Agregar el html del gasto
            newgasto.innerHTML = `${nombre} <span class="badge badge-primary badge-pill"> $ ${cantidad} </span>`;

            //Boton para borrar el gasto
            const boton = document.createElement('button');
            boton.textContent = 'X';
            boton.classList.add('btn','btn-danger', 'borrar-gasto');
            newgasto.appendChild(boton);

            //Agregar el html
            gastosListado.appendChild(newgasto);
        })
    }

    limpiarHtml(){
        while(gastosListado.firstChild){
            //Eliminamos el primero hijo
            gastosListado.removeChild(gastosListado.firstChild);
        }
    }
}

//Instancias
const ui = new Ui();
let presupuesto;


//Funciones
const promts = () => {
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

    //Crear un objeto con el gasto
    const gasto = {
        nombre,
        cantidad,
        id: Date.now()
    }
    
    //añade un nuevo gasto
    presupuesto.nuevoGasto(gasto);

    //Mensaje correcto
    ui.mostrarMensaje('Gasto agregado correctamente');

    //Imprimir los gastos
    //--Extraer los datos del presupuesto
    const {gastos} = presupuesto;
    ui.agregarGastoListado(gastos)

    //reinicia el formulario
    form.reset();
}