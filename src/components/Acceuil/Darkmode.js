import React, { useState, useEffect, useContext, forwardRef, useImperativeHandle  } from 'react';
import { Link } from 'react-router-dom';
import notifimg from '../../pages/images/notif.svg';
import notifDark from '../../pages/images/notifDark.svg'
import AuthContext from '../store/authContext';
import axios from 'axios';
import done from '../../pages/images/done.svg'
import show2 from '../../pages/images/show.svg'

import { useIconeContext } from '../store/IconeContext';

function Darkmode(props, ref) {

const [show, setShow] = useState(false);
const [username, setUsername] = useState('');
const [firstname, setFirstName] = useState('');
const [lastname, setLastName] = useState('');
const authContext = useContext(AuthContext);
const { icone, updateIcone } = useIconeContext();

/*Nom de  l'utilisateur connecté*/
useEffect(() => {
    const userId = localStorage.getItem('userId');
    axios.get(`http://localhost:3003/nomUser/${userId}`)
      .then((response) => {
        if (response.data) {
          setLastName(response.data.lastname);
          setFirstName(response.data.firstname);
          setUsername(response.data.firstname);
        } else {
          console.error('Nom d\'utilisateur non trouvé.', response);
        }
      })
      .catch((error) => {
        console.error('Erreur lors de la requête:', error);
      });

    return () => { 
    };
}, [authContext.userId]);

/*Notification à chaque sortie*/
const [notif, setNotif] = useState([]);
const triggerNotification = () => {
    const newNotification = `${username} a effectué une nouvelle sortie !`;
    axios
      .post('http://localhost:3003/notifications', {
        username: username,
        message: newNotification,
      })
      .then(() => {
        console.log('Notification envoyée avec succès');
      })
      .catch((error) => {
        console.error('Erreur lors de l\'envoi de la notification :', error);
      });
};

/*Liste des notifications*/
useEffect(() => {
    const listNotif = () => {
      axios
        .get('http://localhost:3003/readNotif')
        .then((response) => {
          setNotif(response.data);
        })
        .catch((error) => {
       
        });
    };
    listNotif();
}, []);

useImperativeHandle(ref, () => ({
    triggerNotification
}));

const showNotif = () => {
    setShow(!show);
};

  /* Dark Mode */
  const darkMode = () => {
    document.querySelector('body').setAttribute('data-theme', 'dark');
  };

  const lightMode = () => {
    document.querySelector('body').setAttribute('data-theme', 'light');
  };


  const toggleTheme = (e) => {

    if (e.target.checked) {
      darkMode();
      updateIcone(false)
    } else {
      lightMode();
     updateIcone(true)
    }
  };


  const handleImageClick = (id) => {
    const userId = localStorage.getItem('userId');
 
    if (userId) {

       const storedData = JSON.parse(localStorage.getItem('clickedData')) || {};
       const clickedIds = storedData[userId] || [];
      
       clickedIds.push(id);

      storedData[userId] = clickedIds;
  
      localStorage.setItem('clickedData', JSON.stringify(storedData));
      window.location.reload();
    }
  };

  const storedData = JSON.parse(localStorage.getItem('clickedData')) || {};
  
  const userId = localStorage.getItem('userId');
  const clickedIds = storedData[userId] || [];
  
  const unclickedNotifications = notif.filter((notification) => !clickedIds.includes(notification.id));

    return (
    <>
   
      <div className="settings">
        <div>
          <input type="checkbox" id="check" onChange={toggleTheme} />
          <label htmlFor="check" className="button"></label>
        </div>

        <div>
          <img src={ icone ? notifimg : notifDark} className="notif2" onClick={showNotif} />
          <div className="counter">{unclickedNotifications.length}</div>
          {show && (
            <div className="div-notif-show">
              <div className="notif-show">

              <ul>


    {notif.map((notification) => (
      <div key={notification.id}>
          {!clickedIds.includes(notification.id) && (
          <div>
              <li>{notification.message}</li>
              <div className='notif-read'>
                <img src={done} onClick={() => handleImageClick(notification.id)} />
                <Link to="/Sortie">
                  <img src={show2} />
                </Link>
              </div>
          </div>
        )}
      </div>
))}

            </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default forwardRef(Darkmode);
