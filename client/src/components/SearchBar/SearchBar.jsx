import React, { useEffect, useState } from 'react';
import style from './SearchBar.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { getVideoGameByName, resetError } from '../../redux/action';

const SearchBar = (props) => {

// Estados locales
// ----------------------------------------------------
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

// Estados y actions globales
// ----------------------------------------------------
  const dispatch = useDispatch();
  const {error} = useSelector(state => state);

// Funciones locales
// ----------------------------------------------------
  const handleChange = (event) => {
    const { value } = event.target;
    setName(value);
  };

  const getGameByName = (name) => {
    dispatch(getVideoGameByName(name));
    setName("");
  };

  const openModal = () => { setIsModalOpen(true) };
  const closeModal = () => {
    setIsModalOpen(false)
    dispatch(resetError());
    setMessage("");
  };

// Funciones Ciclo de vida del Componente
// ---------------------------------------------------
  useEffect(() => {
    if(error !== ""){
      setMessage(error);
      openModal();
    }
  }, [error]);


  return(
    <div className={style.searchBar}>
      {/* Buscar juego por nombre */}
      <div className={style.divSearchName}>
        <input
          className={style.input}
          type="text"
          name='name'
          value={name}
          onChange={handleChange}
          placeholder='Ingrese nombre del juego'/>
        <button className={style.button} onClick={() => getGameByName(name)}>Search</button>
      </div>
      {/* Mostrar mensaje en Modal */}
      <div>
        {
          isModalOpen && (
            <div className={style.divModal}>
                <div className={style.divMessage}>
                    <h1>{message}</h1>
                <button onClick={closeModal} className={style.button} >Cerrar</button>
                </div>
            </div>
        )}
      </div>
    </div>
  )
};

export default SearchBar;