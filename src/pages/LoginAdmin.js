import React, { useContext, useState } from 'react'

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AuthContext from '../components/store/authContext';

import '../pages/css/LoginAdmin.css'
import person from '../pages/images/personAdmin.svg'
import hide from '../pages/images/hideAdmin.svg'


function LoginAdmin() {
    const [numero,setNumero]=useState("");
    const [mdp,setMdp]=useState("");

    const authContext = useContext(AuthContext);

    const navigate= useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        axios
        .post('http://localhost:3003/loginAdmin')
        .then((response) => {
            if(response.data==="Inséré")
            {
                navigate('/Admin')
            }
        })
        .catch((error) => {
       
        });
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
                        <input type='text' required  onChange={(event)=>{setNumero(event.target.value)}}/>
                        <label for="">Numéro matricule</label>
                    </div>

                    <div className='inputbox'>
                        <img src={hide} className='ion-icon' onClick={showPassword}/>
                        <input type={hidepassword ? 'text' :'password'}  required onChange={(event)=>{setMdp(event.target.value)}}/>
                        <label for="">Mot de passe</label>
                    </div>

                    <button type='submit' >Se Connecter</button>
                    <div className='register'>
                        <Link to="/ChangeAdmin">Changer mot de passe</Link>
                    </div>
                </form>

           </section>
    
</div>
        </div>
    </>
  )
}

export default LoginAdmin