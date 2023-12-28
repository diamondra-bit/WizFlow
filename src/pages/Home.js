import React, { useEffect, useState,useContext } from 'react'
import {Bar} from 'react-chartjs-2'
import axios from 'axios'
import {format} from 'date-fns'
import { Chart } from 'chart.js/auto';
import AuthContext from '../components/store/authContext'
import { useIconeContext } from '../components/store/IconeContext';

import Navbar from '../components/Acceuil/Navbar'
import NavbarHorizontal from '../components/Acceuil/NavbarHorizontal'

import monitor from '../pages/images/utilisateur.svg'
import monitor2 from '../pages/images/utilisateurDark.svg'

import input from '../pages/images/in.svg'
import input2 from '../pages/images/inDark.svg'

import out from '../pages/images/out.svg'
import out2 from '../pages/images/outDark.svg'
import '../pages/css/Home.css'



function Home() {
  const [list,setList]=useState([]);
  const [list2,setList2]=useState([]);
  const authContext = useContext(AuthContext);

  const {icone}=useIconeContext();

  const userId=localStorage.getItem('userId');

  /*Afficher l'historique des entrées de matériaux*/
  useEffect(()=>{
    const listEntree=()=>{
      axios.get(`http://localhost:3003/readHistoryEntree/${userId}`)
      .then((response)=>{
        setList(response.data)
      })
      .catch(err=>(console.log(err)))
    };
    listEntree();
  },[])

  /*Afficher l'historique des entrées de matériaux*/
  useEffect(()=>{
    const listSortie=()=>{
      axios.get(`http://localhost:3003/readHistorySortie/${userId}`)
      .then((response)=>{
        setList2(response.data)
      })
      .catch(err=>(console.log(err)))
    };
    listSortie();
  },[])

  /*Count Materiel*/
  const[nbrmat,setNbrmat]=useState();
  useEffect(()=>{
    const countMat=()=>{
      axios.get("http://localhost:3003/countMat")
      .then((response)=>{
        setNbrmat(response.data.sum)
      })
      .catch(err=>(console.log(err)))
    }
    countMat();
  },[])

  /*Count Entree*/
  const [nbrutil,setNbrutil]=useState("");
  useEffect(()=>{
    const countUtil=()=>{
      axios.get("http://localhost:3003/countMat1")
      .then((response)=>{
        setNbrutil(response.data.name)
      })
      .catch(err=>(console.log(err)))
    }
    countUtil();
  },[])

   /*Count Sortie*/
   const[nbrsortie,setNbrsortie]=useState("");
   useEffect(()=>{
    const countSortie=()=>{
      axios.get("http://localhost:3003/countMat2")
      .then((response)=>{
       setNbrsortie(response.data.countSortie)
      })
      .catch(err=>(console.log(err)))
    }
    countSortie(); 
   },[])

  return (
    <>
    <div className='container-home'>
      <div className='navbar'>
      <Navbar/>
      </div>

      <div>
            <NavbarHorizontal show={true} />     
      <div>
      
    </div>

            <div className='main-card'>
              <div className='card card1'>
                <div className='title-card1'><p>{nbrutil!==null?nbrutil:"0"}  <br/> <br/> <span>Utilisateurs</span></p></div>
                <div><img src={icone? monitor:monitor2} className='image-card image-utilisateur' />
               </div>
              </div>
              <div className='card card1'>
                <div className='title-card1'><p> {nbrmat!==null?nbrmat:"0"} <br/> <br/> <span>Entrées</span></p></div>
                <div><img src={icone? input: input2} className='image-card' /></div>
              </div>
              <div className='card card1'>
                <div className='title-card1'><p>{nbrsortie!==null?nbrsortie:"0"}  <br/> <br/> <span>Sorties</span></p></div>
                <div><img src={icone?out :out2} className='image-card' /></div>
              </div>
            </div>

          
            <h1 className='title-card3'>Historique</h1>
            <div className='ligne'></div> <br/> <br/> <br/> <br/>

            <div>
            <h2 className='history-title-entry'>Entrées effectuées récemment</h2>
              <div className='card2'>
              {
              list.map((val,key)=>(
                <div className='history-entree'>  
                  <div className='history-nom history1' >{val.nom_ent}</div>     
    
                  <div  className='history-nom history1'  >{val.date_ent}</div>
                  < div  className='history-nom history1' >{val.heure_ent}</div>
                  <div  className='history-nom history1 historyUser' >{val.lastname}</div>   
             
                </div>              
        ))}
            </div>

          {/*Historique*/}
            <div className='main-card'>       
              </div>
              <h2 className='history-title-entry'>Sorties effectuées récemment</h2>
              <div className='card2'>
                
              {
              list2.map((val,key)=>(
             
                <div className='history-entree'>  
                  <div  className='history-nom history1' >{val.nom_sort}</div>     
                  <div  className='history-nom history1'>{val.date_sort}</div>
                  < div  className='history-nom history1'>{val.heure_sort}</div>     
                  <div  className='history-nom history1 historyUser'>{val.lastname}</div>
                </div>
                          
        ))}
              </div>
            </div>
      </div>
    </div>
    </>
  )
}

export default Home