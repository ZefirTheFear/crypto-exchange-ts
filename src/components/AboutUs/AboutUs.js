import React from "react";

import securityImg from "../../assets/img/security-first.svg";
import bestPriceImg from "../../assets/img/best-prices.svg";
import longTermImg from "../../assets/img/long-term.svg";
import "./AboutUs.scss";

const AboutUs = () => {
  const data = [
    {
      title: `Безопасность 
как приоритет`,
      img: securityImg,
      desc:
        "Безопасность - наш главный принцип. Поэтому все сделки проводятся в нашем офисе при личной встрече, обеспечивая безоговорочную гарантию проведения удачной операции"
    },
    {
      title: `Точность 
как инструмент`,
      img: bestPriceImg,
      desc:
        "Мы используем только последние данные наиболее авторитетной биржи в мире криптотрейдинга, что позволяет быть всегда уверенными в наших котировках"
    },
    {
      title: `Опыт 
как средство`,
      img: longTermImg,
      desc:
        "Долгосрочноe пребывание на рынке дает нам возможность использовать наши знания, чтобы предложить лучшие варианты для наших клиентов"
    }
  ];

  return (
    <section className="about-us">
      <div className="about-us__inner">
        {data.map(item => {
          return (
            <div key={item.title} className="about-us__unit">
              <pre>
                <h4 className="about-us__unit-title">{item.title}</h4>
              </pre>
              <img src={item.img} alt={item.title} className="about-us__unit-img" />
              <p className="about-us__unit-desc">{item.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AboutUs;
