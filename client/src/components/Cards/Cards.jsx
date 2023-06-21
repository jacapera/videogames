import React, { useEffect } from "react";
import style from './Cards.module.css'
import { useDispatch, useSelector } from "react-redux";
import { getGenres, getVideoGames } from "../../redux/action";
import Card from "../Card/Card";

const Cards = (props) => {
  
  const dispatch = useDispatch();
  const { allVideoGames, allGenres } = useSelector(state => state);

  useEffect(() => {
    dispatch(getVideoGames());
    dispatch(getGenres());
  }, [])
  

  return(
    <div className={style.cards}>
      {
        allVideoGames.map(game => <Card
            key={game.id}
            id={game.id}
            name={game.name}
            image={game.image}
            rating={game.rating}
            genres={game.genres}
        />)
      }
    </div>
  )
};

export default Cards;