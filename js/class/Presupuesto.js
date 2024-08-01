//Clases
class Presupuesto{
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);//monto total
        this.restante = Number(presupuesto);//monto que disminuye segun la cantidad ingresada
        this.gastos = []; //acumular los gastos
    }

    nuevoGasto(gasto){
        //referencia al gasto
        this.gastos = [...this.gastos,gasto];
        this.calcularRestante();
    }

    calcularRestante(){
        //Reduce -> Sumar los gastos
        const gastado = this.gastos.reduce( (total,gasto) => total += gasto.cantidad, 0  )
        this.restante = this.presupuesto - gastado;
    }

    eliminarGasto(id){
        //Una vez eliminado el gasto
        this.gastos = this.gastos.filter(gasto => gasto.id !== id);

        //Llamamos el restante
        this.calcularRestante();
    }

}

export default Presupuesto