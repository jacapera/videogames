import React from 'react';
import style from './Card.module.css';
import { Link } from 'react-router-dom';

const Card = (props) => {
  //props.platforms.map(item => console.log(item.platform?.name))

  return(
    <div className={style.card}>
      <div className={style.divName}>
        <Link className={style.link} to={`/detail/${props.id}`}>
          <h3>{props.name}</h3>
        </Link>
      </div>
      <div className={style.divImg}>
        <img className={style.imgCard} src={props.image} alt="videogame" />
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
    </div>
  )
};

export default Card;