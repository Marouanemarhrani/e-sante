import React from 'react';
import Header from './Header';
import { Helmet } from 'react-helmet';
import { Toaster } from 'react-hot-toast';

const Layout2 = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet='utf-8' />
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
        <meta name='author' content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main className="main-content"> {/* Déplacement du style inline vers CSS */}
        <Toaster />
        {children}
      </main>
    </div>
  );
};

// Adapter les valeurs par défaut pour le projet e-santé
Layout2.defaultProps = {
  title: 'E-Santé - Votre suivi médical en ligne',
  description: 'Une plateforme pour les seniors et leurs tuteurs pour gérer la santé de manière efficace',
  keywords: 'santé, seniors, suivi médical, e-santé, tuteur, bien-être',
  author: 'Marouane Marhrani',
};

export default Layout2;
