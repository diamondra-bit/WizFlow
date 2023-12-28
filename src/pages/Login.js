import React, { useContext, useState } from 'react'

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AuthContext from '../components/store/authContext';

import '../pages/css/LoginAdmin.css'
import person from '../pages/images/personAdmin.svg'
import hide from '../pages/images/hideAdmin.svg'

function Login() {
  const [numero,setNumero]=useState("");
  const [mdp,setMdp]=useState("");

  const authContext = useContext(AuthContext);

  const navigate= useNavigate();

  const handleSubmit = (event) => {
      event.preventDefault();

      axios.post("http://localhost:3003/logintoken", { userId: numero,mdp:mdp})
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
                      <Link to="/">Retour</Link>
                  </div>
              </form>

         </section>
  
</div>
      </div>


    </>
  )
}

export default Login