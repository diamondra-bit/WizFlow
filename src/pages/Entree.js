import React, { useState,useEffect,useRef} from 'react'
import { useNavigate } from 'react-router-dom';


import Navbar from '../components/Acceuil/Navbar'
import { useIconeContext } from '../components/store/IconeContext';

import axios from 'axios';
import {format} from 'date-fns'
import { io } from "socket.io-client";
import { useNotification } from '../components/store/NotifContext';// Importez le contexte

import '../pages/css/Entree.css'
import add from '../pages/images/add.svg'
import search2 from '../pages/images/search.svg'
import searchDark from '../pages/images/searchDark.svg'

import Darkmode from '../components/Acceuil/Darkmode';



function Entree({numero}) {

  const [nom,setNom]=useState("");
  const [nombre,setNombre]=useState(0);
  const [id,setId]=useState("");

  const[uid,setUid]=useState("");
  const[recepteur,setRecepteur]=useState("")
  const [utilisateur ,setUtilisateur]=useState([]);

  const navigate= useNavigate();
  const [currentDate,setCurrentDate]=useState(new Date());
  const [currentDate2,setCurrentDate2]=useState(new Date());
  const [modal,setModal]=useState(false);
  const [modal2,setModal2]=useState(false);

  const {icone}=useIconeContext();

 
  /*REcuperer tusers*/
  useEffect(()=>{
    const listUsers=()=>{
      axios.get("http://localhost:3003/tusers")
      .then((response)=>{
        setUtilisateur(response.data);
      })
    }
    listUsers();
  },[])
  

  /*Recuperer la date d'entrée*/
  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleString();
      setCurrentDate(formattedDate);
    }, 1000);
  
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  

      /*Recuperer la date de sortie*/
      useEffect(() => {
        const intervalId = setInterval(() => {
          const currentDate2 = new Date();
          const formattedDate = currentDate2.toLocaleString();
          setCurrentDate2(formattedDate);
        }, 1000);
      
        return () => {
          clearInterval(intervalId);
        };
      }, []);
      
      /*Insérer les matériaux*/
          const handleSubmit= (event)=>{
        
            axios.post("http://localhost:3003/insert"
            ,{nom:nom,nombre:nombre,id:id})

            // for(let i=0; i<2;i++)
            // {
            //   const randomId = Math.floor(Math.random() * 1000000); // Utilisation de Math.random() pour générer un identifiant aléatoire

            //   axios.post("http://192.168.100.218:8000/api/notification_post"
            //   ,{nom:nom,nombre:1,id:randomId})
            // }
           
           
        
          navigate('/Entree');
        }

      /*Modal*/
          const toggleModal=()=>{
            setModal(!modal);
          }
          const toggleModal2=()=>{
            setModal2(!modal);
          }

     /*Afficher les matériaux*/
        const [list,setList]=useState([]);
          useEffect(()=>{
            const listMateriel=()=>{
              axios.get("http://localhost:3003/read")
              .then((response)=>{
                setList(response.data)
              })
              .catch (err => console.log(err))
            };
            listMateriel();
          },[]);    
   
     /*Obtenir le numéro de la ligne cliquée*/
      const [selectid, setSelectid] = useState("");
      const handleRowClick = (id) => {
        console.log(`Ligne cliquée avec ID : ${id}`);
        setSelectid(id); // Mettez à jour l'état avec le nouvel ID
      };
      
      // Utilisez useEffect pour observer les changements de selectid
      useEffect(() => {
        console.log(selectid); // Ici, selectid aura la nouvelle valeur
      }, [selectid]);
   
               
      /*Trigger*/
      const darkModeRef = useRef(null);

      const triggerNotificationInDarkmode = () => {
        if (darkModeRef.current) {
          darkModeRef.current.triggerNotification();
        }
      }
      
     /*Transférer données vers Sortie*/
          const handleUpdate=()=>{
            toggleModal2();
            triggerNotificationInDarkmode ();
            console.log(selectid)
            axios.post(`http://localhost:3003/insertSortie/${selectid}`)
            axios.put(`http://localhost:3003/updateHeure/${selectid}`,{heure_sort:currentDate2})
            axios.put(`http://localhost:3003/updateResponsable/${selectid}`,{uid:uid})
            
            axios.put(`http://localhost:3003/updateRecepteur/${selectid}`,{recepteur:recepteur})
            
            axios.put(`http://localhost:3003/updateSec/${selectid}`)
            axios.put(`http://localhost:3003/updateSec2/${selectid}`)
            axios.put(`http://localhost:3003/updateEtat/${selectid}`)
            axios.put(`http://localhost:3003/deleteSortie/${selectid}`)
            .catch(err=>console.log(err))
          }

      /*Search*/
          const [texte, setTexte] = useState("");
          const [searchlist, setSearchlist] = useState([]);  
          const handleSearch = () => {
              axios.get(`http://localhost:3003/searchEntree?texte=${encodeURIComponent(texte)}`)
              .then((response) => {
                setSearchlist(response.data); 
              })
              .catch(err => console.log(err))
              .finally(() => {
                // Vous pouvez mettre ici d'autres actions à effectuer après la recherche.
              });
              toggleSearch();
          };
  
      /*ToggleSearch*/
            const[search,setSearch]=useState(true);
            const toggleSearch=()=>{ 
              setSearch(!search);
              console.log(search);
           /*   window.location.reload();*/
          }

      
  return (
    <>

    <div className='container-home ' >
      <div  className='navbar'> <Navbar/></div>

      <div>
        <div className='darknotif-top'>
       
        <div className='navbar-flex'>
         <Darkmode  ref={darkModeRef} uid={uid}/>     
          </div> 
        </div>
 

            {/*Section 1*/}
            <div className='container-inline'>
                <div className='inline-add'>
                  <div className='title-material'>Liste des <span><h2 className='title-material-span' >Matériels</h2></span></div>
                </div>
              {/*Barre de recherche*/}
                <div className='search-bar'>
                  <div> <input type='text' onChange={(event)=>{setTexte(event.target.value)}} /></div> 
                  <div  onClick={handleSearch}> <img src={icone? search2:searchDark} className='icone-search'/> </div>
                </div>
            </div>

          {/*Table */}
          <div className='table-container'>
              <div  className='button-div'> 
                  <button to="/Ajouter" className='button-entree' onClick={toggleModal}><img src={add}/>Ajouter</button>

                  {/*Modal d'ajout*/}
                  {modal &&(
                      <div className='modal'>
                          <div className='overlay' onClick={toggleModal}></div>
                              <div className='modal-content'>
                                  <div className='form-add'>
                                    <h2>Entrer de nouveaux matériels</h2>
                                    <form onSubmit={handleSubmit}>
                                        <label>Nom matériel</label>
                                        <input type='text' onChange={(event)=>{setNom(event.target.value)}}/>
                                        <label>Nombre </label>
                                        <input type='number' onChange={(event)=>{setNombre(event.target.value)}}/>
                                        <label>Numéro utilisateur</label>
                                        <input type='number'  onChange={(event)=>{setId(event.target.value)}}/>
                                        <div className='btn-div-modal'>
                                          <button className='btn-modal' type='submit'>Ajouter</button>
                                          <button className='btn-modal' onClick={toggleModal}>Fermer</button>
                                      </div>
                                    </form>
                              </div>           
                          </div>
                      </div>     
                   )}
            </div>

            {/* Sans Searchbar par défaut */}
              {search&&(
                  <table >
                    <thead>
                      <tr >
                      <th>Id du matériel</th>
                      <th>Nom du matériel</th>
                      <th>Date d'entrée</th>
                      <th>Heure d'entrée</th>
                      <th>Responsable</th>
                      <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {list.map((val)=>(
                        
                          <tr key={val.id_ent} onClick={() => handleRowClick(val.id_ent)}>
                             <td>{val.id_ent}</td>
                            <td>{val.nom_ent}</td>  
                            <td>{val.date_ent}</td>
                            <td>{val.heure_ent}</td>
                            <td className='td-responsable'>{val.firstname}   {val.lastname}</td>
                            <td> <button className='btn-sortir' onClick=
                           {toggleModal2} >Sortir</button> 
                            </td>
                        </tr>   
                      ))}

                            {/*Modal Sortie*/}
                            {modal2 &&(
                                <div className='modal'>
                                  <div className='overlay' onClick={toggleModal2}></div>
                                     <div className='modal-content modal-content2'>
                                        <div className='form-add'>
                                            <h2>Informations sur la sortie</h2>
                                            <form onSubmit={handleSubmit}>
                                              <label>Numéro du responsable de sortie</label>
                                              <input type='text' onChange={(event)=>{setUid(event.target.value)}}/>
                                              <label>Récepteur</label>
                                              <div class="custom-select" >
                                                  <select onChange={(event) => { setRecepteur(event.target.value) }}>
                                                      {utilisateur.map((utilisateur) => (
                                                        
                                                        <option className='option' key={utilisateur.id} value={utilisateur.id}>
                                                          {utilisateur.firstname}  {utilisateur.lastname}
                                                        </option>
                                                      ))}    
                                                  </select>
                                                </div>
                                              {/*
                                                    <select onChange={(event) => { setRecepteur(event.target.value) }}>
                                                  {utilisateur.map((utilisateur) => (
                                                    <option key={utilisateur.id} value={utilisateur.id}>
                                                      {utilisateur.firstname}  {utilisateur.lastname}
                                                    </option>
                                                  ))}
                                                </select>
                                              */}
                                        
                                              <div className='btn-div-modal'>
                                              <button className='btn-modal' type='submit' onClick={handleUpdate}>Ajouter</button>
                                              <button className='btn-modal' onClick={toggleModal2}>Fermer</button>
                                              </div>
                                           </form>
                                        </div> 
                                    </div>
                                  </div>
                              )}
                    </tbody>
                  </table>
               )}

            {/*  Searchbar */}
              {!search &&(
                  <table>
                      <thead>
                        <th>Nom du matériel</th>
                        <th>Date d'entrée</th>
                        <th>Heure d'entrée</th>
                        <th>Responsable</th>
                        <th>Actions</th>
                      </thead>
                      <tbody>
                          {searchlist.map((val)=>(
                            
                              <tr key={val.id_ent} onClick={() => handleRowClick(val.id_ent)}>
                              <td>{val.nom_ent}</td>
                              <td>{val.date_ent}</td>
                              <td>{val.heure_ent}</td>
                              <td >{val.firstname}</td>
                              <td>
                                <button className='btn-sortir' onClick={toggleModal2} >Sortir</button>  
                              </td>
                            </tr>     
                         ))}
                                     
                              {/*Modal Sortie*/}
                              {modal2 &&(
                                <div className='modal'>
                                  <div className='overlay' onClick={toggleModal2}></div>
                                    <div className='modal-content modal-content2'>
                                      <div className='form-add'>
                                        <h2>Informations sur la sortie</h2>
                                        <form onSubmit={handleSubmit}>
                                          <label>Numéro du responsable de sortie</label>
                                          <input type='text' onChange={(event)=>{setUid(event.target.value)}}/>
                                          <div className='btn-div-modal'>
                                          <button className='btn-modal' type='submit' onClick={() => {
                                            handleUpdate();  }}>Ajouter</button>
                                          <button className='btn-modal' onClick={toggleModal2}>Fermer</button>
                                          </div>                           
                                      </form>
                                    </div>           
                                </div>
                              </div>
                              )}
                      </tbody>
                  </table>
                  )}
            </div>
    
      </div>
    </div>
    </>
  )
}

export default Entree