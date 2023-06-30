import React, { useState } from 'react';
import style from './Card.module.css';
import { Link, useNavigate } from 'react-router-dom';
import icono from '../../assets/editar.png'
import axios from 'axios';

const Card = (props) => {
  //props.platforms.map(item => console.log(item.platform?.name))
  //console.log(props.id)

  // Estados locales
  // ----------------------------------------------------------------
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate  = useNavigate();

  // Funciones locales
  // ----------------------------------------------------------------
  const openModal = (event) => {
    const { value } = event.target;
    setIsModalOpen(true)
    setMessage(`Estas seguro que quieres eliminar el video juego !"${value}"`)
  };
  const closeModal = () => {
    setIsModalOpen(false)
    setMessage("");
  };

  const deleteGame = async (event) => {
    const { value } = event.target;
    await axios.delete(`http://localhost:3005/videogames/${value}`);
    navigate('/cards');
    closeModal();
  };

  return(
    <div className={`${style.card} ${isModalOpen && style.cardHover} `}>
      <div className={style.divName}>
        <Link className={style.link} to={`/detail/${props.id}`}>
          <h3>{props.name}</h3>
        </Link>
        <div className={style.divBtnEliEdi}>
          <Link className={style.link} to={`/update/${props.id}`} >
            {typeof(props.id) === "string" && <img className={style.imgEditar} src={icono} />}
          </Link>
          {typeof(props.id) === "string" && <button className={style.botonCierre} value={props.name} onClick={openModal}>X</button>}
        </div>
      </div>
      <div className={`${style.divImg}`}>
        <img className={`${style.imgCard}`} src={props.image} alt="videogame" />
      </div>
      <div className={style.divRating}>
        <h3>Rating: ⭐{props.rating}</h3>
      </div>
      <h4 className={style.divGenresH4}>Genres</h4>
      <div className={style.divGenres}>
        {
          props.genres?.map(genre => <p className={style.p} key={genre.id}>{genre.name}</p>)
        }
      </div>
      <h4 className={style.divGenresH4}>Platforms</h4>
      <div className={style.divPlatform}>
        {
          props.platforms.map((item, index) =>
            <p className={style.p} key={index}>{item.platform?.name}</p>
          )
        }
      </div>
      {/* Mostrar mensaje en Modal */}
      <div>
          {
            isModalOpen && (
              <div className={style.divModal}>
                  <div className={style.divMessage}>
                      <h1>{message}</h1>
                  <div className={style.divBtnModal}>
                    <button onClick={deleteGame} value={props.id} className={style.button} >Aceptar</button>
                    <button onClick={closeModal} className={style.button} >Cerrar</button>
                  </div>
                  </div>
              </div>
          )}
        </div>
    </div>
  )
};

export default Card;