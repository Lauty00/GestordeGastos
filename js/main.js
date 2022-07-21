import { imprimirGastos,guardarGasto,cargarLS,gastos } from "./funciones.js";

const form = document.querySelector("#form");


document.addEventListener('DOMContentLoaded',()=>{
   cargarLS();
})

form.addEventListener('submit', (e) => {
    e.preventDefault();

    guardarGasto();
    imprimirGastos();
    localStorage.setItem('gastos',JSON.stringify(gastos));
    form.reset();

});




// const url='http://localhost:3000/gastos'

// async function guardarApi(gasto){
//     try {
//         await fetch(url,{
//             method:'POST',
//             body:JSON.stringify(gasto),
//             headers:{
//                 'Content-Type':'application/json'
//             }
//         })
        
//     } catch (error) {
//         console.log(error)
//     }
// }

