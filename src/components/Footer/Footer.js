import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer(props) {
  return (
    <section className="footer">
      <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className="footer__info">
        <p className="footer__copyright">&copy;2020</p>
        <nav className="footer__nav">
         <Link className="footer__link">Яндекс.Практикум</Link> 
          <Link className="footer__link">Github</Link> 
          <Link className="footer__link">Facebook</Link> 
        </nav>
      </div>
    </section>
  )
}

export default Footer;