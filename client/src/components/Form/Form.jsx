import React, { useEffect, useState } from 'react';
import style from './Form.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres, getPlatforms, postVideoGame } from '../../redux/action';
import validation from './validation';
import { useNavigate } from 'react-router-dom';


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
    released:"",

  })
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [formValid, setFormValid] = useState(false);
  const navigate = useNavigate();


  // Estados y acciones globales
  // ----------------------------------------------------------------
  const { allGenres, allPlatforms } = useSelector(state => state);
  const dispatch = useDispatch();

  // Funciones locales
  // ----------------------------------------------------------------
  const handleChangeForm = (event) => {
    const { value, name } = event.target;
    // Validación para Rating
    if(value < 0 || value > 5 ){
      event.preventDefault();
      setMessage(`El rating min es 0 y el max es 5`);
      openModal();
      return;
    }

    // Validaciones para Generos
    if(name === "genres"){
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
      setCreateGameForm({...createGameForm, genres:[...createGameForm.genres, value]});
      setErrors(validation({...createGameForm, genres:[...createGameForm.genres, value]}));
      return;
    }

    // Validación para Plataformas
    if(name === 'platforms'){
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
      setCreateGameForm({...createGameForm, platforms:[...createGameForm.platforms, value]});
      setErrors(validation({...createGameForm, platforms:[...createGameForm.platforms, value]}));
      return;
    }
    // Resto del Formulario
    setCreateGameForm({
      ...createGameForm,
      [name]: value
    })
    setErrors(validation({
      ...createGameForm,
      [name]: value
    }))
  };
  
  const removeGenre = (event) => {
    event.preventDefault();
    const { value } = event.target;
    const aux = createGameForm.genres.filter(genre => genre !== value);
    if(!aux.length) setErrors(validation({...createGameForm, genres:[]}));
    setCreateGameForm({...createGameForm, genres: aux});
  };
  
  const removePlatform = (event) => {
    event.preventDefault();
    const { value } = event.target;
    const aux = createGameForm.platforms.filter(platform => platform !== value);
    if(!aux.length) setErrors(validation({...createGameForm, platforms:[]}));
    setCreateGameForm({...createGameForm, platforms: aux});
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    let auxErrors = [];
    auxErrors = Object.entries(errors);
    if(auxErrors.length === 0){
      dispatch(postVideoGame(createGameForm));
      setMessage('Video Juego Creato con Exito!');
      setCreateGameForm({
        name:"",
        description:"",
        genres:[],
        platforms:[],
        rating:0,
        image:"",
        released:"",
      })
      setErrors({});
      openModal();
    }
  };

  const openModal = () => { setIsModalOpen(true) };
  const closeModal = () => {
    setIsModalOpen(false)
    if(message === 'Video Juego Creato con Exito!')
    setMessage("");
    navigate('/home');
  };

  // Funciones Ciclo de vida del Componente
  // ---------------------------------------------------
  useEffect(() => {
    dispatch(getGenres());
    dispatch(getPlatforms());
  }, []);
  
  useEffect(() => {
    console.log(createGameForm);
    console.log(errors);
    const {name, description, image, released, rating, genres, platforms} = createGameForm;
    if(!name || !description || !image || !released || !genres || !platforms || !rating){
      setFormValid(false);
      return;
    }
    if(Object.keys(errors).length === 0) setFormValid(true);
    else setFormValid(false);
  }, [createGameForm, errors]);

  return(
    <div className={style.form}>
      <div className={style.divForm}>
        {/* TITULO */}
        <h2>Create Videogame</h2>
        <hr /> <br />
        <form onSubmit={handleSubmit} className={style.formCreateGame}>
          {/* IZQUIERDA */}
          <div className={style.formIzquierda} >
            {/* NOMBRE DEL VIDEOGAME */}
            <div className={style.divFormAtribute}>
              <label >Name: </label>
              <input className={style.input} type="text" placeholder='ingresa un nombre' name='name' value={createGameForm.name} onChange={handleChangeForm} />
              <p className={style.pError}>{errors.name ? errors.name : null}</p>
            </div>
            {/* DESCRIPCION DEL VIDEOGAME */}
            <div className={style.divFormAtribute}>
              <label >Description: </label>
              <textarea className={style.texarea} name="description" cols="30" rows="5" placeholder='ingresa una descripción' value={createGameForm.description} onChange={handleChangeForm}></textarea>
              <p className={style.pError}>{errors.description ? errors.description : null}</p>
            </div>
            {/* GENEROS A SELECCIONAR QUE SE RELACIONARAN DESPUES EN LA BASE DE DATOS */}
            <div className={style.divFormAtribute}>
              <label >Genres: </label>
              <select className={style.selectGender} value="default" name="genres" onChange={handleChangeForm}>
              <option value="default" hidden>escoja generos aqui</option>
              {
                allGenres.map(genre => (<option key={genre.idGenreRawg} value={genre.name}>{genre.name}</option>))
              }
            </select>
            <p className={style.pError}>{errors.genres ? errors.genres : null}</p>
            </div>
            <div className={style.divFormShowGenre}>
              {
                createGameForm.genres?.map((genreTemp, index) => (
                <div key={index} className={style.divFormShowGenreSelected}>
                  <button className={style.buttonCloseGenre} value={genreTemp} onClick={removeGenre}>x</button>
                  <p>{genreTemp}</p>
                </div>))
              }
            </div>
            {/* RATING VIDEOGAME */}
            <div className={style.divFormAtribute}>
              <label >Rating: </label>
              <input className={style.input} type="number" name='rating' value={createGameForm.rating} onChange={handleChangeForm} />
              <p className={style.pError}>{errors.rating ? errors.rating : null}</p>
            </div>
            {/* RELEASED */}
            <div className={style.divFormAtribute}>
              <label >Released: </label>
              <input className={style.input} type="Date" name='released' value={createGameForm.released} onChange={handleChangeForm} />
              <p className={style.pError}>{errors.released ? errors.released : null}</p>
            </div>
          </div>
          {/* DERECHA */}
          <div className={style.formDerecha}>
            <div>
              {/* IMAGE */}
              <div className={style.divFormAtribute}>
                <label >Image: </label>
                <input className={style.input} type="text" placeholder='ingresa URL de la imagen' name='image' value={createGameForm.image} onChange={handleChangeForm} />
                <p className={style.pError}>{errors.image ? errors.image : null}</p>
                <div className={style.divImg}>
                  <img className={style.imgCreateForm} src={createGameForm.image} alt="" />
                </div>
              </div>
            </div>
            {/* PLATAFORMAS A SELECCIONAR */}
            <div className={style.divFormAtribute}>
              <label>Platforms: </label>
              <select className={style.selectGender} value="default" name="platforms" onChange={handleChangeForm}>
              <option value="default" hidden>escoja plataformas aqui</option>
              {
                allPlatforms.map(platform => (<option key={platform.id} value={platform.name}>{platform.name}</option>))
              }
            </select>
            <p className={style.pError}>{errors.platforms ? errors.platforms : null}</p>
            </div>
            <div className={style.divFormShowGenre}>
              {
                createGameForm.platforms?.map((platformTemp, index) => (
                <div key={index} className={style.divFormShowGenreSelected}>
                  <button className={style.buttonCloseGenre} value={platformTemp} onClick={removePlatform}>x</button>
                  <p>{platformTemp}</p>
                </div>))
              }
            </div>
            {/* BOTON DE ENVIAR FORMULARIO */}
            <div>
              <button className={style.button} disabled={!formValid} type='submit'>Crear</button>
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