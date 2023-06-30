import React from 'react';
import style from './NavBar.module.css'
import { useDispatch } from 'react-redux';
import { getVideoGames, isLoadingChange } from '../../redux/action';
import { useNavigate } from 'react-router-dom';

const NavBar = (props) => {

  // Estados y variables locales
  // ----------------------------------------------------
  const navigate = useNavigate();

  // Estados y actions globales
  // ----------------------------------------------------
  const dispatch = useDispatch();

  // Funciones locales
  // ----------------------------------------------------
  const irHome = () => {
    navigate('/home');
    // dispatch(isLoadingChange(true));
    // dispatch(getVideoGames());
  };

  const irCreateVideoGame = () => {
    navigate('/createVideoGame');
  };

  // Funciones Ciclo de vida del Componente
  // ---------------------------------------------------
  // useEffect(() => {

  // }, []);

  return(
    <div className={style.navBar}>
      <button className={style.button} onClick={irHome}>HOME</button>
      <button className={style.button} onClick={irCreateVideoGame} >Create Videogame</button>
    </div>
  )
};

export default NavBar;