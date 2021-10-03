import React from 'react';
import './Portfolio.css';
import arrow from '../../images/arrow.svg';

function Portfolio(props) {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a className="portfolio__subtitle section__link" href="https://github.com/jazzyvesper/how-to-learn" target="_blank" rel="noreferrer">
            Статичный сайт
            <img className="portfolio__icon section__link" src={arrow} alt="иконка" />
          </a>
        </li>
        <li className="portfolio__item">
          <a className="portfolio__subtitle section__link" href="https://jazzyvesper.github.io/russian-travel/" target="_blank" rel="noreferrer">
            Адаптивный сайт
            <img className="portfolio__icon section__link" src={arrow} alt="иконка" />
          </a>
        </li>
        <li className="portfolio__item">
          <a className="portfolio__subtitle section__link" href="https://jazzyvesper.nomoredomains.monster/my-profile" target="_blank" rel="noreferrer">
            Одностраничное приложение
            <img className="portfolio__icon section__link" src={arrow} alt="иконка" />
          </a>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio;