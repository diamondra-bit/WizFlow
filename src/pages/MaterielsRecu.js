import React, { useEffect, useState } from 'react'
import Navbar from '../components/Acceuil/Navbar'
import axios from 'axios';
import search from '../pages/images/search.svg'
import '../pages/css/Sortie.css'
import DarkNotif from '../components/Acceuil/DarkNotif';
import { useNavigate } from 'react-router-dom';

function MaterielsRecu() {
    const [list,setList]=useState([]);
    

    /*Afficher les sorties*/
    useEffect(() => {
        const id = localStorage.getItem('userId');
    
        axios.get(`http://192.168.100.48:4550/readSortieRecepteur?id=${id}`)
            .then((response) => {
                setList(response.data);
            })
            .catch(err => console.log(err));
    
    }, []);


      const handleRowClick = async (id) => {  
        
        console.log(`Ligne cliquée avec ID console: ${id}`);
      
        // Utilisez la nouvelle valeur de selectid dans les appels Axios
        try {
          await axios.post(`http://192.168.100.48:4550/insertEntree/${id}`);
          await axios.put(`http://192.168.100.48:4550/deleteEntree/${id}`);
        } catch (error) {
          console.error("Une erreur s'est produite :", error);
        }
        window.location.reload();
      };

    

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
              <div className='title-material'>Liste des Matériels <span><h2 className='title-material-span' >Reçus</h2></span></div>
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
              <th>Actions</th>
            

            </thead>
            <tbody>
              {
               list.map((val)=>(
                <tr key={val.id_ent} >
                   <td className='td-id td-nom'>{val.id_ent}</td>
                  <td className='td-id td-nom'>{val.nom_sort}</td>
                  <td className='td-heure'>{val.date_sort}</td>
                  <td className='td-sortie'>{val.heure_sort}</td>
                  <td >
                  <button className='btn-sortir' onClick={() => handleRowClick(val.id_ent)}
                  >Accepter</button>
                  </td>
                
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

export default MaterielsRecu