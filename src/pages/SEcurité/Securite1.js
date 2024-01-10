import React, { useEffect, useState } from 'react'
import './Securite1.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import back from '../images/back.svg'
import { Link } from 'react-router-dom';

function Securite1() {
    const[list,setList]=useState([]);
    const [modal,setModal]=useState(false);

    const [nom_sec,setNom_sec]=useState("");
    const [id_sec,setId_sec]=useState("");
    const [id_sort,setId_sort]=useState("");
    const [voiture_id,setVoiture_id]=useState("");
   
    const [transport_sec,setTransport_sec]=useState("");
    const [heure_sort_sec,setHeure_sort_sec]=useState(new Date());

    const [utilisateur ,setUtilisateur]=useState([]);

    const [voiture ,setVoiture]=useState([]);
 
     /*Obtenir le numéro de la ligne cliquée*/
     const [selectid, setSelectid] = useState("");
     const handleRowClick = (id) => {
       setSelectid(id); // Mettez à jour l'état avec le nouvel ID
     };

     useEffect(() => {
        console.log(selectid); // Ici, selectid aura la nouvelle valeur
      }, [selectid]);


    useEffect(()=>{
        const listUsers=()=>{
          axios.get("http://192.168.100.48:5000/tusers")
          .then((response)=>{
            setUtilisateur(response.data);
          })
        }
        listUsers();
      },[])

      useEffect(()=>{
        const listVoit=()=>{
          axios.get("http://192.168.100.48:5000/voiture")
          .then((response)=>{
            setVoiture(response.data);
          })
        }
        listVoit();
      },[])

    const navigate=useNavigate();

    const handleSubmit=()=>{
        console.log(`Ligne cliquée avec ID : ${selectid}`);

        // axios.put(`http://192.168.100.48:5000/sortieSec1/`,{id_sec:id_sec,id_sort:id_sort})
        axios.put(`http://192.168.100.48:5000/sortieSec2`,
        {nom_sec:nom_sec,transport_sec:transport_sec,voiture_id:voiture_id,id_sort:selectid})   
       .catch(err=>console.log(err))
   
      }
    useEffect(()=>{
        const listSortie=()=>{
            axios.get("http://192.168.100.48:5000/readSortie")
            .then((response)=>{
                setList(response.data)                
            })
        }
        listSortie();
    },[])

    const toggleModal=()=>{
        setModal(!modal);
      }
  return (
    <>
    <div className='table-body'>

<br/> 
             <div className='table__header'>
                <div className='table-titre'>Sortie matériel</div>
                <div><Link to="/LoginSecurite"><img src={back}/></Link></div>
            </div>

            {modal &&(
              <div className='modal'>
                <div className='overlay-security' onClick={toggleModal}></div>
                    <div className='modal-content-security'>
                        <div className='form-add'>
                          <h2>Confirmez la sortie</h2>
                          <form >                                             
                            <label>Nom du responsable du transport</label>
                            <select onChange={(event) =>{ setNom_sec(event.target.value) }}>
                                {utilisateur.map((utilisateur) => (                            
                                     <option className='option' key={utilisateur.id} value= {utilisateur.firstname +' '+utilisateur.lastname}>
                                     {utilisateur.firstname}  {utilisateur.lastname}
                                     </option>
                                ))}    
                            </select>

                            <label>Moyens de transport</label>
                            <select  onChange={(e) =>{setTransport_sec(e.target.value)}}>
                                <option value=""></option>
                                <option value="Pied">Pied</option>
                                <option value="Voiture">Voiture</option>
                                <option value="Moto">Moto</option>
                                <option value="Vélo">Vélo</option>
                            </select>
                            

                            <label>Immatriculation</label>
                             <select  onChange={(e)=>{setVoiture_id(e.target.value)}} >
                              <option></option>
                                {voiture.map((val) => (                            
                                     <option className='option' key={val.immatriculation} value= {val.immatriculation}>
                                        {val.immatriculation}
                                     </option>
                                ))}    
                            </select>
                            <div className='btn-div-modal'>
                            <button className='btn-modal' type='submit'  onClick={()=>handleSubmit( )}>Ajouter</button>
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
                            <th>Responsable</th>
                            <th  className='th-date'>Date de sortie</th>
                            <th>Heure de Sortie</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                      {list
                      .filter((val) => val.securite1 === 'X')
                      .map((val) => (
                          <tr key={val.id_ent} onClick={() => handleRowClick(val.id_ent)}>
                            <td>{val.id_ent}</td>
                            <td>{val.nom_sort}</td>
                            <td>{val.lastname} {val.firstname}</td>
                            <td className='td-date'>{val.date_sort}</td>
                            <td className='td-heure'>{val.heure_sort}</td>
                            <td><button className='btn-table' onClick={toggleModal}>Valider</button></td>
                          </tr>
                      ))}
  
                        
                    </tbody>
                </table>

            </div>
        
        </div>
    </>
  )
}

export default Securite1