import axios from 'axios'
 
export const GetProducts = async() => {
    try{

        const data = await fetch('http://127.0.0.1:5000/' )
        const res = await data.json()
        return res
    }catch(err){
        return err
    }
}
export const GetTipo = async() =>{
    try{
        const response = await fetch('http://127.0.0.1:5000/tipoProducto') 
        const res = await response.json()                            
         return res
    }catch(err){
        console.log(err)      
    }
}

export const GetStock = async (id) =>{
   try{
        const config = {
           method:'POST',
           url:'http://127.0.0.1:5000/stock',
           data:{idProducto:id}
        }
       const {data} = await axios(config)
        return data
    }
    catch(err){
        return err
    }
}

export const PostProduct = async(value) =>{
    const {nombre,precio,idTipo} = value
    try{
        const config = {
            method:'POST',
            url:'http://127.0.0.1:5000/producto',
            data:{nombre,precio,idTipoProducto:idTipo}
         }
        const {data} = await axios(config)         
         return data

    } catch(err){
        return err
    } 
}

export const Delete = async(value) =>{
    const id = value
    try{    
        const config = {
            method:'DELETE',
            url:'http://127.0.0.1:5000/delete',
            data:{id}
        }
        const {data} = await axios(config)
        return data        
    }catch(err){
        console.log(err.message)
    }
}

export const EditProduct = async(id,product) => {    
    const nombre = product.nombre
    const precio = product.precio
    const tipoProducto = product.tipoProducto        
    try{
        const config = {
            method:'PUT',
            url: 'http://127.0.0.1:5000/put',
            data:{id:id,
                 nombre: nombre,
                  precio:precio,
                  idTipoProducto:tipoProducto
                }        
            }
        const data = await axios(config)
        return data
        
    }catch(err){
        return err
    }
}

 