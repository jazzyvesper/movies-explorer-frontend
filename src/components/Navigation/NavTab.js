import React from 'react';
import { NavLink  } from 'react-router-dom';

import './NavTab.css';


function NavTab(props) {

  return (
    <div className="nav-tab"> 
      <div className="nav-tab__info">
      <button type="button" onClick={props.onClose} className="header__drop-close section__link" aria-label="Закрыть"></button>  
        <nav className="nav__links">
          <NavLink exact to="/" activeClassName="nav__active-link" className="nav__link">Главная</NavLink>  
          <NavLink to="/movies" activeClassName="nav__active-link" className="nav__link">Фильмы</NavLink> 
          <NavLink to="/saved-movies" activeClassName="nav__active-link" className="nav__link">Сохранённые фильмы</NavLink> 
          <NavLink to="/profile" activeClassName="nav__active-link" className="nav__link nav__link_type_profile">Аккаунт</NavLink>   
        </nav>
      </div>
    </div>
     
  )   
}

export default NavTab;