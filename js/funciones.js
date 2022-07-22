import { eliminarGasto, obtenerGastos, subirGasto } from "./api.js";

export function guardarGasto() {
    const motivo = document.querySelector("input[name='motivo']").value;
    const fecha = document.querySelector("input[name='fecha']").value;
    const dinero = document.querySelector("input[name='dinero']").value;

    let gasto = {
        motivo,
        fecha,
        dinero,
        id: Date.now()
    }

    // guardarApi(gasto);
    subirGasto(gasto);
    mensaje();
    setTimeout(() => {
        mensaje();
    }, 3000);
}

export async function imprimirGastos() {
    let gastos=await obtenerGastos();
    const containGastos = document.querySelector("#contain-gastos");
    limpiarHTML(containGastos);


    gastos.forEach(gasto => {
        let div = document.createElement('div');
        div.setAttribute("class", "gasto");
        div.innerHTML = `
            <p>motivo: ${gasto.motivo}</p>
            <p>fecha: ${gasto.fecha}</p>
            <p>dinero: ${gasto.dinero}</p>
            <button class='delete' data-id='${gasto.id}'>X</button>
        `;
        containGastos.append(div);
        containGastos.onclick=(e)=>{borrarGasto(e)};
    });
}

function borrarGasto(e){
    
    if(e.target.classList.contains('delete')){
        let id=e.target.dataset.id;
        eliminarGasto(id);
    }
    imprimirGastos();
}

function limpiarHTML(etiqueta) {
    while (etiqueta.firstChild) {
        etiqueta.removeChild(etiqueta.firstChild);
    }
}

function mensaje() {
    const main = document.querySelector('#main');

    if (document.querySelector('.mensajeExito')) {
        const div = document.querySelector('.mensajeExito');
        if (div.style.display == 'none') {
            div.style.display = 'block';
        } else {
            div.style.display = 'none';
        }
    } else {
        const div = document.createElement('div');
        div.classList.add('mensajeExito')
        div.innerHTML = `
            Gasto guardado con exito.
        `;
        main.prepend(div);
    }

}