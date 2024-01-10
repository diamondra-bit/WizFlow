
import React ,{useContext,useState, useEffect}from 'react'
import axios from 'axios';
import { Link} from 'react-router-dom';
import { useIconeContext } from '../components/store/IconeContext';
import home from '../pages/images/home.svg'
import computer from '../pages/images/in2.svg'
import logout from '../pages/images/logout.svg'
import out from '../pages/images/out2.svg'
import logo from '../pages/images/logo.png'
import searchDark from '../pages/images/searchDark.svg'
import search2 from '../pages/images/search.svg'
import sort from '../pages/images/sort.svg'
import Darkmode from '../components/Acceuil/Darkmode'


function Admin() {
  const {icone}=useIconeContext();
  const [list,setList]=useState([]);
  const [list2,setList2]=useState([]);
  const [listById,setListById]=useState([]);
  const [affcher,setAfficher]=useState(true);

  const [modal,setModal]=useState(false);
  const togglemodal=()=>{
    setModal(!modal)
  }


  useEffect(()=>{
    const listMateriel=()=>{
      axios.get("http://192.168.100.48:4550/readSortie")
      .then((response)=>{
        setList(response.data)
      })
      .catch (err => console.log(err))
    };
    listMateriel();
  },[])

  useEffect(()=>{
    const handleSort=()=>{
      axios.get("http://192.168.100.48:4550/readSortieSort")
      .then((response)=>{
        setList2(response.data)
      })
      .catch (err => console.log(err))
    };
    handleSort();
  },[])
    
    const handleClick=()=>{
      setAfficher(!affcher)
      console.log(affcher)
    }
    const listAfficher=affcher?list:list2;
    
    const handleRowClick=(id)=>{
      togglemodal();
      axios.get(`http://192.168.100.48:4550/readSortieById/${id}`)
      .then((response)=>{
        setListById(response.data)
      })
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
                  <Link to="/"><img src={logout} className='image-icone'/></Link>
                    <Link to="/" className='container-link'>Quitter</Link>
                  </div>

            <div>
                
            </div>
            </div>
             
    </div>
        </div>


      <div className='inline'>
        <div className='container-inline'>
                <div className='inline-add'>
                  <div className='title-material'>Liste des <span><h2 className='title-material-span' >Matériels Sorties</h2></span></div>
                </div>
              
        </div>

        <div className='table-container table-container2'>
        <table>
            <thead>
              <tr >
                <th>Numéro</th>
                <th>Nom </th>
                <th>Etat de sortie<img src={sort} onClick={handleClick} /></th>
                <th>Responsable1</th>
                <th>Responsable2</th>
              </tr>
            </thead>
            <tbody>
              {listAfficher.map((val)=>(
              <tr onClick={()=>handleRowClick(val.id_ent)}>             
                <td>{val.code_ent}</td>
                <td>{val.nom_sort}</td>
                <td className='valide-th' >
                  <span className={val.etat_sortie==='Valide'? 'valide':'invalide'}>{val.etat_sortie}</span>
                </td>
                <td>{val.responsable_nom===null ?
                  <span className='non-spécifié'>__</span>:val.responsable_nom}
                </td>
                <td>{val.responsable_nom2===null ?
                   <span className='non-spécifié'>__</span>:val.responsable_nom2}
                </td>
               
              </tr>
              ))}

                {modal &&(
                                <div className='modal'>
                                  <div className='overlay' onClick={togglemodal}></div>
                                     <div className='modal-content modal-content2'>
                                        <div className='form-add'>
                                            <h2>Informations sur la sortie</h2>
                                           {listById.map((val)=>(
                                            <div>
                                              <li className='li-details'>Numéro: <span className='details'>{val.code_ent}</span></li>
                                              <li className='li-details'>Nom: <span className='details'>{val.nom_sort}</span></li>
                                              <li className='li-details'>Date de sortie: <span className='details'>{val.date_sort}</span></li>
                                              <li className='li-details'>Heure de Sortie: <span  className='details'>{val.heure_sort}</span></li>
                                              <li className='li-details'>Date de sortie2: <span className='details'>{val.date_sort}</span></li>
                                              <li className='li-details'>Heure de Sortie2: <span  className='details'>{val.heure_sort}</span></li>
                                              <li className='li-details'>Date de sortie3: <span className='details'>{val.date_sort}</span></li>
                                              <li className='li-details'>Heure de Sortie3: <span  className='details'>{val.heure_sort}</span></li>
                                              <li className='li-details'>Responsable: <span className='details'>{val.responsable_nom}</span></li>
                                              <li className='li-details'>Responsable2: <span className='details'>{val.responsable_nom2}</span></li>
                                              <li className='li-details'>Responsable3: <span className='details'>{val.responsable_nom}</span></li>
                                              <li className='li-details'>Moyen transport: <span className='details'>{val.moyen_transport}</span></li>
                                              <li className='li-details'>Immatriculation: <span className='details'>{val.voiture_id}</span></li>

                                            </div>
                                           ))}
                                        </div> 
                                    </div>
                                  </div>
                )}
           
            </tbody>
        </table> 
        </div>
      </div>
    </div>
    
  
    </>
  )
}

export default Admin