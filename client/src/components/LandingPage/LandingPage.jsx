import React from 'react';
import styles from './LandingPage.module.css';
import image from '../../assets/1.jpg';
import { useNavigate } from 'react-router-dom';


const LandingPage = (props) => {

  // Estados y variables locales
  // ----------------------------------------------------
  const navigate = useNavigate();

  // Funciones locales
  // ----------------------------------------------------
  const irHome = () => {
    navigate('/home');
  };

  return (
    <div className={styles.landingPage}>
      <div className={styles.divImg}>
        <img className={styles.imgLanding} src= {image} alt="image"/>
      </div>
      <div className={styles.divMsg}>
        <h1>Hola y bienvenid@!</h1>
        <h1>Prepárate para sumergirte en un universo de juegos fascinantes</h1>
        <h1>¿Estás list@ para la acción?</h1>
        <button className={styles.button} onClick={irHome}>Let's go!</button>
      </div>
    </div>
  )
};

export default LandingPage;