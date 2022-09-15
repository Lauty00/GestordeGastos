import { agregarGastoApi, obtenerGastosApi,borrarGastoApi } from "./api.js";
import Gasto from "./Gasto.js";


const form=document.querySelector('#form');
const list=document.querySelector('.list');
const formCheck=document.querySelector('.form-check');
const btnReset=document.querySelector('.btn-reset');


let saldo=0
let metodoG=false;

export function events(){
    obtenerSaldo();
    formCheck.addEventListener('change',btnChecked);
    form.addEventListener('submit',validar);
    list.addEventListener('click',btnDelete);
    btnReset.addEventListener('click',resetearGestor);
}

function obtenerSaldo(){
    if(localStorage.saldo!=undefined){
        saldo=Number(localStorage.getItem('saldo'));
        mostrarSalario(saldo)
    }else{
        saldo=Number(prompt('Ingresa el sueldo'));
        while(isNaN(saldo)){
            saldo=Number(prompt('Ingresa el sueldo'));
        }
        localStorage.setItem('saldo',saldo);
    }
}
function btnChecked(){
    let check1=document.querySelector('#ingreso');
    let check2=document.querySelector('#gasto');

    let check1Label=document.querySelector('label[for="ingreso"] ');
    let check2Label=document.querySelector('label[for="gasto"] ');


    if(check1.checked){
        metodoG=true;
        check2Label.style.backgroundColor='gray';
        check1Label.style.backgroundColor='RGB(32,148,94)';
    }
    else if(check2.checked){
        metodoG=false;
        check1Label.style.backgroundColor='gray';
        check2Label.style.backgroundColor='RGB(224,74,88)';
        
    }
    console.log(metodoG)
}

function mostrarSalario(saldo){
    const span=document.querySelector('.saldo');
    span.innerHTML=`
        <strong>Saldo Disponible</strong> = $${saldo}
    `;
}


function validar(e){
    e.preventDefault()
    const motivoInput=document.querySelector("input[name='motivo']").value;
    const fechaInput=document.querySelector("input[name='fecha']").value;
    const dineroInput=document.querySelector("input[name='dinero']").value;
    const check1=document.querySelector('#ingreso');
    const check2=document.querySelector('#gasto');


    if(!isNaN(motivoInput) || isNaN(dineroInput) || dineroInput<0 || (check1.checked== false && check2.checked == false)){
        mensajeAlert('error');
    }else{
        let gastoAguardar=new Gasto(motivoInput,fechaInput,parseInt(dineroInput),metodoG);

        gastoAguardar.metodo ? saldo+=Number(dineroInput) : saldo-=Number(dineroInput);
        
        localStorage.setItem('saldo',saldo);
    
        agregarGastoApi(gastoAguardar);
        // imprimirGastos();
        document.querySelector('label[for="ingreso"] ').style.backgroundColor='gray';
        document.querySelector('label[for="gasto"] ').style.backgroundColor='gray';
        
        check2.checked ? mensajeAlert('gasto') : mensajeAlert();
            
        form.reset();
    }
}

async function btnDelete(e){
    let gastos=await obtenerGastosApi();
    if(e.target.classList.contains('eliminar')){
        let id=e.target.parentElement.parentElement.dataset.id;
        let eliminated=gastos.find(gasto=>gasto.id==id);
        
        eliminated.metodo ? saldo-=eliminated.costo : saldo+=eliminated.costo;
        
        localStorage.setItem('saldo',saldo);
        borrarGastoApi(id);
    }
}

function resetearGestor(){
    localStorage.clear();
    window.location.reload();
    obtenerSaldo();
}

function mensajeAlert(p){
    const divAlert=document.createElement('div');

    if(p =='error'){
        divAlert.classList.add('text-center','p-4','bg-danger','text-white','rounded-3','mt-3');
        divAlert.innerHTML=`
        Ingresa los datos correctamente.
        `;
        form.append(divAlert);
    }else if(p == 'gasto'){
        divAlert.classList.add('text-center','p-4','bg-success','text-white','rounded-3','mt-3');
        divAlert.innerHTML=`
        Gasto guardado correctamente.
        `;
        form.append(divAlert);
    }else{
        divAlert.classList.add('text-center','p-4','bg-success','text-white','rounded-3','mt-3');
        divAlert.innerHTML=`
        Ingreso guardado correctamente.
        `;
        form.append(divAlert);
    }

    setTimeout(()=>{
        divAlert.style.display='none'
    },2000)
        
}

function limpiarHTML(etiqueta){
    while(etiqueta.firstChild){
        etiqueta.removeChild(etiqueta.firstChild);
    }
}

export async function  imprimirGastos(){
    const list=document.querySelector('.list');
    let gastos=await obtenerGastosApi();
    console.log(gastos)
    limpiarHTML(list);
    if(gastos.length>0){
        gastos.forEach(gasto => {
            const item=document.createElement('li');
            if(gasto.metodo){
                item.classList.add('list__item', 'border','border-3', 'border-success')
            }else{
                item.classList.add('list__item', 'border','border-3', 'border-danger')
            }
            
            item.setAttribute('data-id',gasto.id);
            item.innerHTML=`
                <div class='result'>
                    <span><strong>Motivo:</strong> ${gasto.motivo}</span>
                    <span><strong>Fecha:</strong> ${gasto.fecha}</span>
                    <span><strong>Dinero:</strong> $${gasto.costo}</span>
                </div>
                <div class='btn-content'>
                    <button class='btn btn-danger eliminar'>Eliminar</button>
                </div>
                
            `;
            list.append(item);
        });
    }
   
}





