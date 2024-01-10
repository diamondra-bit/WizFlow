
import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import img1 from '../../pages/images/img1.svg'
import img2 from '../../pages/images/img2.svg'
import main3 from '../../pages/images/main3.svg'
import plant from '../../pages/images/plant.svg'
import hide from '../../pages/images/hide.svg'

import '../../pages/css/Change.css'
import './Function'

function ChangePassword() {
    const [numero,setNumero]=useState("");
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const[errorNumero,setErrorNumero]=useState(false);
    const[errorOld,setErrorOld]=useState(false);
    const[errorNew,setErrorNew]=useState(false);
    const[errorMessage,setErrorMessage]=useState(false);

    
    const navigate= useNavigate();

    const handleSubmit=(event)=>{
        event.preventDefault();

        if (!numero){
            setErrorNumero(true)
        }else{
            setErrorNumero(false)
        }

        if (!oldPassword){
            setErrorOld(true)
        }else{
            setErrorOld(false)
        }

        if (!newPassword){
            setErrorNew(true)
        }else{
            setErrorNew(false)
        }

        axios.post("http://192.168.100.48:5000/change", {numero:numero,oldPassword:oldPassword,newPassword:newPassword} )
        .then( (res)=>{
           if(res.data=== "Success")
           {
            navigate('/LoginEmploye')
           }else{
            alert("Mot de passe non changé")
           }
        })
        .catch(err =>{
            if (oldPassword)
            {
                setErrorMessage(true)
            }else{
                setErrorMessage(false)
            }
  
        })
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

                <div className='form-text'>
                   <h1>StockWiz</h1>
                     <div className='text'>
                      Simplifiez la gestion des entrées et sorties de vos matériels en toute efficacité avec notre application StockWiz
                    </div> 

                     <img src={main3} className='main'/>
                </div>

                <div className='form-log'>                   
                    <form onSubmit={handleSubmit}>
                            <h1 className='title'> Se Connecter</h1>

                            {errorNumero && <div className='error'> Veuillez remplir votre numéro</div>}
                            <div className='input-field'>
                            <div>  <img src={img1} className='img'/></div>
                            <div> <input type='text' placeholder='Entrer votre numéro'
                            onChange={(event)=>{setNumero(event.target.value)}}/></div>
                        </div>

                        {errorMessage && <div className='error'> Ancien mot de passe incorrect</div>}
                        {errorOld && <div className='error'> Veuillez remplir votre ancien mot de passe</div>}
                        <div className='input-field'>
                            <div>  <img src={img2} className='img'/></div>
                            <div> <input type={hidepassword ? 'text' :'password'} placeholder='Votre ancien mot de passe'
                            onChange={(event)=>{setOldPassword(event.target.value)}}/></div>
                             <img src={hide} className='img img-mdp' onClick={showPassword}/>
                        </div>

                        {errorNew && <div className='error'> Veuillez remplir votre nouveau mot de passe</div>}
                        <div className='input-field'>
                            <div>  <img src={img2} className='img'/></div>
                            <div> <input type={hidepassword ? 'text' :'password'} placeholder='Votre nouveau mot de passe'
                            onChange={(event)=>{setNewPassword(event.target.value)}}/></div>
                             <img src={hide} className='img img-mdp' onClick={showPassword}/>
                        </div>

                        <button type='submit' className='btn'>Envoyer</button>             
                     </form>
             </div>
                </div>
            </div>
      
    </>
  )
}

export default ChangePassword