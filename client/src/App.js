import React from 'react';
import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import Cards from './components/Cards/Cards';
function App() {

  const location = useLocation();
  return (
    <div className="App">
      {
        location.pathname === '/' ? <LandingPage /> : <NavBar />
      }
      <Routes>
        <Route path={'/home'} element={<Home />}/>
        <Route path={'/cards'} element={<Cards />}/>
      </Routes>
    </div>
  );
}

export default App;
