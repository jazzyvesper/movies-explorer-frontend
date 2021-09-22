import React from 'react';
import './AboutProject.css'

function AboutProject(props) {
  return (
    <section className="about-project">
      <h2 className="section__title">О проекте</h2>
        <ul className="about-project__info">
          <li className="about-project__intro">
            <h3 className="about-project__subtitle">Дипломный проект включал 5 этапов</h3>
            <p className="about-project__subtitle-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          </li>
          <li className="about-project__intro">
            <h3 className="about-project__subtitle">На выполнение диплома ушло 5 недель</h3>
            <p className="about-project__subtitle-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </li>
          <li className="about-project__time">
           <p className="about-project__text about-project__text_green">1 неделя</p>
           <h3 className="about-project__text about-project__text_color">Back-end</h3>
         </li>
          <li className="about-project__time-two">
            <p className="about-project__text about-project__text_grey">4 недели</p>
            <h3 className="about-project__text about-project__text_color">Front-end</h3>
         </li> 
        </ul>
    </section>
  )
}

export default AboutProject;