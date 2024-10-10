import React from 'react';
import Layout2 from '../components/Layout/Layout2';
import './About.css';

const About = () => {
  return (
    <Layout2 title={'À propos - MateSync'}>
      <div className="about-container">
        <h1 className="about-title">À propos de nous</h1>
        <p className="about-text">
          Bienvenue sur <strong>MateSync</strong>, une plateforme dédiée à l'accompagnement et au suivi médical des tuteurs par leurs seniors. Notre objectif est de rendre la gestion de la santé plus simple, plus accessible et plus connectée.
        </p>
        <p className="about-text">
          Que vous soyez un tuteur ayant besoin de soins réguliers, ou un senior responsable de la gestion de ces soins, notre plateforme vous offre un suivi personnalisé pour une meilleure organisation des rendez-vous, des traitements, des allergies, et bien plus encore.
        </p>
        <p className="about-text">
          Chez <strong>MateSync</strong>, nous croyons en une approche proactive de la santé, en fournissant des outils modernes pour aider les familles à suivre et gérer le bien-être de leurs proches. Nous nous engageons à fournir une expérience utilisateur fluide, sécurisée et intuitive.
        </p>
        <p className="about-text">
          Merci de nous faire confiance. Ensemble, nous travaillons pour un avenir où la gestion de la santé est simplifiée pour tous.
        </p>
      </div>
    </Layout2>
  );
};

export default About;
