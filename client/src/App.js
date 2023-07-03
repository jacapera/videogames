import React from 'react';
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import Cards from './components/Cards/Cards';
import Form from './components/Form/Form';
import SearchBar from './components/SearchBar/SearchBar';
import Detail from './components/Detail/Detail';
import Update from './components/Update/Update.jsx';
import NotFound from './components/NotFound/NotFound';
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
        <Route path={'/search'} element={<SearchBar />} />
        <Route path='/createVideoGame' element={<Form />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path='/update/:id' element={<Update />} />
        <Route path='/notfound' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
