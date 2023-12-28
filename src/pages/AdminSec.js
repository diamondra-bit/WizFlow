import React ,{useContext, useEffect,useState}from 'react'
import { Link} from 'react-router-dom';
import { useIconeContext } from '../components/store/IconeContext';
import axios from 'axios';
import home from '../pages/images/home.svg'
import computer from '../pages/images/in2.svg'
import logout from '../pages/images/logout.svg'
import out from '../pages/images/out2.svg'
import logo from '../pages/images/logo.png'
import searchDark from '../pages/images/searchDark.svg'
import search2 from '../pages/images/search.svg'
import Darkmode from '../components/Acceuil/Darkmode'


function AdminSec() {
  const {icone}=useIconeContext();
  const[list,setList]=useState([]);
  const [modal,setModal]=useState(false);
  const[securite,setSecurite]=useState("");
  const [mdp,setMdp]=useState("");

  const [clickedLine, setClickedLine]=useState({})

  useEffect(()=>{
    const listSec=()=>{
      axios.get("http://localhost:3003/securite")
      .then((response)=>{
        setList(response.data)
      })
      .catch (err => console.log(err))
    };
    listSec();
  },[])

  const toggleModal=()=>{
    setModal(!modal);
  }
  const [selectid, setSelectid] = useState("");

  const handleRowClick = (id) => {
    toggleModal();
    console.log(`Ligne cliquée avec ID : ${id}`);
    setClickedLine(  
       list.find((value)=>(value.id == id))
    )
    
    setSelectid(id); // Mettez à jour l'état avec le nouvel ID
  };
  
  // Utilisez useEffect pour observer les changements de selectid
  useEffect(() => {
    console.log(selectid); // Ici, selectid aura la nouvelle valeur
    console.log(clickedLine)
  }, [selectid, clickedLine]);


  const handleSubmit=()=>{
    
    axios.put(`http://localhost:3003/securiteModify/${selectid}`,{securite:securite,mdp:mdp})
    .catch(err=>console.log(err))

  }

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
                  <div className='title-material'>Liste des <span><h2 className='title-material-span' >Matériels Sorties</h2></span></div>
                </div>
              {/*Barre de recherche*/}
                <div className='search-bar'>
                  <div> <input type='text' /></div> 
                  <div > <img src={icone? search2:searchDark} className='icone-search'/> </div>
                </div>
        </div>

        <div className='table-container table-container2'>
        <table>
            <thead>
              <tr >  
                <th>Nom  </th>
                <th>Mot de passe</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((val,i)=>(
                <tr key={i}>
                  <td>{val.id_securite}</td>
                  <td>{val.mot_de_passe}</td>
                  <td><button className='btn-sortir' onClick={() => handleRowClick(val.id)}>Modifier</button>
                  </td>
                
                  {modal &&(
                        <div className='modal'>
                            <div className='overlay' onClick={toggleModal}></div>
                                <div className='modal-content'>
                                    <div className='form-add'>
                                      <h2>Modifier</h2>
                                      <form onSubmit={handleSubmit}>
                                          <label>Sécurité</label>
                                          <input type='text' defaultValue={clickedLine.id_securite} onChange={(event)=>{setSecurite(event.target.value)}}/>
                                          <label>Mot de passe</label>
                                          <input type='text' defaultValue={clickedLine.mot_de_passe}  onChange={(event)=>{setMdp(event.target.value)}}/>
                                          <div className='btn-div-modal'>
                                            <button className='btn-modal' type='submit'>Ajouter</button>
                                            <button className='btn-modal' onClick={toggleModal}>Fermer</button>
                                        </div>
                                      </form>
                                </div>           
                            </div>
                        </div>     
                        )}

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

export default AdminSec