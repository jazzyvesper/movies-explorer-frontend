import React from 'react';
import './Portfolio.css';
import arrow from '../../images/arrow.svg';

function Portfolio(props) {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <h3 className="portfolio__subtitle">Статичный сайт</h3>
          <img className="portfolio__icon" src={arrow} alt="иконка" />
        </li>
        <li className="portfolio__item">
          <h3 className="portfolio__subtitle">Адаптивный сайт</h3>
          <img className="portfolio__icon" src={arrow} alt="иконка" />
        </li>
        <li className="portfolio__item">
          <h3 className="portfolio__subtitle">Одностраничное приложение</h3>
          <img className="portfolio__icon" src={arrow} alt="иконка" />
        </li>
      </ul>
    </section>
  )
}

export default Portfolio;