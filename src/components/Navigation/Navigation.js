import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import logo from '../../images/logo.svg';
import './Navigation.css';
import NavTab from './NavTab';

function Navigation(props) {
  
  const location = useLocation();
  
  return (
 <div className={`header__navigation ${(location.pathname ==='/signin')||(location.pathname ==='/signup') ? ('header__navigation_sign') : ''}`}>
      <Link className={`section__link ${(!props.loggedIn && location.pathname !=='/') ? ('header__link_type_sign'):''}`}  to="/">
        <img className="header__logo" alt="Логотип" src={logo} /> 
      </Link>

    {props.loggedIn && !props.navClick 
    ? 
    <nav className="header__menu_burger section__link">
      <div onClick={props.openClick} className={`header__drop-down ${(location.pathname ==='/') ? ('header__drop-down_theme_dark') :''}`}></div>
    </nav>   
    : props.navClick 
    ? <NavTab onClose={props.closeClick}/> 
    : ''
    }
    {location.pathname ==='/' && !props.loggedIn
    ? 
    <nav className="header__menu header__menu_theme_dark">
      <div className="header__menu-auth">
        <Link to="/signup"  className="header__link header__link-auth section__link">Регистрация</Link>
         <Link to="/signin"  className="header__link header__link-auth header__active-link-auth section__link">Войти</Link>
      </div>
    </nav>
    : props.loggedIn ?
    <nav className="header__menu">
    <div className="header__links">
      <NavLink to="/movies" activeClassName="header__active-link " className=" header__link section__link">Фильмы</NavLink>  
      <NavLink to="/saved-movies" activeClassName="header__active-link" className="header__link section__link">Сохранённые фильмы</NavLink> 
    </div>
    <div className="header__lk">
      <NavLink to="/profile" activeClassName="header__active-link" className="header__link header__link_type_profile section__link">Аккаунт</NavLink>   
    </div>
     </nav>
     : ''
    }
 </div>
)  
}

export default Navigation;