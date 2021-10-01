import React from 'react';
import './NotFound.css';
import { useHistory } from 'react-router-dom'


function NotFound(props) {
  const history = useHistory(); 
  return (
      <div className="error__page">
      <h2 className="error__title">404</h2>
      <p className="error__text">Страница не найдена</p>
      <button className="error__link section__link" onClick={() => history.goBack()}>Назад</button>
      </div>
  ) 
}

export default NotFound;