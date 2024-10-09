import React from 'react';
import { Link } from 'react-router-dom';

const Pagenotfound = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - Page non trouvée</h1>
      <p>Oups ! La page que vous recherchez n'existe pas.</p>
      <Link to="/">Retourner à la page d'accueil</Link>
    </div>
  );
};

export default Pagenotfound;
