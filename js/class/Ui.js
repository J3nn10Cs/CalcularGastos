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

    mostrarGatos(gastos){
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

            //para borrar cuando se da click
            boton.onclick = () => {
                eliminarGasto(id);
            }

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

    //Para mostrar el monto actualizado de restante
    actualizarRestante(restante){
        document.querySelector('#restante').textContent = restante;
    }

    comprobarPresupuesto(presupuestoObj){
        const {presupuesto,restante} = presupuestoObj;
        const restantediv = document.querySelector('.restante')

        //Comprobar 25% 
        if( (presupuesto / 4) > restante){
            restantediv.classList.remove('alert-success', 'alert-warning');
            restantediv.classList.add('alert-danger');
            //verificar si es la mitad -> 50%
        }else if ( (presupuesto/2) > restante){
            restantediv.classList.remove('alert-success')
            restantediv.classList.add('alert-warning')
        }else{
            restantediv.classList.remove('alert-danger','alert-warning')
            restantediv.classList.add('alert-success')
        }

        //Si el total es menor a 0
        if(restante<=0){
            ui.mostrarMensaje('El presupuesto se ha agotado', 'error');
            //Desabilitar el boton agregar
            form.querySelector('button[type="submit"]').disabled = true;
        }
    }
}

export default Ui

