import {useEffect,useRef} from 'react'
import '../styles/modal.css'
import ReactDOM from "react-dom"



export const Modal = ({children,onClose}) => {
  const menuRef = useRef(null)



  useEffect(() => {
    let handle = (e)=>{
        if(!menuRef?.current?.contains(e?.target)){
            onClose(false)
        }
    }
    document.addEventListener("mousedown",handle)
    return()=>{
        document.removeEventListener("mousedown",handle)
    }
})
  return (
    <div className="modal fade">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
                <div className="modal-header">


    <div className="modal-body">
        <div className='modal-contenido' ref={menuRef}>
            <button style={{cursor:"pointer"}} className='btn btn-primary"' onClick={()=>onClose(false)}>✖</button>
            {children}
        </div>
    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
const div = document.getElementById("portal")
export default function ModalPortal({children,onClose}){
    return ReactDOM.createPortal(
        <Modal onClose={onClose}>
            {children}
            
        </Modal>,
        div
    )
  }

