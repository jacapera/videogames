import React, { useEffect, useState } from 'react';
import style from './Home.module.css';
import Cards from '../Cards/Cards';
import { useDispatch, useSelector } from 'react-redux';
import { getVideoGames, isLoadingChange, isModalOpenChange, messageChange, resetError } from '../../redux/action';
import NotFound from '../NotFound/NotFound';
import { useNavigate } from 'react-router-dom';

const Home = (props) => {

  // Estados locales
  // ----------------------------------------------------------------
  //const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // Estados y acciones globales
  // ----------------------------------------------------------------
  const { error, message, isModalOpen } = useSelector(state => state);
  const dispatch = useDispatch();

  // Funciones locales
  // ----------------------------------------------------------------
  //const openModal = () => { dispatch(isModalOpenChange(true)) };

  const closeModal = () => {
    dispatch(isModalOpenChange(false));
    dispatch(resetError());
    dispatch(messageChange(""));
  };

  //Funciones del ciclo de vida del componente
  //----------------------------------------------------------------
  useEffect(() => {
    dispatch(isLoadingChange(true));
    dispatch(getVideoGames());
    window.scrollTo(0, 0);
  },[]);

  useEffect(() => {
    if(error !== "" && error !== "Failed to fetch" && error !== "Network Error"){ // 
      dispatch(messageChange(error));
      dispatch(isModalOpenChange(true));
      //openModal();
    }

  }, [error]);

  return (
    <div className={style.home}>
      { error === "Failed to fetch" || error === "Network Error" ? (
        <NotFound />
        ) : ( <Cards /> )
      }
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
  )
};

export default Home;

