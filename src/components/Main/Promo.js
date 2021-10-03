import React from 'react';
import './Promo.css';
import promo from '../../images/promo.svg'
import AnchorLink from 'react-anchor-link-smooth-scroll';
function Promo(props) {
  return (
    <section className="promo">
      <article className="promo__banner">
        <div className="promo__info">
          <h1 className="promo__title">Учебный проект студента факультета Веб&#8209;разработки.</h1>
          <p className="promo__text">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
          <AnchorLink href="#about-project" className="promo__link section__link">Узнать больше</AnchorLink>
         </div>
        <img className="promo__image" src={promo} alt="Логотип страницы"/>
      </article>
    </section>
  );
}

export default Promo;