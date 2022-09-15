


export default class Gasto {
    
    constructor(motivo, fecha, costo,metodo) {
        this.motivo = motivo;
        this.fecha = fecha;
        this.costo = costo;

        this.metodo=metodo;
    }
   
}

export const gasto=new Gasto();