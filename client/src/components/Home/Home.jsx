import React from 'react';
import style from './Home.module.css';
import Cards from '../Cards/Cards';
import SearchBar from '../SearchBar/SearchBar';

const Home = (props) => {

  return (
    <div className={style.home}>
      <SearchBar />
      <Cards />
    </div>
  )
};

export default Home;

