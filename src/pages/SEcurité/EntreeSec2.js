import React, { useState } from 'react'
import { useEffect } from 'react';
import plant from '../../pages/images/plant.svg'
import axios from 'axios';
import { useNavigate } from 'react-router';

function EntreeSec2() {
    const [id,setId]=useState("");
    const [nomMat,setNomMat]=useState(""); 
    const [nomRes,setNomRes]=useState(""); 
    const [departement,setDepartement]=useState(""); 
    const [currentDate,setCurrentDate]=useState(new Date());
    const navigate=useNavigate();

    /*Recuperer la date d'entrée*/
    useEffect( ()=>{
        const intervalId= setInterval(()=>{
        setCurrentDate(new Date());
        } ,1000);
    
        return ()=>{clearInterval(intervalId);}
    },[] )

    const handleSubmit=()=>{
    axios.post("http://192.168.100.48:5000/entreePers",
    {id:id,nomMat:nomMat,nomRes:nomRes,departement:departement,date_ent:currentDate})
    .catch(err=>console.log(err));
    navigate('/SortieSec2')
    }

  return (
    <>
        <div className='container'>
        <div className='cercle'> </div>
        <div className='cercle2'> </div>

            <div className='personal-carte'>
                <h2 className='title'>Ajouter vos matériels personnels</h2>
                
                <div className='form-add'>
                <form onSubmit={handleSubmit}>
                    <label>Numéro utilisateur</label>
                    <input type='text' className='input-sec' onChange={(event)=>{setId(event.target.value)}}/>
                    <label>Nom du responsable</label>
                    <input type='text' className='input-sec' onChange={(event)=>{setNomRes(event.target.value)}} />     
                    <label>Département</label>
                    <input type='text' className='input-sec' onChange={(event)=>{setDepartement(event.target.value)}}/>
                    <label>Nom matériel</label>
                    <input type='text' className='input-sec' onChange={(event)=>{setNomMat(event.target.value)}}/>
                    
                   
                <div className='btn-div-modal'>
                    <button className='btn-modal' type='submit'>Ajouter</button>                          
                </div>
                </form>
                </div>
            </div>
            
        <img src={plant} className='plant2 plant-sec'/>
        </div>
    </>
  )
}

export default EntreeSec2