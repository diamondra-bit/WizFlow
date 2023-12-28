import React, { useState } from 'react'
import person from '../../pages/images/personAdmin.svg'
import hide from '../../pages/images/hideAdmin.svg'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function Loginsecurite() {
    const [id_securite,setId_securite]=useState("");
    const [mot_de_passe,setMot_de_passe]=useState("");

    const navigate= useNavigate();

    const handleSubmit=(event)=>{
        event.preventDefault();

        axios.post("http://localhost:3003/loginSecurite", {id_securite:id_securite,mot_de_passe:mot_de_passe} )
        .then( (res)=>{
           if(res.data=== "Securite1")
           {
            navigate('/Securite1')
           }else if (res.data=== "Securite2"){
            navigate('/Securite2')
           }else{
            alert("Utilisateur non enregistré")
           }
        })
        .catch(err => console.log(err))
    }
    
    const [hidepassword,setHidepassword]=useState(false);
    const showPassword=()=>{
            setHidepassword(!hidepassword)
    }

  return (
    <>
        <div className='wrapper'>
            
            <div className='box'>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>

<div className='body-log'>

           <section>
           <form onSubmit={handleSubmit}>
                    <h1>Se Connecter</h1>
                    <div className='inputbox'>
                        <img src={person} className='ion-icon'/>
                        <input type='text' required  onChange={(e)=>{setId_securite(e.target.value)}}/>
                        <label for="">Numéro matricule</label>
                    </div>

                    <div className='inputbox'>
                        <img src={hide} className='ion-icon'  onClick={showPassword}/>
                        <input  type={hidepassword ? 'text' :'password'} required  onChange={(e)=>{setMot_de_passe(e.target.value)}}/>
                        <label for="">Mot de passe</label>
                    </div>

                    <button type='submit' >Se Connecter</button>
                    <div className='register'>
                        <Link to="/">Retour</Link>
                    </div>
                </form>

           </section>
    
</div>
        </div>
    </>
  )
}

export default Loginsecurite