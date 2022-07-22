const url = 'http://localhost:3000/gastos';

export const obtenerGastos=async()=>{
        const respuesta=await fetch(url);
        const resultado=await respuesta.json();
        return resultado;
};

export const subirGasto=async gasto=>{
    try {
        await fetch(url,{
            method:'POST',
            body:JSON.stringify(gasto),
            headers:{
                'Content-Type':'application/json'
            }
        })
    } catch (error) {
        console.log(error);
    }
};

export const eliminarGasto=async idGasto=>{
    try {
        await fetch(`${url}/${idGasto}`,{
            method:'DELETE',
        });
    } catch (error) {
        console.log(error)
    }
};