import React from 'react';
import './Footer.css';

function Footer(props) {
  return (
    <section className={`footer ${!props.loggedIn ? ('footer__none') : ''}`}>
      <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className="footer__info">
        <p className="footer__copyright">&copy;2020</p>
        <nav className="footer__nav">
          <a className="footer__link section__link" href="https://practicum.yandex.ru" target="_blank" rel="noreferrer">Яндекс.Практикум</a> 
          <a className="footer__link section__link" href="https://github.com/jazzyvesper" target="_blank" rel="noreferrer">Github</a> 
          <a className="footer__link section__link" href="https://www.facebook.com/svetlana.urusova.3" target="_blank" rel="noreferrer">Facebook</a> 
        </nav>
      </div>
    </section>
  )
}

export default Footer;