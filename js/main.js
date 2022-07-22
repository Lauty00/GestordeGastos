import { imprimirGastos,guardarGasto} from "./funciones.js";

const form = document.querySelector("#form");


document.addEventListener('DOMContentLoaded',()=>{
    imprimirGastos();
})

form.addEventListener('submit', (e) => {
    e.preventDefault();

    guardarGasto();
    imprimirGastos();
    form.reset();

});



