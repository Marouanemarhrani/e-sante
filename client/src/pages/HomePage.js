import React, { useState, useEffect } from 'react';
import Layout from "../components/Layout/Layout"; // Assuming Layout is your page wrapper
import './HomePage.css'; // Custom CSS for this page
import apropo from "./../data/apropo.webp"

const HomePage = () => {
    const [tuteurMood, setTuteurMood] = useState('neutral'); // Default mood is 'neutral'

    // Simulate fetching the tuteur's mood (e.g., from backend)
    useEffect(() => {
        const fetchedMood = 'neutral';  // Simulated mood of the tuteur
        setTuteurMood(fetchedMood);
    }, []);

    return (
        <Layout title="Accueil">
            {/* Mood Display Section */}
            <div className="mood-section">
                <h1>Humeur de Marouane aujourd'hui</h1>
                <div className="mood-display">
                    <span 
                        className={`emoji ${tuteurMood === 'excellent' ? 'selected' : ''}`} 
                        role="img" 
                        aria-label="excellent"
                    >
                        😄
                    </span>
                    <span 
                        className={`emoji ${tuteurMood === 'good' ? 'selected' : ''}`} 
                        role="img" 
                        aria-label="good"
                    >
                        🥱
                    </span>
                    <span 
                        className={`emoji ${tuteurMood === 'neutral' ? 'selected' : ''}`} 
                        role="img" 
                        aria-label="neutral"
                    >
                        😔
                    </span>
                    <span 
                        className={`emoji ${tuteurMood === 'bad' ? 'selected' : ''}`} 
                        role="img" 
                        aria-label="bad"
                    >
                        😐
                    </span>
                    <span 
                        className={`emoji ${tuteurMood === 'terrible' ? 'selected' : ''}`} 
                        role="img" 
                        aria-label="terrible"
                    >
                        🤢
                    </span>
                </div>
            </div>

            {/* Website Introduction Section */}
            <section className="introduction">
                <div className="intro-content">
                    <div className="intro-text">
                        <h2>À propos de nous</h2>
                        <p>
                            MateSync vous offre une solution complète pour surveiller votre santé au quotidien. 
                            Que ce soit pour vérifier votre tension, votre rythme cardiaque, ou simplement pour
                            suivre votre humeur, nous sommes là pour vous. Découvrez nos fonctionnalités premium 
                            pour une expérience encore plus personnalisée.
                        </p>
                    </div>
                    <div className="intro-image-container">
                        <img src={apropo} alt="Introduction" className="intro-image" />
                    </div>
                </div>
            </section>

            {/* Subscription Section */}
            <section className="subscription-section">
                <h2>Nos Offres</h2>
                <div className="subscription-options">
                    <div className="subscription-option">
                        <h3>Basic Package</h3>
                        <h4>$14.99 / month</h4>
                        <p>
                            Constantes vitales<br/>
                            Suivi & rappel médicamenteux<br/>
                            Deux contacts d'urgences<br/>
                            Suivi de l'humeur<br/>
                            Importation de document<br/>
                            Reconnaissance vocale
                        </p>
                    </div>
                    <div className="subscription-option">
                        <h3>Full Package</h3>
                        <h4>$19.99 / month</h4>
                        <p>
                            Messagerie instantanée Patient/Tuteur<br/>
                            Chatbot IA<br/>
                            Six contacts d'urgences<br/>
                            Suivi du sommeil<br/>
                            Suivi d'hydratation<br/>
                            Partage de document<br/>
                            Calendrier avec rappel de rdv
                        </p>
                    </div>
                </div>
            </section>

            {/* Health Data Section */}
            <section className="health-data">
                <h2>Votre état de santé</h2>
                <div className="health-metrics">
                    <div className="metric">
                        <h3>Rythme Cardiaque</h3>
                        <p>72 bpm</p>
                        <img src="/path/to/heart-rate-image.jpg" alt="Heart Rate" />
                    </div>
                    <div className="metric">
                        <h3>Tension</h3>
                        <p>120/80 mmHg</p>
                        <img src="/path/to/blood-pressure-image.jpg" alt="Blood Pressure" />
                    </div>
                </div>
            </section>

            {/* Sleep and Walking Data Section */}
            <section className="activity-data">
                <h2>Suivi de votre activité</h2>
                <div className="activity-metrics">
                    <div className="metric">
                        <h3>Sommeil</h3>
                        <p>7 heures</p>
                        <img src="/path/to/sleep-image.jpg" alt="Sleep" />
                    </div>
                    <div className="metric">
                        <h3>Pas Quotidiens</h3>
                        <p>10,000 pas</p>
                        <img src="/path/to/walking-image.jpg" alt="Walking" />
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default HomePage;
