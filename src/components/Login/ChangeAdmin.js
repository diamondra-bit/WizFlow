import React, { useContext, useState } from 'react'

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AuthContext from '../../components/store/authContext';

import '../../pages/css/LoginAdmin.css'
import person from '../../pages/images/personAdmin.svg'
import hide from '../../pages/images/hideAdmin.svg'

function ChangeAdmin() {
    const [ancienmdp,setAncienMdp]=useState("");
    const [mdp,setMdp]=useState("");

    const authContext = useContext(AuthContext);

    const navigate= useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        axios
        .post('http://192.168.100.48:5000/changeAdmin',{ancienmdp:ancienmdp,mdp:mdp})
        .then((response) => {
            if(response.data==="Changé")
            {
                navigate('/LoginAdmin')
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
                        <input type='text' required  onChange={(event)=>{setAncienMdp(event.target.value)}}/>
                        <label for="">Ancien mot de passe</label>
                    </div>

                    <div className='inputbox'>
                        <img src={hide} className='ion-icon' onClick={showPassword}/>
                        <input type={hidepassword ? 'text' :'password'}  required onChange={(event)=>{setMdp(event.target.value)}}/>
                        <label for="">Nouveau mot de passe</label>
                    </div>

                    <button type='submit' >Envoyer</button>
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

export default ChangeAdmin