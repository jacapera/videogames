import React from 'react';
import style from './NavBar.module.css'
import { useNavigate } from 'react-router-dom';

const NavBar = (props) => {

  // Estados y variables locales
  // ----------------------------------------------------
  const navigate = useNavigate();

  // Funciones locales
  // ----------------------------------------------------
  const irHome = () => {
    navigate('/home');
  };

  const irCreateVideoGame = () => {
    navigate('/createVideoGame');
  };

  return(
    <div className={style.navBar}>
      <button className={style.button} onClick={irHome}>HOME</button>
      <button className={style.button} onClick={irCreateVideoGame} >Create Videogame</button>
    </div>
  )
};

export default NavBar;