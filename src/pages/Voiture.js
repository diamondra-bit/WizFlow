import React ,{useContext, useState,useEffect}from 'react'
import { Link} from 'react-router-dom';
import { useIconeContext } from '../components/store/IconeContext';
import home from '../pages/images/home.svg'
import computer from '../pages/images/in2.svg'
import logout from '../pages/images/logout.svg'
import out from '../pages/images/out2.svg'
import logo from '../pages/images/logo.png'
import searchDark from '../pages/images/searchDark.svg'
import search2 from '../pages/images/search.svg'
import Darkmode from '../components/Acceuil/Darkmode'
import axios from 'axios';
import add from '../pages/images/add.svg'


function Voiture() {
    const {icone}=useIconeContext();
    const[list,setList]=useState([]);
    const[listUser,setListUser]=useState([]);


    const[nom,setNom]=useState("")
    const[designation,setDesignation]=useState("");
    const[immatriculation,setImmatriculation]=useState("");


    const [modal,setModal]=useState(false);


    useEffect(()=>{
      const listVoit=()=>{
        axios.get("http://localhost:3003/voiture")
        .then((response)=>{
          setList(response.data)
        })
        .catch (err => console.log(err))
      };
      listVoit();
    },[])

    useEffect(()=>{
      const listUser=()=>{
        axios.get("http://localhost:3003/tusers")
        .then((response)=>{
          setListUser(response.data)
        })
        .catch (err => console.log(err))
      };
      listUser();
    },[])

    const toggleModal=()=>{
      setModal(!modal);
    }
    
    const handleSubmit=()=>{
      axios.post("http://localhost:3003/voitureadd",{nom:nom,designation:designation,immatriculation:immatriculation})
      .catch (err => console.log(err))
};
    

  return (
    <>
    <div className='container-home'>
        <div className='navbar'>
        <div className='container-navbar-left container-navbar-left2'> 
            <div className='container-logo'> 
            <img src={logo} className='logo'/>
            <h1 className='title-logo'>WizFlow</h1>
              </div>


              <div  className='container-center'>
                  <Link to="/Admin"><img src={out} className='image-icone sortie'/> </Link>
                    <Link to="/Admin" className='container-link '>Sorties</Link>
              </div>

              <div  className='container-center'>
              <Link to="/Voiture" > <img src={home} className='image-icone'/></Link>
                <Link to="/Voiture" className='container-link'>Voiture</Link>
              </div>

            <div>
             
                <div  className='container-center'>
                    <Link to="/AdminSec"><img src={computer} className='image-icone'/></Link>
                    <Link to="/AdminSec" className='container-link'>Sécurité</Link>
                  </div>


                  <div  className='container-center'>
                  <Link onClick={logout} ><img src={logout} className='image-icone'/></Link>
                    <Link onClick={logout} className='container-link'>Quitter</Link>
                  </div>

            <div>
                
            </div>
            </div>
             
    </div>
        </div>


      <div className='inline'>
        <div className='container-inline'>
                <div className='inline-add'>
                  <div className='title-material'>Liste des <span><h2 className='title-material-span' >Voitures</h2></span></div>
                </div>
              {/*Barre de recherche*/}
                <div className='search-bar'>
                  <div> <input type='text' /></div> 
                  <div > <img src={icone? search2:searchDark} className='icone-search'/> </div>
                </div>
        </div>

        <div className='table-container table-container2'>
        <div  className='button-div'> 

        <button to="/Ajouter" className='button-entree' onClick={toggleModal}><img src={add}/>Ajouter</button>
        {modal &&(
                      <div className='modal'>
                          <div className='overlay' onClick={toggleModal}></div>
                              <div className='modal-content'>
                                  <div className='form-add'>
                                    <h2>Ajoutez Voiture</h2>
                                    <form onSubmit={handleSubmit}>
                                        <label>Propriétaire</label>
                                        <select onChange={(event)=>{setNom(event.target.value)}}>
                                          {listUser.map((val)=>(
                                            <option value={val.firstname + val.lastname}>
                                                {val.firstname} {val.lastname}
                                            </option>
                                          ))}
                                        </select>
                                        <label>Désignation</label>
                                        <input type='text' onChange={(event)=>{setDesignation(event.target.value)}}/>
                                        <label>Immatriculation</label>
                                        <input type='text'  onChange={(event)=>{setImmatriculation(event.target.value)}}/>
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

        <table>
            <thead>
              <tr >
                
                <th>Désignation </th>
                <th>Immatriculation</th>
                <th>Propriétaire</th>
              </tr>
            </thead>
            <tbody>
              {list.map((val)=>(
                <tr>
                <th>{val.designation}</th>
                <th>{val.immatriculation}</th>
                <th>{val.nom}</th>
                </tr>
              ))}
             
            </tbody>
        </table> 
        </div>
      </div>
    </div>
    </>
  )
}

export default Voiture