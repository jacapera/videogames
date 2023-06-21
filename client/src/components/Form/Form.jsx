import React, { useEffect, useState } from 'react';
import style from './Form.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres } from '../../redux/action';


const Form = (props) => {

  // Estados locales
  // ----------------------------------------------------------------
  const [createGameForm, setCreateGameForm] = useState({
    name: "",
    description: "",
    genres: [],

  })

  // Estados y acciones globales
  // ----------------------------------------------------------------
  const { allGenres } = useSelector(state => state);
  const dispatch = useDispatch();

  // Funciones locales
  // ----------------------------------------------------------------
  const handleChangeGender = (event) => {
    const { value } = event.target
    setCreateGameForm({
      ...createGameForm,
      genres: [...createGameForm.genres,value]
    });
  };

// Funciones Ciclo de vida del Componente
// ---------------------------------------------------
useEffect(() => {
  dispatch(getGenres());
}, []);
  
  return(
    <div className={style.form}>
      {console.log(allGenres)}
      <div className={style.divForm}>
        <form >
          <h2>Create Videogame</h2>
          <div>
            <label htmlFor="">Name: </label>
            <input className={style.input} type="text" placeholder='ingresa nombre' name='name' value={createGameForm.name} />
          </div>
          <div>
            <label htmlFor="">Description: </label>
            <textarea className={style.texarea} name="description" cols="30" rows="5" placeholder='ingresa una descripción' value={createGameForm.description}></textarea>
          </div>
          <div>
            <label htmlFor="">Genres: </label>
            <select className={style.selectGender}  onChange={handleChangeGender}>
            <option value="default" hidden>escoja genero aqui</option>
            {
              allGenres.map(genre => (<option key={genre.idGenreRawg} value={genre.name}>{genre.name}</option>))
            }
          </select>
          </div>
          <div>
            <button className={style.button} type='submit'>Crear</button>
          </div>
        </form>
      </div>
    </div>
)
};


export default Form;