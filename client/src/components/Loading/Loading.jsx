import React from 'react';
import style from './Loading.module.css';
import imgLoading from '../../assets/3hQC.gif';

const Loading = (props) => {
  return (
    <div className={style.loading}>
      <h1>Loading...</h1>
      <img src={imgLoading} alt="loading" />
      <img src={imgLoading} alt="loading" />
      <img src={imgLoading} alt="loading" />
      <img src={imgLoading} alt="loading" />
      <img src={imgLoading} alt="loading" />
    </div>
  )
}

export default Loading