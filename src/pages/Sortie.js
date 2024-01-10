import React, { useEffect, useState } from 'react'
import Navbar from '../components/Acceuil/Navbar'
import Darkmode from '../components/Acceuil/Darkmode'
import {format} from 'date-fns'
import axios from 'axios';
import search from '../pages/images/search.svg'
import '../pages/css/Sortie.css'
import DarkNotif from '../components/Acceuil/DarkNotif';

function Sortie() {
  const [list,setList]=useState([]);

  /*Afficher les sorties*/
  useEffect(()=>{
    const listMateriel=()=>{
      axios.get("http://192.168.100.48:4550/readSortie")
      .then((response)=>{
        setList(response.data)
      })
      .catch (err => console.log(err))
    };
    listMateriel();
  },[]);

  return (
    <>
    <div className='container-home'>
        <div className='navbar'><Navbar/></div>

        <div>
        <div className='darknotif-top'>
        <DarkNotif/>
        </div>
        <div className='container-inline'>

            <div className='inline-add'>
              <div className='title-material'>Liste des Matériels <span><h2 className='title-material-span' >Sorties</h2></span></div>
            </div>

            <div className='search-bar'>
            <div> <input type='text' placeholder=''/></div> 
            <div><img src={search} className='icone-search'/></div>
            </div>
          </div>

          <div className='table-container'>
          <table>
            <thead>
            <th>Id du matériel</th>
              <th>Nom du matériel</th>
              <th>Date de sortie</th>
              <th >Heure de sortie</th>
              <th> Nom du Responsable</th>
            

            </thead>
            <tbody>
              {
               list.map((val)=>(
                <tr>
                   <td className='td-id td-nom'>{val.id_ent}</td>
                  <td className='td-id td-nom'>{val.nom_sort}</td>
                  <td className='td-heure'>{val.date_sort}</td>
                  <td className='td-sortie'>{val.heure_sort}</td>
                  <td >{val.firstname} {val.lastname}</td>
                
    </tr>
               ))
              }
            </tbody>
          </table>
        </div>
        </div>
    </div>

    </>
  )
}

export default Sortie