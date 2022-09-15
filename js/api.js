const url='http://localhost:3000/gastos';

export const agregarGastoApi=async (gasto)=>{
    try {
        await fetch(url,{
            method:'POST',
            body:JSON.stringify(gasto),
            headers:{
                'Content-Type':'application/json'
            }
        })
    } catch (error) {
        console.log(error)
    }
};

export const borrarGastoApi=async (id)=>{
    try {
        await fetch(`${url}/${id}`,{
            method:'DELETE'
        });
    } catch (error) {
        console.log(error);
    }
}

export const obtenerGastosApi=async ()=>{
    try {
        const response=await fetch(url);
        const result=await response.json();
        return result
    } catch (error) {
        console.log(error)
    }
}