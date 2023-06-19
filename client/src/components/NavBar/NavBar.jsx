import React from 'react';
import style from './NavBar.module.css'
import SearchBar from '../SearchBar/SearchBar';

const NavBar = (props) => {


  return(
    <div className={style.navBar}>
      <h1>NAVBAR</h1>
      <SearchBar />
    </div>
  )
};

export default NavBar;