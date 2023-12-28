import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import home from '../../pages/images/home.svg'
import computer from '../../pages/images/in2.svg'
import logout1 from '../../pages/images/logout.svg'
import out from '../../pages/images/out2.svg'
import logo from '../../pages/images/logo.png'

import list from '../../pages/images/list.svg'
import chart from '../../pages/images/chart.svg'



function Navbar() {
  const navigate=useNavigate();

  const logout =(event)=>{
    event.preventDefault();
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    navigate('/')

  }

  return (
    <>
    <div className='container-navbar-left'> 
            <div className='container-logo'> 
            <img src={logo} className='logo'/>
            <h1 className='title-logo'>WizFlow</h1>
              </div>

              <div  className='container-center'>
              <Link to="/Home" > <img src={home} className='image-icone'/></Link>
                <Link to="/Home" className='container-link'>Acceuil</Link>
              </div>

            <div>
             
                <div  className='container-center'>
                    <Link to="/Entree"><img src={computer} className='image-icone'/></Link>
                    <Link to="/Entree" className='container-link'>Entrées</Link>
                  </div>

                  <div  className='container-center'>
                  <Link to="/Sortie"><img src={out} className='image-icone sortie'/> </Link>
                    <Link to="/Sortie" className='container-link '>Sorties</Link>
                  </div>

            <div>
                
                  <div  className='container-center'>
                  <Link to="/MatRecu"><img src={list} className='image-icone'/></Link> 
                    <Link to="/MatRecu" className='container-link'>Matériel Reçus</Link>
                  </div>

                  <div  className='container-center'>
                  <Link to="/Chart" ><img src={chart} className='image-icone'/></Link>
                  <Link to="/Chart" className='container-link'>Graphique</Link>
                  </div>

                  <div  className='container-center'>
                  <Link onClick={logout} ><img src={logout1} className='image-icone'/></Link>
                    <Link onClick={logout} className='container-link'>Quitter</Link>
                  </div>


            </div>
            </div>
             
    </div>
   
    </>
  )
}

export default Navbar