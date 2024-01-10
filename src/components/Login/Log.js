import React, { useContext, useState } from 'react'

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../../pages/css/Log.css';
import main2 from '../../pages/images/main2.svg'
import img1 from '../../pages/images/img1.svg'
import img2 from '../../pages/images/img2.svg'
import hide from '../../pages/images/hide.svg'
import plant from '../../pages/images/plant.svg'
import AuthContext from '../store/authContext';
import Test from '../Test';
import jwt_decode from 'jwt-decode';


function Log() {
    const [numero,setNumero]=useState("");
    const [mdp,setMdp]=useState("");
    const [errorMessage,setErrorMessage]=useState(false);
    const[errorNumero,setErrorNumero]=useState(false)
    const[errorMdp,setErrorMdp]=useState(false)

    const authContext = useContext(AuthContext);

    const navigate= useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
    
        if (!numero){
            setErrorNumero(true)
        }else{
            setErrorNumero(false)
        }

        if (!mdp){
            setErrorMdp(true)
        }else{
            setErrorMdp(false)
        }

        axios.post("http://192.168.100.48:5000/logintoken", { userId: numero,mdp:mdp})
            .then((response) => {
                if (response.data && response.data.token) {
                    const token = response.data.token;
                    localStorage.setItem('token', token);
                    console.log('Token stocké localement:', token);

                    authContext.login(token);                   
                    navigate('/Home');
                } else {
                    console.error('Le token n\'a pas été renvoyé dans la réponse.', response);
                }   
            })
            .catch(err => {
                if(mdp)
                {
                    setErrorMessage(true)
                }else{
                    setErrorMessage(false)
                }
            });
    }

    const [hidepassword,setHidepassword]=useState(false);
    const showPassword=()=>{
            setHidepassword(!hidepassword)
    }


  return (
    <>

      <div className='container'>

      <div className='cercle'> </div>
      <div className='cercle2'> </div>
      <img src={plant} className='plant2'/>
            <div className='form-container'>

                <div className='form-log'>                   
                    <form onSubmit={handleSubmit}>

                        <h1 className='title'> Se Connecter</h1>
                        
                        {errorNumero && <div className='error'>Veuillez remplir votre numéro *</div>}
                            <div className='input-field'>
                                <div>  <img src={img1} className='img'/></div>
                                <div> 
                                <input type='text'  placeholder='Entrer votre numéro'
                                onChange={(event)=>{setNumero(event.target.value)}}/>
                                </div>
                            </div>

                        {errorMessage && <div className='error'>Veuillez vérifier votre mot de passe *</div>}
                        {errorMdp && <div className='error'>Veuillez remplir votre mot de passe *</div>}
                            <div className='input-field'>
                                <div>  <img src={img2} className='img'/></div>
                                <div> <input type={hidepassword ? 'text' :'password'}
                                 placeholder='Entrer votre mot de passe'
                                onChange={(event)=>{setMdp(event.target.value)}}/></div>
                                 <img src={hide} className='img img-mdp' onClick={showPassword}/>
                            </div>
               
                            <button type='submit' className='btn' >Se Connecter</button>
                            <br/>
                            <Link to="/ChangePassword" className='link'>Changer votre mot de passe</Link>
                    
                            </form>
</div>
                </div>
            </div>
       

    </>
  )
}

export default Log