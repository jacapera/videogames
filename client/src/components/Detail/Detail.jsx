import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import style from './Detail.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Detail = (props) => {

  // Estado y variables locales
  // --------------------------------------------------------------------
  const [videoGame, setVideoGame] = useState({});
  const { id } = useParams();

  //let aux = videoGame.platforms?.map(item => item.platform?.name)
  //console.log(aux)

  const volver = () => {

  };


  // Estados del ciclo de vida del componente
  // ---------------------------------------------------------------------
  useEffect(async () => {
    const {data} = await axios.get(`http://localhost:3005/videogames/${id}`);
    setVideoGame(data);
  }, [id]);


  return (
    <div className={style.detail}>
      <Link to={'/cards'}>
        <button className={style.button}>Volver</button>
      </Link>
      {/* NOMBRE */}
      <h1 className={style.detailName}>{videoGame.name}</h1>
      <hr className={style.hrName}></hr>
      {/* IMAGEN */}
      <div className={style.divDetailImg}>
        <img className={style.detailImg} src={videoGame.image} />
      </div>
      {/* DESCRIPCION */}
      <div className={style.divDetail}>
        <h2 className={style.h2Detail}>Description</h2>
        <hr className={style.hrImg}></hr>
        <p className={style.pDetailDescription}>{videoGame.description}</p>
      </div>
      {/* RELEASED */}
      <div className={style.divReleased}>
        <h2 className={style.h2Detail}>Released</h2>
        <hr className={style.hrImg}></hr>
        <p className={style.pDetailReleased}>{videoGame.released}</p>
      </div>
      {/* PLATFORMS */}
      <div className={style.divDetailPlatforms}>
        <h2 className={style.h2Detail}>Platforms</h2>
        <hr className={style.hrPlatforms}></hr>
        <div className={style.divPlatforms}>
          {
            videoGame.platforms?.map((item, index) => {
              return(
                <p className={style.pDetailPlatforms} key={index}>{item.platform?.name}</p>
              )
            })
          }
        </div>
      </div>
      {/* GENRES */}
      <div className={style.divDetailPlatforms}>
        <h2 className={style.h2Detail}>Genres</h2>
        <hr className={style.hrPlatforms}></hr>
        <div className={style.divPlatforms}>
          {
            videoGame.genres?.map((item, index) => {
              return(
                <p className={style.pDetailPlatforms} key={index}>{item.name}</p>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Detail