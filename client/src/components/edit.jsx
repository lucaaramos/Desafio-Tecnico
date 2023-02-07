import React,{useState, useEffect} from 'react'
import {EditProduct, GetTipo } from '../services/product'
import ModalPortal from './modal'
import '../styles/modal.css'
export default function Edit({product}) {
    const [showModal, setShowModal] = useState(false)
    const [tipo,setTipo] = useState([])
    const [edit, setEdit] = useState({
        nombre: product.nombre,
        precio: product.precio,
        tipoProducto: product.idTipoProducto
        
    })    
const handleChange = (e) =>{   
    setEdit({
        ...edit,
        [e.target.name] : e.target.value
    })
}
const handleClose = (e) =>{
    setShowModal(false)
}
const handleSubmit = (e) =>{    
    EditProduct(product.id,edit)      
}

const handleSelect = (e) =>{        
    setEdit({
        ...edit,
        tipoProducto: e.target.value        
    })
}
useEffect(() => {                    
    GetTipo().then(
        res => setTipo(res),        
    )    
},[]);

    return (
        <div>
         
    <div>
        <button  onClick={() => setShowModal(true)}>edit
        </button>
        <div>
             {showModal && <ModalPortal onClose={handleClose}>
             <form onSubmit={(e) => handleSubmit(e)} 
             >            
                <div className= {'input'}>
                <input
                name='nombre'
                placeholder='nombre'
                onChange={(e) => handleChange(e)}
                value={edit.nombre}
                className={'ic1'}
                ></input>
             </div>
             <div className='ic2'>

                <input
                name='precio'
                placeholder='precio'
                onChange={(e) => handleChange(e)}
                value={edit.precio}                
                ></input>
             </div>
                 <select  onChange={(e) => handleSelect(e)}>
            <option>Select tipo</option>
                {
                tipo.map(t=>
                {console.log(t)
                    return <option value={t.id} key={t.id}>{t.descripcion}</option> })} 
                    <></>
            </select>
                <button className='button'>Enviar</button>                                                                                                                                   
             </form>              
             </ModalPortal>}                                               
        </div>          
    </div>  
    </div>
  )
}

