import React, { useEffect } from 'react';
import style from './Home.module.css';
import Cards from '../Cards/Cards';
import SearchBar from '../SearchBar/SearchBar';
import { useDispatch } from 'react-redux';
import { isLoadingChange } from '../../redux/action';

const Home = (props) => {

  return (
    <div className={style.home}>
      <SearchBar />
      <Cards />
    </div>
  )
};

export default Home;

