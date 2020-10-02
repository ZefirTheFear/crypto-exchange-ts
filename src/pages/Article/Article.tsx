import React from "react";

import { Link } from "react-router-dom";

import "./Article.scss";

const Article: React.FC = () => {
  return (
    <article className="article">
      <div className="article__inner">
        <h1>Обмен Криптовалют. Обмен Биткоин.</h1>
        <p>
          Мы являемся официальным лицензированным обменным пунктом. У нас Вы можете обменять,
          купить, продать биткоин и другую криптовалюту по адресу: г. Киев, проспект Оболонский
          14-Б. Так же мы занимаемся обменом наличных валют: доллар США (USD), евро (EUR),
          российский рубль (RUB), британский фунт стерлингов (GBP), швейцарский франк (CHF),
          канадский доллар (CAD), польский злотый (PLN), китайский юань (CYN).
        </p>
        <h2>Купить Bitcoin</h2>
        <p>
          В нашем обменнике криптовалют всегда имеются достаточные резервы чтобы Вы могли
          беспрепятственно обменять или купить биткоин без комиссии, с минимальной комиссией, с
          доплатой, а также обменять наличные на криптовалюту 1к (один к одному). В случаях, когда у
          вас несколько валют, Вы можете купить биткоин за доллары, гривну, евро, рубли или купить
          криптовалюту за Приват.
        </p>
        <h3>Продать Bitcoin</h3>
        <p>
          Аналогично есть возможность совершить обратную операцию: обменять или продать биткоин за
          наличные без комиссии, с минимальной комиссией и с доплатой, а также продать криптовалюту
          за наличные. Для максимального удобства рассчеты могут проводиться в любой валюте. Можно
          продать или совершить обмен биткоин на доллары, гривну, евро, рубли, а так же обменять
          криптовалюту на Приват24.
        </p>
        <Link to="/" className="article__home-btn">
          на главную
        </Link>
      </div>
    </article>
  );
};

export default Article;