import React, { useEffect, useState } from 'react';
import style from './Form.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres, getPlatforms, isLoadingChange, messageChange, postVideoGame } from '../../redux/action';
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
  //const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const navigate = useNavigate();

  // Estados y acciones globales
  // ----------------------------------------------------------------
  const { allGenres, allPlatforms, message, error } = useSelector(state => state);
  const dispatch = useDispatch();

  // Funciones locales
  // ----------------------------------------------------------------
  const handleChangeForm = async (event) => {
    const { value, name } = event.target;
    // Validación para Rating
    if(value < 0 || value > 5 ){
      event.preventDefault();
      dispatch(messageChange(`El rating min es 0 y el max es 5`));
      openModal();
      return;
    }

    // Validaciones para Generos
    if(name === "genres"){
      const aux = createGameForm.genres.includes(value);
      if(aux){
        dispatch(messageChange(`El genero ${value} ya fue agregado`));
        openModal();
        return;
      }
      if(createGameForm.genres.length > 5){
        dispatch(messageChange(`Solo puedes agregar hasta 6 generos`));
        openModal();
        return;
      }
      setCreateGameForm({...createGameForm, genres:[...createGameForm.genres, value]});
      return;
    }

    // Validación para Plataformas
    if(name === 'platforms'){
      const aux = createGameForm.platforms.includes(value);
      if(aux){
        dispatch(messageChange(`La plataforma ${value} ya fue agregada`));
        openModal();
        return;
      }
      if(createGameForm.platforms.length > 5){
        dispatch(messageChange(`Solo puedes agregar hasta 6 plataformas`));
        openModal();
        return;
      }
      setCreateGameForm({...createGameForm, platforms:[...createGameForm.platforms, value]});
      return;
    }

    setCreateGameForm(prevValues => ({
      ...prevValues,
      [name]: value
    }));
  };

  const handleRemove = (event) => {
    const{name, value} = event.target;
    event.preventDefault();
    setCreateGameForm(prevValues => {
      const updatedValues = {...prevValues};
      if(updatedValues[name]){
        updatedValues[name] = updatedValues[name].filter(item => item !== value);
      }
      return updatedValues;
    });
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setTouchedFields(prevTouchedFields => ({
      ...prevTouchedFields,
      [name]: true,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    (error === "Network Error" || error === "Failed to featch") && navigate('/home')
    let auxErrors = Object.values(formErrors).every(value => value === "");
    if(auxErrors) {
      dispatch(postVideoGame(createGameForm))
      setCreateGameForm({
        name:"",
        description:"",
        genres:[],
        platforms:[],
        rating:0,
        image:"",
        released:"",
      })
      setFormErrors({});
      openModal();
    }
  };

  const openModal = () => { setIsModalOpen(true) };

  const closeModal = () => {
    setIsModalOpen(false)
    if(message === "Video juego creado con !exito"){
      navigate('/home');
    }
    dispatch(messageChange(""));
  };

  const volver = () => {
    dispatch(isLoadingChange(false));
    navigate('/cards')
  };

  // Funciones Ciclo de vida del Componente
  // ---------------------------------------------------
  useEffect(() => {
    dispatch(getGenres());
    dispatch(getPlatforms());
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [message]);

  useEffect(() => {
    //console.log("Form: " , createGameForm);
    const errors = validation(createGameForm);
    //console.log("TOUCH: ", touchedFields)

    if(Object.keys(touchedFields).length  > 0){
      setFormErrors({
        "name": errors.name || "",
        "description": errors.description || "",
        "image": errors.image || "",
        "rating": errors.rating || "",
        "released": errors.released || "",
        "genres": errors.genres || "",
        "platforms": errors.platforms || "",
      });
    }
    //console.log("FORMERROR: " , formErrors);
    if(Object.keys(errors).length === 0) setFormValid(true);
    else setFormValid(false);
  }, [createGameForm, touchedFields]);

  return(
    <div className={style.form}>
      <div className={style.divForm}>
        {/* TITULO */}
        <h2>Create Videogame</h2>
        <hr />
        <form onSubmit={handleSubmit} className={style.formCreateGame}>
          {/* IZQUIERDA */}
          <div className={style.formIzquierda} >
            {/* NOMBRE DEL VIDEOGAME */}
            <div className={style.divFormAtribute}>
              <label >Name: </label>
              <input
                className={style.input}
                type="text"
                placeholder='ingresa un nombre'
                name='name'
                value={createGameForm.name}
                onChange={handleChangeForm}
                onBlur={handleBlur}
              />
              { touchedFields.name && formErrors.name && <p className={style.pError}>{formErrors.name}</p>}
            </div>
            {/* DESCRIPCION DEL VIDEOGAME */}
            <div className={style.divFormAtribute}>
              <label >Description: </label>
              <textarea
                className={style.texarea}
                name="description"
                cols="30" rows="5"
                placeholder='ingresa una descripción'
                value={createGameForm.description}
                onChange={handleChangeForm}
                onBlur={handleBlur}
              ></textarea>
              { touchedFields.description && formErrors.description && <p className={style.pError}>{formErrors.description}</p>}
            </div>
            {/* GENEROS A SELECCIONAR QUE SE RELACIONARAN DESPUES EN LA BASE DE DATOS */}
            <div className={style.divFormAtribute}>
              <label >Genres: </label>
              <select className={style.selectGender} value="default" name="genres" onChange={handleChangeForm} onBlur={handleBlur}>
              <option value="default" hidden>escoja generos aqui</option>
              {
                allGenres.map(genre => (<option key={genre.idGenreRawg} value={genre.name}>{genre.name}</option>))
              }
            </select>
            { touchedFields.genres && formErrors.genres && <p className={style.pError}>{formErrors.genres}</p>}
            </div>
            <div className={style.divFormShowGenre}>
              {
                createGameForm.genres?.map((genreTemp, index) => (
                <div key={index} className={style.divFormShowGenreSelected}>
                  <button className={style.buttonCloseGenre} name='genres' value={genreTemp} onClick={handleRemove}>x</button>
                  <p>{genreTemp}</p>
                </div>))
              }
            </div>
            {/* RATING VIDEOGAME */}
            <div className={style.divFormAtribute}>
              <label >Rating: </label>
              <input
                className={style.input}
                type="number"
                name='rating'
                value={createGameForm.rating}
                onChange={handleChangeForm}
                onBlur={handleBlur}
              />
              { touchedFields.rating && formErrors.rating && <p className={style.pError}>{formErrors.rating}</p>}
            </div>
            {/* RELEASED */}
            <div className={style.divFormAtribute}>
              <label >Released: </label>
              <input
                className={style.input}
                type="Date"
                name='released'
                value={createGameForm.released}
                onChange={handleChangeForm}
                onBlur={handleBlur}
              />
              { touchedFields.released && formErrors.released && <p className={style.pError}>{formErrors.released}</p>}
            </div>
          </div>
          {/* DERECHA */}
          <div className={style.formDerecha}>
            <div>
              {/* IMAGE */}
              <div className={style.divFormAtribute}>
                <label >Image: </label>
                <input
                  className={style.input}
                  type="text"
                  placeholder='ingresa URL de la imagen'
                  name='image'
                  value={createGameForm.image}
                  onChange={handleChangeForm}
                  onBlur={handleBlur}
                />
                { touchedFields.image && formErrors.image && <p className={style.pError}>{formErrors.image}</p>}
                <div className={style.divImg}>
                  <img className={style.imgCreateForm} src={createGameForm.image} alt="" />
                </div>
              </div>
            </div>
            {/* PLATAFORMAS A SELECCIONAR */}
            <div className={style.divFormAtribute}>
              <label>Platforms: </label>
              <select className={style.selectGender} value="default" name="platforms" onChange={handleChangeForm} onBlur={handleBlur}>
              <option value="default" hidden>escoja plataformas aqui</option>
              {
                allPlatforms.map(platform => (<option key={platform.id} name='platforms' value={platform.name}>{platform.name}</option>))
              }
            </select>
            { touchedFields.platforms && formErrors.platforms && <p className={style.pError}>{formErrors.platforms}</p>}
            </div>
            <div className={style.divFormShowGenre}>
              {
                createGameForm.platforms?.map((platformTemp, index) => (
                <div key={index} className={style.divFormShowGenreSelected}>
                  <button className={style.buttonCloseGenre} name="platforms" value={platformTemp} onClick={handleRemove}>x</button>
                  <p>{platformTemp}</p>
                </div>))
              }
            </div>
            {/* BOTON DE ENVIAR FORMULARIO */}
            <div className={style.divBtn}>
              <button className={style.button} disabled={!formValid} type='submit'>Crear</button>
              <button className={style.button} onClick={volver}  >Cerrar</button>
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