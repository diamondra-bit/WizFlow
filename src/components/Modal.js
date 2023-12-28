import React, { useState } from 'react'
import './modal.css'

function Modal() {
  const [modal,setModal]=useState(false);
  
  const toggleModal=()=>{
    setModal(!modal);
  }
  return (
    <>
    <button  onClick={toggleModal}>Open</button>
    {modal &&(

        <button onClick={toggleModal}>Close</button>
   
    )}
   
    </>
  )
}

export default Modal