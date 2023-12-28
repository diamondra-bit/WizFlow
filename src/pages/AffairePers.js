import React, { useEffect, useState } from 'react'
import axios from 'axios';
import back from '../pages/images/back2.svg'
import { Link } from 'react-router-dom';
import {format} from 'date-fns'
import add from '../pages/images/add2.svg'

function AffairePers() {
    const[list,setList]=useState([]);
    const [currentDate,setCurrentDate]=useState(new Date());
    const [id,setId]=useState("");
    const [nomMat,setNomMat]=useState(""); 
    const [nomRes,setNomRes]=useState(""); 
    const [departement,setDepartement]=useState(""); 
   

    useEffect(()=>{
        const listSortie=()=>{
            axios.get("http://localhost:3003/sortiePers")
            .then((response)=>{
                setList(response.data)                
            })
        }
        listSortie();
    },[])

    const[modal,setModal]=useState(false);
    const toggleModal=()=>{
        setModal(!modal);
      }

      const handleSubmit=()=>{
        axios.post("http://localhost:3003/entreePers",
        {id:id,nomMat:nomMat,nomRes:nomRes,departement:departement,date_ent:currentDate})
        .catch(err=>console.log(err));
        }

        const handleSortie=(id)=>{
            axios.post(`http://192.168.100.48:3003/insertSortiePers/${id}`)
            axios.put(`http://192.168.100.48:3003/deleteSortiePers/${id}`)
            .then(()=>{
              window.location.reload();
            })
        
          }
          
  return (
    <>
       <div className='table-body'>

<br/> 
             <div className='table__header'>
                <div className='table-titre'>Matériel Personnel</div>

                <div className='flex'>
                <div> <img src={add} onClick={toggleModal}/></div>
                <div><Link to="/"><img src={back}/></Link></div>
                </div>
              

            </div>


            {modal &&(
                                <div className='modal'>
                                    <div className='overlay-security' onClick={toggleModal}></div>
                                        <div className='modal-content-security'>
                                            <div className='form-add'>
                                              <h2>Ajouter matériels</h2>
                                              <form onSubmit={handleSubmit}>
                                                  <label>Nom du responsable</label>
                                                    <input type='text' className='input-sec' onChange={(event)=>{setNomRes(event.target.value)}} />     
                                                    <label>Département</label>
                                                    <select onChange={(event)=>{setDepartement(event.target.value)}}>
                                                        <option value=""></option>
                                                        <option value="Mellis">Mellis</option>
                                                        <option value="Vidzar">Vidzar</option>
                                                        <option value="MadEpices">MadEpices</option>
                                                    </select>
                                                    <label>Nom matériel</label>
                                                    <input type='text' className='input-sec' onChange={(event)=>{setNomMat(event.target.value)}}/>                       
                                                    <div className='btn-div-modal'>
                                                        <button className='btn-modal' type='submit'>Ajouter</button>                          
                                                    </div>
                                                 </form>
                                        </div>           
                                    </div>
                                </div>     
                             )}
           
       
            <div className='table__body'>
                
                <table>
                    <thead>
                        <tr>
                            <th>Numéro</th>
                            <th>Nom</th>
                            <th>Matériel</th>
                            <th>Département</th>
                            <th  className='th-date'>Date d'entrée</th>
                            <th>Heure d'entrée</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className='affaire'>
                        {list.map((val)=>(
                            <tr>
                                <td>{val.id_ent_pers}</td>
                                <td>{val.nom_responsable}</td>
                                <td>{val.nom_mat}</td>
                                <td>{val.departement}</td>
                                <td className='td-date'>{format(new Date(val.date_ent),'dd-MM-yyyy')}</td>
                                <td className='td-heure'>{format(new Date(val.date_ent),'HH:mm')}</td>
                                <td>
                                <button className='btn-sortir' onClick={()=>handleSortie(val.id_ent_pers)}>Sortir</button>  
                                    </td>
                             </tr>
                        ))}    
                        
                    </tbody>
                </table>

            </div>
        
        </div>
    </>
  )
}

export default AffairePers