import React from 'react'
import { Link } from 'react-router-dom'
import '../pagesDepot/cssDepot/connection.css'


function Connection() {

  return (
    <>
    <div className='parent'>
          <div className='container-card'>
            <div className='cercle'></div>
           
              <div className='card'>
                <div className='box'>
                  <div className='content'>
                      <h2>01 </h2>
                      <h3>Administrateur</h3>
                      <p>Connection en tant qu'Administrateur</p>
                      <Link to="/LoginAdmin">Se connecter</Link>
                  </div>
                </div>
              </div> 

               <div className='card'>
                <div className='box'>
                  <div className='content'>
                      <h2>02</h2>
                      <h3>Employé</h3>
                      <p>Connection en tant qu'employé</p>
                      <Link to="/LoginEmploye">Se connecter</Link>
                  </div>
                </div>
              </div> 

              <div className='card'>
                <div className='box'>
                  <div className='content'>
                      <h2>02 </h2>
                      <h3>Sécurité</h3>
                      <p>Connection en tant que sécurité</p>
                      <Link to="/LoginSecurite">Se connecter</Link>
                  </div>
                </div>
              </div>  

              <div className='card'>
                <div className='box'>
                  <div className='content'>
                      <h2>03 </h2>
                      <h3>Affaire Personnel</h3>
                      <p>Enregister vos matériels personnels</p>
                      <Link to="/AffairePers">Se connecter</Link>
                  </div>
                </div>
              </div>  
              <div className='cercle2'></div>   
          </div>         
         
     </div>                                                                                                                               
    </>

  )
}
export default Connection