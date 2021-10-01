import React from 'react';
import './AboutMe.css';
import photo from '../../images/photo.jpg';


function AboutMe(props) {
  return (
    <section className="about-me">
      <h2 className="section__title">Студент</h2>
      <article className="about">
        <div className="about__info">
          <h3 className="about__title">Виталий</h3>
          <p className="about__subtitle">Фронтенд-разработчик, 36 лет</p>
          <p className="about__text">Я родился и живу в Саратове, закончил факультет экономики СГУ. 
          У меня есть жена и дочь. 
          Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. 
          С 2015 года работал в компании «СКБ Контур».
          После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
          <nav className="about__links">
            <a className="about__link section__link" href="https://www.facebook.com/svetlana.urusova.3" target="_blank" rel="noreferrer">Facebook</a>
            <a className="about__link section__link" href="https://github.com/jazzyvesper" target="_blank" rel="noreferrer">Github</a>
          </nav>
        </div>
        <img className="about__image" src={photo} alt="Фотография" />
      </article>
    </section>
  )
}

export default AboutMe;