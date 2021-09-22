import React from 'react';
import './Techs.css';

function Techs(props) {

  return (
    <section className="technology">
      <h2 className="section__title">Технологии</h2>
      <article className="techs">
        <div className="techs__info">
          <h3 className="techs__title">7 технологий</h3>
          <p className="techs__subtitle">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
          <ul className="techs__list">
            <li className="techs__item"><p className="techs__text">HTML</p></li>
            <li className="techs__item"><p className="techs__text">CSS</p></li>
            <li className="techs__item"><p className="techs__text">JS</p></li>
            <li className="techs__item"><p className="techs__text">React</p></li>
            <li className="techs__item"><p className="techs__text">Git</p></li>
            <li className="techs__item"><p className="techs__text">Express.js</p></li>
            <li className="techs__item"><p className="techs__text">mongoDB</p></li>
          </ul>
        </div>
      </article>
    </section>
  )
}

export default Techs;