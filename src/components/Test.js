import React from 'react'
import jwt_decode from 'jwt-decode';

function Test() {

    const token = localStorage.getItem('token');
    if (token) {
      // Décodez le token pour obtenir les informations
      const decodedToken = jwt_decode(token);

      // L'ID de l'utilisateur peut être extrait des données décodées
      const userId = decodedToken.userId; // Assurez-vous d'adapter cette ligne en fonction de la structure de votre token

      console.log('ID de l\'utilisateur :', userId);
  } else {
      console.error('Aucun token n\'a été trouvé dans le stockage local.');
  }

  return (
    <>
   
    </>
  )
}

export default Test