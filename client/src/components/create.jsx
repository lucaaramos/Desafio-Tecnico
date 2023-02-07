
import React ,{ useState,useEffect } from 'react'
import { GetProducts, GetTipo, PostProduct } from '../services/product';
import styles from '../styles/create.module.css'
export default function Create() {
    const [tipo,setTipo] = useState([])
    const [form,setForm] = useState({
        nombre: "",
        precio: "",
        idTipo: ""
    
    })
    
    const handleChange = (e) =>{   
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
        
        
    }
    const handleSubmit =(e) =>{        
        PostProduct(form)
        GetProducts()
    }
    
    const handleSelect = (e) =>{
        setForm({
            ...form,
            idTipo: e.target.value            
        })
    }
    
    useEffect(() => {
            GetTipo()
            .then( res => setTipo(res))
            .catch(e => console.log(e))
            
        }, []);
        

  return (
    <div>
        <div>
            <form className={styles.form} onSubmit={(e) => handleSubmit(e)} id='myForm'>
        <h2 className={styles.h2}>Crear producto</h2>
                <div className={styles.input}>   
                <input  
                name='nombre' 
                onChange={ (e) => handleChange(e)}
                placeholder='Nombre...'
                className={styles.ic1}
                >      
                </input>                
            </div>
            <br></br>
            <div className={styles.input}> 
                <input 
                name='precio' 
                onChange={ (e) => handleChange(e)}
                placeholder='Precio...' 
                className={styles.ic2}>
                </input>
            </div>
            <br></br>
            <select  onChange={(e) => handleSelect(e)}>
            <option>Seleccionar tipo</option>
                {tipo?.map(t=>
                <option value={t?.id} key={t?.id}>{t?.descripcion}</option> )} 
            </select>
            <br></br>
            <button className={styles.button}>enviar</button>
        </form>
        </div>
    </div>
  )
}
