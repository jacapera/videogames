import React, { useEffect, useState } from 'react';
import style from './SearchBar.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { filterGenre, filterByName, orderVideoGames } from '../../redux/action';

const SearchBar = (props) => {

// Estados locales
// ----------------------------------------------------
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("")
  const [order, setOrder] = useState("");

// Estados y actions globales
// ----------------------------------------------------
  const dispatch = useDispatch();
  const { error, allGenres } = useSelector(state => state);

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

  const handleOrderly = (event) => {
    const { value } = event.target;
    //console.log(value)
    setOrder(value);
  };

  const orderVideoGame = (order) => {
    //console.log(order)
    dispatch(orderVideoGames(order));
    setOrder("");
  };

  const getGameByName = (name) => {
    //dispatch(getVideoGameByName(name));
    dispatch(filterByName(name))
    setName("");
  };

  const filterBYGenre = (genre) => {
    dispatch(filterGenre(genre))
    setGenre("");
  };

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
            <option value="All" >All</option>
            {
              allGenres.map(genre => <option key={genre.idGenreRawg}>{genre.name}</option>)
            }
          </select>
          <button onClick={()=>filterBYGenre(genre)} className={style.button}>Search</button>
        </div>
      </div>
      {/* ORDENAR */}
      <div className={style.divSearchGenre}>
          <div className={style.divSearchGenreTitulo}>
            <h2>Ordenar</h2>
          </div>
        <div className={style.divSearchGenreSelect}>
          <select className={style.selectGender} defaultValue={"default"} onChange={handleOrderly}>
            <option value="default" hidden>escoja aqui</option>
            <option value={"A-Z"} >A-Z</option>
            <option value={"Z-A"} >Z-A</option>
            <option value={"ratingMin"} >Rating-Min</option>
            <option value={"ratingMax"} >Rating-Max</option>
          </select>
          <button onClick={()=>orderVideoGame(order)} className={style.button}>Order</button>
        </div>
      </div>
    </div>
  )
};

export default SearchBar;