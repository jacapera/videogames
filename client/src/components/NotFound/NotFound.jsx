import React, { useEffect } from 'react';
import style from './NotFound.module.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import image from '../../assets/pngwing.com.png';

const NotFound = () => {

  const navigate = useNavigate();

  // Estados y acciones globales
  // -------------------------------------------------------------
  const { error } = useSelector(state => state);


  useEffect(() => {
    if ( error !== "Failed to fetch" || error !== "Network Error"){
      navigate('/home');
    }
  }, [error])

  return (
    <div className={style.notfound}>
      <h1>ERROR 404 - PÁGINA NO ENCONTRADA</h1>
      <img className={style.image} src={image} alt="notfound homero" />
    </div>
  )
}

export default NotFound