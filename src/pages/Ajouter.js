import React, { useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Darkmode from '../components/Acceuil/Darkmode'
import Navbar from '../components/Acceuil/Navbar'
import axios from 'axios';
import Modal from '../components/Modal';

function Ajouter() {
    const [nom,setNom]=useState("");
    const [nombre,setNombre]=useState(0);
    const [id,setId]=useState("");
    const [currentDate,setCurrentDate]=useState(new Date());
    const [list,setList]=useState([]);
    const navigate= useNavigate();
   
      /*Recuperer la date actuelle*/
    useEffect( ()=>{
      const intervalId= setInterval(()=>{
          setCurrentDate(new Date()); },1000);
  
          return ()=>{clearInterval(intervalId);}
    },[] )
  
    const hours=currentDate.getHours();
    const mn=currentDate.getMinutes();
    
         /*Insérer les matériaux*/
         const handleSubmit= (event)=>{
            axios.post("http://localhost:3003/insert",{nom:nom,nombre:nombre,heure_ent:currentDate,id:id})
           .catch(err => console.log(err))
           navigate('/Entree');
        }
      
  return (
    <>
    <Modal/>
    {/* <div className='container-home'>
            <div className='navbar'><Navbar/></div>
            <div><Darkmode/>

            <div className='form-add'>
                <form onSubmit={handleSubmit}>
                    <label>Nom matériel</label>
                    <input type='text' onChange={(event)=>{setNom(event.target.value)}}/>
                    <label>Nombre </label>
                    <input type='number' onChange={(event)=>{setNombre(event.target.value)}}/>
                    <label>Id utilisateur</label>
                    <input type='number'  onChange={(event)=>{setId(event.target.value)}}/>

                    <button type='submit'>Ajouter</button>

                    </form>
            </div>
              
            </div>
        </div> */}
       
    </>
  )
}

export default Ajouter