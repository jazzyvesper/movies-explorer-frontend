import React from 'react';
import { Link, NavLink, useLocation, useRouteMatch  } from 'react-router-dom';

import logo from '../../images/logo.svg';
import './Header.css';
import Movies from "../Movies/Movies";

function Header(props) {
  const location = useLocation();
  const { path, url } = useRouteMatch();
  return (
    <header className={`header ${(!props.loggedIn && location.pathname ==='/') ? ('header__auth') : ''}`}>     
    {props.loggedIn ?
      <nav className="header__menu">
        <Link to="/">
          <img className="header__logo" alt="Логотип" src={logo} /> 
        </Link>
        <div className="header__links">
          <NavLink to="/movies" activeClassName="header__active-link" className=" header__link">Фильмы</NavLink>  
          <NavLink to="/saved-movies" activeClassName="header__active-link" className="header__link">Сохранённые фильмы</NavLink> 
        </div>
        <div className="header__lk">
          <NavLink to="/profile" activeClassName="header__active-link" className="header__link header__link_type_profile">Аккаунт</NavLink>   
        </div>
    </nav> 
    : (!props.loggedIn && (location.pathname ==='/signup' || location.pathname ==='/signin') ) ?
      <Link className="header__link_type_sign" to="/">
        <img className="header__logo" alt="Логотип" src={logo} /> 
      </Link>
    : <nav className="header__menu">
        <Link to="/">
          <img className="header__logo" alt="Логотип" src={logo} /> 
        </Link>
        <div className="header__menu-auth">
        <NavLink to="/signup" activeClassName="header__active-link-auth" className="header__link header__link-auth">Регистрация</NavLink>
        <NavLink to="/signin" activeClassName="header__active-link-auth" className="header__link header__link-auth">Войти</NavLink>
        </div>
          </nav>}
        
    </header>    
  );

}

export default Header;