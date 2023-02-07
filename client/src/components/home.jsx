import React,{useState, useEffect} from 'react'
import { GetProducts, Delete} from '../services/product'
import Stock from './stock'
import Create from './create'
import Edit from './edit'
import '../styles/table.css'


export default function Home() {

    const [data, setData] = useState([])
    
      
useEffect(()=>{
    GetProducts().then(data => setData(data)).catch(e => console.log(e))
},[])

const handleDelete = (id) =>{
    Delete(id)
    window.location.reload()
    console.log(id)
}
 return(
    <div className='container'>
        <div className='div'>
        <table className='content-table'>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Tipo Producto</th>
                    <th>Stock</th>
                </tr>
            </thead>
                <tbody> 
                    {data?.map((product) =>{                        
                        return(                            
                           <tr   key={product?.id}> 
                                <td>{product?.nombre}</td>
                                <td>{product?.precio}</td>                    
                                <td>{product?.TipoProducto}</td>
                                <td>                                
                                <Stock id={product?.id} product={product}/>                                
                                <button onClick={() => handleDelete(product?.id)}>Eliminar</button>                                
                                <Edit product={product}></Edit>
                                </td> 
                            </tr>                                                                                            
                            )                        
                    })}                    
                </tbody>
            </table>
        </div>
            <div className='div'>
            <Create>
            </Create>
            </div>

        </div>                                    
    )}
            
            
        

     
  
  

