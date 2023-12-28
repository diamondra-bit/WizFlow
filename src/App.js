import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import ChangePassword from './components/Login/ChangePassword';
import Log from './components/Login/Log';
import Entree from './pages/Entree';
import Sortie from './pages/Sortie';
import Ajouter from './pages/Ajouter';
import Connection from './pagesDepot/Connection';

import Loginsecurite from './pages/SEcurité/Loginsecurite';


import Securite1 from './pages/SEcurité/Securite1';
import Test from './components/Test';
import Chart from './components/Chart/Chart';

import MaterielsRecu from './pages/MaterielsRecu';
import LoginAdmin from './pages/LoginAdmin.js';
import Securite2 from './pages/SEcurité/Securite2.js';
import AffairePers from './pages/AffairePers.js';
import Login from './pages/Login';
import Admin from './pages/Admin';
import ChangeAdmin from './components/Login/ChangeAdmin';
import Voiture from './pages/Voiture';
import AdminSec from './pages/AdminSec';


function App() {

  return (
    <div className="App">


    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Connection/>}></Route>

        <Route path='/LoginEmploye' element={<Login/>}></Route>
        <Route path='/LoginSecurite' element={<Loginsecurite/>}></Route>
        <Route path='/LoginAdmin' element={<LoginAdmin/>}></Route>
        <Route path='/ChangeAdmin' element={<ChangeAdmin/>}></Route>

        <Route path='/Admin' element={<Admin/>}></Route>
        <Route path='/Voiture' element={<Voiture/>}></Route>
        <Route path='/AdminSec' element={<AdminSec/>}></Route>

        <Route path='/Home' element={<Home/>}></Route>
        <Route path='/Entree' element={<Entree/>}></Route>
        <Route path='/Sortie' element={<Sortie/>}></Route>
        <Route path='/Chart' element={<Chart/>}></Route>
        <Route path='/Ajouter' element={<Ajouter/>}></Route>
        <Route path='/MatRecu' element={<MaterielsRecu/>}></Route>
        <Route path='/ChangePassword' element={<ChangePassword/>}></Route>

     

        <Route path='/Securite1' element={<Securite1/>}></Route>
        <Route path='/Securite2' element={<Securite2/>}></Route>

        <Route path='/AffairePers' element={<AffairePers/>}></Route>
      </Routes>
    </BrowserRouter>



    </div>
  );
}

export default App;
