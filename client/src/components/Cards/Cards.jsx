import React, { useEffect, useState } from "react";
import style from './Cards.module.css'
import { useDispatch, useSelector } from "react-redux";
import { getGenres, isLoadingChange } from "../../redux/action";
import Card from "../Card/Card";
import Loading from "../Loading/Loading";
import SearchBar from "../SearchBar/SearchBar";
import { useNavigate } from "react-router-dom";

const Cards = (props) => {

// Estados locales
// ------------------------------------------------------------------------
const [currentPage, setCurrentPage] = useState(0);
const [buttonPrevDisable, setButtonPrevDisable] = useState(false);
const [buttonNextDisable, setButtonNextDisable] = useState(false);
const [pageNumber, setPageNumber] = useState([]);
const [pages, setPages] = useState([]);
const navigate = useNavigate();

// Funciones locales
// ------------------------------------------------------------------------
const nextPage = () => {
  allVideoGames.length > currentPage + 15 && setCurrentPage( currentPage + 15 );
};

const prevPage = () => {
  currentPage > 0 && setCurrentPage( currentPage - 15 );
};

const pageSelected = (event) => {
  const { value } = event.target;
  // Obtener indice actual
  const pageNumberIndex = parseInt(value) - 1;
  // Validación rango del indice actual para saber que page renderizar en el paginado
  pageNumberIndex >= 0 && pageNumberIndex < pageNumber.length && setCurrentPage(pageNumberIndex * 15);
  // Validación para deshabilitar el boton >> cuando se encuentre en la ultima pagina
  allVideoGames.length <= currentPage + 30 && setButtonNextDisable(true);
}

// Estado y actions Goblales
// ------------------------------------------------------------------------
  const dispatch = useDispatch();
  const { allVideoGames, isLoading, error } = useSelector(state => state);

  const filteredGames = allVideoGames?.slice(currentPage, currentPage + 15);
  //console.log("currenpage", currentPage)
  //console.log("filtrados: ", filteredGames)
  //console.log("todos: ", allVideoGames)

  // Funciones del ciclo de vida del componente
// ------------------------------------------------------------------------
  useEffect(() => {
    if(isLoading) navigate('/home');
    dispatch(getGenres());
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    error === "Failed to fetch" || error === "Network Error" && navigate('/home');
  }, [error]);

  useEffect(() => {
    // Me llevara a la pagina 1 si se presenta algún cambio en el estado
    setCurrentPage(0);
    // Al cargar mi estado global y tenga elementos cancelamos el isLoading
    allVideoGames.length ? dispatch(isLoadingChange(false))
    : navigate('/home');

    const dividir = (allVideoGames, size) => {
      const pages = [];
      const pageNumber = [];
      const length = allVideoGames.length;
      for (let i = 0; i < length; i += size) {
        let page = allVideoGames.slice(i, i + size);
        pages.push(page);
        pageNumber.push(i / size   + 1); //
        //         i =  0 /  15 = 0 + 1 = 1  i = 0  < length = 101
        //         i = 15 /  15 = 1 + 1 = 2  i = 15 < length = 101
        //         i = 30 /  15 = 2 + 1 = 3  i = 30 < length = 101
        //         i = 45 /  15 = 3 + 1 = 4  i = 45 < length = 101
        //         i = 60 /  15 = 4 + 1 = 5  i = 60 < length = 101
        //         i = 75 /  15 = 5 + 1 = 6  i = 75 < length = 101
        //         i = 90 /  15 = 4 + 1 = 7  i = 90 < length = 101
        //        i = 105   i = 105 < length = 101 => false
      }
      setPages(pages);
      setPageNumber(pageNumber);
    }
    dividir(allVideoGames, 15);
  }, [allVideoGames]);

  useEffect(() => {
    window.scrollTo(0, 0);
    currentPage === 0 ? setButtonPrevDisable(true)
    : currentPage >= 15 && setButtonPrevDisable(false);
    ((currentPage/15) + 1) === pageNumber.length ? setButtonNextDisable(true)
    : ((currentPage/15) + 1) < pageNumber.length && setButtonNextDisable(false);
    //console.log(((currentPage/15) + 1), pageNumber.length);
  }, [currentPage, filteredGames]);

  return(
    <div className={style.cards}>
      {isLoading ? (
        <Loading />
        ) : (
          <div>
            <SearchBar />
            <div className={`${style.divCards} ${filteredGames.length < 6 && style.divCardsLenght}`}>
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
            <button className={style.button} onClick={prevPage} disabled={buttonPrevDisable}>{"<<"}</button>
            {
              pageNumber?.map((num, index) => (
                <button  key={index} value={num} onClick={pageSelected}
                className={`${style.buttonPage} ${currentPage === index * 15 && style.currentPageButton}`}
                >{num}</button>
              ))
            }
            <button className={style.button} onClick={nextPage} disabled={buttonNextDisable}>{">>"}</button>
          </div>
      </div>
      )}
    </div>
  )
};

export default Cards;