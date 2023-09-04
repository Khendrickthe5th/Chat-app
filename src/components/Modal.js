import "./Modal.css"
import React, {useEffect} from 'react'


function Modal(){

    useEffect(()=>{
        console.log("Okay Working")
    })

    return(
    <div className="modalCont"> 
        <div className="modal">
            <span>Heyyy</span>
            <button onClick={(e)=>{e.target.parentElement.style.display = "none"}}> Remove </button>

        
        </div>
    </div>
    )
}

export default Modal;