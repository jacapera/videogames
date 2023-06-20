import React, { useEffect } from 'react';
import style from './Card.module.css';

const Card = (props) => {

  return(
    <div className={style.card}>
      <div className={style.divName}>
        <h3>{props.name}</h3>
      </div>
      <div className={style.divImg}>
        <img className={style.imgCard} src={props.image} alt="videogame" />
      </div>
      <div className={style.divGenres}>
        {
          props.genres.map(genre => <p key={genre.id}>{genre.name}</p>)
        }
      </div>
    </div>
  )
};

export default Card;