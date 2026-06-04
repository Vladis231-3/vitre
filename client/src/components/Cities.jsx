import { useState, useEffect, useCallback } from "react";

const cities = [
  {
    slug: "msk", name: "Москва", title: "Москва и <em>область</em>",
    desc: "Работаем по всей Москве и МО. Выезд в день обращения.",
    feats: ["Выезд от 1 часа с момента заявки", "Бесплатная диагностика на объекте", "Работаем с ЖК, ТЦ, БЦ", "Гарантия 12 месяцев письменно"],
    photos: ["polirovka1.jpg", "polirovka2.jpg", "polirovka3.jpg", "polirovka4.jpg"],
  },
  {
    slug: "spb", name: "Санкт-Петербург", title: "Санкт-Петербург<br>и <em>ЛО</em>",
    desc: "Полировка в Петербурге и ЛО. Витрины элитных объектов и отелей.",
    feats: ["Выезд в день обращения", "Работа на высоте", "Рестораны и отели", "Гарантия 12 месяцев"],
    photos: ["polirovka5.jpg", "polirovka6.jpg", "polirovka7.jpg", "polirovka8.jpg"],
  },
  {
    slug: "kzn", name: "Казань", title: "Казань<br>и <em>Татарстан</em>",
    desc: "Активно работаем с застройщиками — поточная полировка новостроек.",
    feats: ["Договоры с застройщиками", "Поточная полировка новостроек", "ТЦ «Мега», «Ривьера»", "Гарантия 12 месяцев"],
    photos: ["polirovka9.jpg", "polirovka10.jpg", "polirovka11.jpg", "polirovka12.jpg"],
  },
  {
    slug: "ekb", name: "Екатеринбург", title: "Екатеринбург<br>и <em>область</em>",
    desc: "Работаем в ЕКБ и Свердловской области. БЦ, гостиницы, торговые сети.",
    feats: ["Партнёрство с УК", "Высота до 80м", "«Гипербола», «Мегаполис»", "Гарантия 12 месяцев"],
    photos: ["polirovka13.jpg", "polirovka14.jpg", "polirovka15.jpg", "polirovka16.jpg"],
  },
  {
    slug: "nsk", name: "Новосибирск", title: "Новосибирск<br>и <em>НСО</em>",
    desc: "Крупнейший офис в Сибири. Выезжаем в Барнаул, Томск, Кемерово.",
    feats: ["Крупнейший офис в Сибири", "Барнаул, Томск, Кемерово", "Субподряд строителям", "Гарантия 12 месяцев"],
    photos: ["polirovka17.jpg", "polirovka18.jpg", "polirovka19.jpg", "polirovka20.jpg"],
  },
  {
    slug: "krd", name: "Краснодар", title: "Краснодар<br>и <em>край</em>",
    desc: "Выезжаем в Сочи, Анапу, Геленджик. Сезонное обслуживание отелей.",
    feats: ["Сочи, Анапа, Геленджик", "Сезонное обслуживание отелей", "Постгарантийное обслуживание", "Гарантия 12 месяцев"],
    photos: ["polirovka21.jpg", "polirovka22.jpg", "polirovka23.jpg", "polirovka24.jpg"],
  },
];

function Slideshow({ photos }) {
  const [cur, setCur] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCur((p) => (p + 1) % photos.length), 3200);
    return () => clearInterval(timer);
  }, [photos.length]);

  return (
    <div className="ci-slideshow">
      <div className="csl-track" style={{ transform: `translateX(-${cur * 100}%)` }}>
        {photos.map((p, i) => (
          <div key={i} className="csl-slide" style={{ backgroundImage: `url(/images/${p})` }}></div>
        ))}
      </div>
      <div className="csl-dots">
        {photos.map((_, i) => (
          <div key={i} className={`csl-dot ${i === cur ? "on" : ""}`} onClick={() => setCur(i)}></div>
        ))}
      </div>
    </div>
  );
}

export default function Cities() {
  const [active, setActive] = useState("msk");

  return (
    <section id="cities">
      <div className="s-lbl rv">География работ</div>
      <h2 className="s-h rv d1">Выезд по<br /><em>всей</em> России</h2>
      <div className="rv d2">
        <div className="city-tabs">
          {cities.map((c) => (
            <button key={c.slug} className={`ct ${active === c.slug ? "on" : ""}`} onClick={() => setActive(c.slug)}>
              {c.name}
            </button>
          ))}
        </div>
        {cities.map((c) => (
          <div key={c.slug} className={`city-panel ${active === c.slug ? "on" : ""}`}>
            <div className="ci-info-col">
              <h3 className="ci-h3" dangerouslySetInnerHTML={{ __html: c.title }} />
              <p className="ci-p">{c.desc}</p>
              <div className="ci-feats">
                {c.feats.map((f, i) => (
                  <div className="ci-feat" key={i}>
                    <div className="fchk">✓</div>
                    {f}
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 28, display: "flex", gap: 10, flexWrap: "wrap" }}>
                <a href="#cta" className="btn-p">Вызвать мастера →</a>
                <a href="#cta" className="btn-p teal">Получить оценку</a>
              </div>
            </div>
            <Slideshow photos={c.photos} />
          </div>
        ))}
      </div>
    </section>
  );
}
