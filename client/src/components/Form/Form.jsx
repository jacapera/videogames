import React, { useEffect, useState } from 'react';
import style from './Form.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres, getPlatforms } from '../../redux/action';


const Form = (props) => {

  // Estados locales
  // ----------------------------------------------------------------
  const [createGameForm, setCreateGameForm] = useState({
    name:"",
    description:"",
    genres:[],
    platforms:[],
    rating:0,
    image:"",

  })
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);


  // Estados y acciones globales
  // ----------------------------------------------------------------
  const { allGenres, allPlatforms } = useSelector(state => state);
  const dispatch = useDispatch();

  // Funciones locales
  // ----------------------------------------------------------------
  const handleChangeForm = (event) => {
    const { value, name } = event.target;
    setCreateGameForm({
      ...createGameForm,
      [name]: value
    })
    console.log(name, value);
  };
  
  const handleChangeGender = (event) => {
    const { value } = event.target;
    const aux = createGameForm.genres.includes(value);
    if(aux){
      setMessage(`El genero ${value} ya fue agregado`);
      openModal();
      return;
    }
    if(createGameForm.genres.length > 5){
      setMessage(`Solo puedes agregar hasta 6 generos`);
      openModal();
      return;
    }
    setCreateGameForm({
      ...createGameForm,
      genres: [...createGameForm.genres, value]
    });
  };
  
  const handleChangePlatforms = (event) => {
    const { value } = event.target;
    const aux = createGameForm.platforms.includes(value);
    if(aux){
      setMessage(`La plataforma ${value} ya fue agregada`);
      openModal();
      return;
    }
    if(createGameForm.platforms.length > 5){
      setMessage(`Solo puedes agregar hasta 6 plataformas`);
      openModal();
      return;
    }
    setCreateGameForm({
      ...createGameForm,
      platforms: [...createGameForm.platforms, value]
    });
  };

  const removeGenre = (event) => {
    event.preventDefault();
    const { value } = event.target;
    const aux = createGameForm.genres.filter(genre => genre !== value);
    setCreateGameForm({...createGameForm, genres: aux});
  };

  const removePlatform = (event) => {
    event.preventDefault();
    const { value } = event.target;
    const aux = createGameForm.platforms.filter(platform => platform !== value);
    setCreateGameForm({...createGameForm, platforms: aux});
  };

  const openModal = () => { setIsModalOpen(true) };
  const closeModal = () => {
    setIsModalOpen(false)
    setMessage("");
  };

// Funciones Ciclo de vida del Componente
// ---------------------------------------------------
useEffect(() => {
  dispatch(getGenres());
  dispatch(getPlatforms());
}, []);
  
  return(
    <div className={style.form}>
      <div className={style.divForm}>
        {/* TITULO */}
        <h2>Create Videogame</h2>
        <hr /> <br />
        <form className={style.formCreateGame}>
          {/* IZQUIERDA */}
          <div className={style.formIzquierda} >
            {/* NOMBRE DEL VIDEOGAME */}
            <div className={style.divFormAtribute}>
              <label >Name: </label>
              <input className={style.input} type="text" placeholder='ingresa un nombre' name='name' value={createGameForm.name} onChange={handleChangeForm} />
            </div>
            {/* DESCRIPCION DEL VIDEOGAME */}
            <div className={style.divFormAtribute}>
              <label >Description: </label>
              <textarea className={style.texarea} name="description" cols="30" rows="5" placeholder='ingresa una descripción' value={createGameForm.description} onChange={handleChangeForm}></textarea>
            </div>
            {/* GENEROS A SELECCIONAR QUE SE RELACIONARAN DESPUES EN LA BASE DE DATOS */}
            <div className={style.divFormAtribute}>
              <label >Genres: </label>
              <select className={style.selectGender} value="default" onChange={handleChangeGender}>
              <option value="default" hidden>escoja generos aqui</option>
              {
                allGenres.map(genre => (<option key={genre.idGenreRawg} value={genre.name}>{genre.name}</option>))
              }
            </select>
            </div>
            <div className={style.divFormShowGenre}>
              {
                createGameForm.genres?.map(genreTemp => (
                <div className={style.divFormShowGenreSelected}>
                  <button className={style.buttonCloseGenre} value={genreTemp} onClick={removeGenre}>x</button>
                  <p>{genreTemp}</p>
                </div>))
              }
            </div>
            {/* RATING VIDEOGAME */}
            <div className={style.divFormAtribute}>
              <label >Rating: </label>
              <input className={style.input} type="number" name='rating' value={createGameForm.rating} onChange={handleChangeForm} />
            </div>
          </div>
          {/* DERECHA */}
          <div className={style.formDerecha}>
            <div>
              {/* IMAGE */}
              <div className={style.divFormAtribute}>
                <label >Image: </label>
                <input className={style.input} type="text" placeholder='ingresa URL de la imagen' name='image' value={createGameForm.image} onChange={handleChangeForm} />
                <div className={style.divImg}>
                  <img className={style.imgCreateForm} src={createGameForm.image} alt="" />
                </div>
              </div>
            </div>
            {/* PLATAFORMAS A SELECCIONAR */}
            <div className={style.divFormAtribute}>
              <label>Platforms: </label>
              <select className={style.selectGender}  onChange={handleChangePlatforms}>
              <option value="default" hidden>escoja plataformas aqui</option>
              {
                allPlatforms.map(platform => (<option key={platform.id} value={platform.name}>{platform.name}</option>))
              }
            </select>
            </div>
            <div className={style.divFormShowGenre}>
              {
                createGameForm.platforms?.map(platformTemp => (
                <div className={style.divFormShowGenreSelected}>
                  <button className={style.buttonCloseGenre} value={platformTemp} onClick={removePlatform}>x</button>
                  <p>{platformTemp}</p>
                </div>))
              }
            </div>
            {/* BOTON DE ENVIAR FORMULARIO */}
            <div>
              <button className={style.button} type='submit'>Crear</button>
            </div>
          </div>
        </form>
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
    </div>
)
};


export default Form;