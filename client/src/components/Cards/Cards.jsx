import React, { useEffect, useState } from "react";
import style from './Cards.module.css'
import { useDispatch, useSelector } from "react-redux";
import { getGenres, getVideoGames } from "../../redux/action";
import Card from "../Card/Card";

const Cards = (props) => {

// Estados locales
// ------------------------------------------------------------------------
const [currentPage, setCurrentPage] = useState(0);

// Funciones locales
// ------------------------------------------------------------------------
const nextPage = () => {
  setCurrentPage( currentPage + 15 );
};
const prevPage = () => {
  currentPage > 0 && setCurrentPage( currentPage - 15 );
};

// Estado y actions Goblales
// ------------------------------------------------------------------------
  const dispatch = useDispatch();
  const { allVideoGames } = useSelector(state => state);
  const filteredGames = allVideoGames.slice(currentPage, currentPage + 15);
  console.log(filteredGames)


  // Funciones del ciclo de vida del componente
// ------------------------------------------------------------------------
  useEffect(() => {
    dispatch(getVideoGames());
    dispatch(getGenres());
  }, [])

  return(
    <div className={style.cards}>
      <div className={style.divCards}>
        {
          filteredGames.map(game => <Card
              key={game.id}
              id={game.id}
              name={game.name}
              image={game.image}
              rating={game.rating}
              genres={game.genres}
              platforms={game.platforms}
          />)
        }
      </div>
      <div className={style.divButton}>
        <button className={style.button} onClick={prevPage}>Anterior</button>
        <button className={style.button} onClick={nextPage}>Siguiente</button>
      </div>
    </div>
  )
};

export default Cards;