import React, { useEffect } from 'react';
import style from './Home.module.css';
import Cards from '../Cards/Cards';
import SearchBar from '../SearchBar/SearchBar';
import { useDispatch } from 'react-redux';
import { getVideoGames, isLoadingChange } from '../../redux/action';

const Home = (props) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isLoadingChange(true));
    dispatch(getVideoGames());
  },[])

  return (
    <div className={style.home}>
      {/* <SearchBar /> */}
      <Cards />
    </div>
  )
};

export default Home;

