import { imprimirGastos,guardarGasto} from "./funciones.js";

const form = document.querySelector("#form");


document.addEventListener('DOMContentLoaded',()=>{
    imprimirGastos();
})

form.addEventListener('submit', (e) => {
    guardarGasto();
    form.reset();

    e.preventDefault();
});




