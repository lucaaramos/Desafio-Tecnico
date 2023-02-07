import React from 'react'
import { GetStock } from '../services/product'
import { useState } from 'react'
import ModalPortal from './modal'
export default function Stock({id, product}) {

    const [stock, setStock] = useState([])
    const [showModal, setShowModal] = useState(false)

    const handleReport = (e) =>{
        GetStock(e).then(
            res =>setStock(res)                    
        ).catch(err => {
            setStock([{cantidad:"error"}])
             console.log(err)
        })
        setShowModal(true)
    }
    const handleClose = (e) =>{
        setShowModal(false)
    }

    
  return (
    <div>
        <button  onClick={() => handleReport(id)}>stock
        </button>
        <div>
             {showModal && <ModalPortal onClose={handleClose}>
             {<div>
             <h3>Informacion</h3>
             <label>
                <li>Nombre: {product?.nombre} </li>
                <li>Stock: {stock[0]?.cantidad}</li>
             </label>
             </div>}                                                                                                                        
             </ModalPortal>}                                               
        </div>          
    </div>
  )
}
