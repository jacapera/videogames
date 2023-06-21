import React, { useEffect, useState } from 'react';
import style from './SearchBar.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { filterGenre, getVideoGameByName, resetError } from '../../redux/action';

const SearchBar = (props) => {

// Estados locales
// ----------------------------------------------------
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [genre, setGenre] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false);

// Estados y actions globales
// ----------------------------------------------------
  const dispatch = useDispatch();
  const { error, allGenres, allVideoGames } = useSelector(state => state);

// Funciones locales
// ----------------------------------------------------
  const handleChange = (event) => {
    const { value } = event.target;
    setName(value);
  };

  const handleFilterGender = (event) => {
    const { value } = event.target;
    setGenre(value);
  };

  const getGameByName = (name) => {
    dispatch(getVideoGameByName(name));
    setName("");
  };

  const filterBYGenre = (genre) => {
    dispatch(filterGenre(genre))
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
        <div className={style.divSearchNameTitulo}>
          <h2>Buscar por nombre</h2>
        </div>
        <div className={style.divSearchNameInput}>
          <input
            className={style.input}
            type="text"
            name='name'
            value={name}
            onChange={handleChange}
            placeholder='Ingrese nombre del juego'/>
          <button className={style.button} onClick={() => getGameByName(name)}>Search</button>
        </div>
      </div>
      {/* Selector por Genero */}
      <div className={style.divSearchGenre}>
          <div className={style.divSearchGenreTitulo}>
            <h2>Buscar por Genero</h2>
          </div>
        <div className={style.divSearchGenreSelect}>
          <select className={style.selectGender}  name="genre" value={genre} onChange={handleFilterGender}>
            <option value="default" hidden>escoja genero aqui</option>
            {
              allGenres.map(genre => <option key={genre.idGenreRawg}>{genre.name}</option>)
            }
          </select>
          <button onClick={()=>filterBYGenre(genre)} className={style.button}>Genero</button>
        </div>
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