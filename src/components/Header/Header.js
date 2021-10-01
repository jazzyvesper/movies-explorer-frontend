import React from 'react';
import { useLocation } from 'react-router-dom';
import './Header.css';
import Navigation from '../Navigation/Navigation';

function Header(props) {
  const location = useLocation();
  const[navClick, setNavclick]= React.useState(false)
  
  function handleClick(){
    console.log(navClick)
    setNavclick(true)
  }

  function handleClickClose(){
    setNavclick(false)
  }

  return (
    <>
    {(location.pathname ==='/' || location.pathname ==='/movies' || location.pathname ==='/saved-movies' || location.pathname ==='/profile' || location.pathname === '/signin' || location.pathname ==='/signup')
    ?
    <>
    <header className={`header ${(location.pathname ==='/') ? ('header__auth') : (location.pathname ==='/signin')||(location.pathname ==='/signup') ? ('header_sign') : ''}`}>
      <Navigation navClick={navClick} openClick={handleClick} closeClick={handleClickClose} loggedIn={props.loggedIn}/>
    </header>   
    </>
    : ''
    } 
    </>
  );
}

export default Header;