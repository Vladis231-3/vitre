import { useEffect } from "react";

const works = [
  { cls: "wc1", tag: "Стеклопакет", title: "ЖК «Садовые кварталы»", sub: "Москва · 2024", img: "rabota1.jpg" },
  { cls: "wc2 wide", tag: "Витрина", title: "ТЦ «Галерея»", sub: "Санкт-Петербург", img: "rabota2.jpg" },
  { cls: "wc3 tall", tag: "Панорамное окно", title: "ЖК «River Park»", sub: "Казань", img: "rabota3.jpg" },
  { cls: "wc4", tag: "Фасад", title: "БЦ «Высоцкий»", sub: "Екатеринбург", img: "rabota4.jpg" },
  { cls: "wc5 wide", tag: "Перегородка", title: "Офис IT-компании", sub: "Новосибирск", img: "rabota5.jpg" },
  { cls: "wc6", tag: "Витрина", title: "Ресторан «Белуга»", sub: "Краснодар", img: "rabota6.jpg" },
  { cls: "wc7 tall", tag: "Автостекло", title: "Дилерский центр BMW", sub: "Москва", img: "rabota7.jpg" },
  { cls: "wc8", tag: "Фасад", title: "Апарт-отель", sub: "Сочи", img: "rabota8.jpg" },
  { cls: "wc1 wide", tag: "Стеклопакет", title: "Жилой комплекс", sub: "НСО", img: "rabota9.jpg" },
  { cls: "wc3", tag: "Витрина", title: "ТЦ «Мега»", sub: "Казань", img: "rabota10.jpg" },
  { cls: "wc5", tag: "Панорама", title: "Пентхаус", sub: "Москва-Сити", img: "rabota11.jpg" },
  { cls: "wc2", tag: "Перегородка", title: "Коворкинг", sub: "СПБ", img: "rabota12.jpg" },
  { cls: "wc4 wide", tag: "Процесс полировки", title: "Мастер на объекте", sub: "Москва", video: "strip-video1.mp4" },
  { cls: "wc6 tall", tag: "До и после", title: "Витрина ТЦ", sub: "Санкт-Петербург", video: "strip-video2.mp4" },
  { cls: "wc8", tag: "Работа мастера", title: "Стеклопакет", sub: "Казань", video: "strip-video3.mp4" },
];

function WCard({ w }) {
  return (
    <div className={`wcard ${w.cls}`}>
      {w.video ? (
        <>
          <video className="wcard-video" autoPlay muted loop playsInline>
            <source src={`/videos/${w.video}`} type="video/mp4" />
          </video>
          <div className="wcard-shine"></div>
          <div className="wcard-frame"></div>
        </>
      ) : (
        <div
          className="wcard-bg"
          style={{ backgroundImage: `url(/images/${w.img})`, backgroundSize: "cover", backgroundPosition: "center" }}
        >
          <div className="wcard-shine"></div>
          <div className="wcard-frame"></div>
        </div>
      )}
      <div className="wcard-tag">{w.tag}</div>
      <div className="wcard-ov"></div>
      <div className="wcard-info">
        <div className="wi-title">{w.title}</div>
        <div className="wi-sub">{w.sub}</div>
      </div>
    </div>
  );
}

export default function WorksStrip() {
  useEffect(() => {
    const cards = document.querySelectorAll(".wcard");
    cards.forEach((w) => {
      w.addEventListener("mousemove", (e) => {
        const r = w.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        const bg = w.querySelector(".wcard-bg");
        if (bg) bg.style.transform = `scale(1.06) translate(${x * 12}px, ${y * 8}px)`;
      });
      w.addEventListener("mouseleave", () => {
        const bg = w.querySelector(".wcard-bg");
        if (bg) bg.style.transform = "";
      });
    });
  }, []);

  const makeStrip = (ids, dir) => (
    <div className="strip-row">
      <div className={`strip-track ${dir}`} style={{ "--spd": "24s" }}>
        {ids.map((i) => (
          <WCard key={i} w={works[i]} />
        ))}
        {ids.map((i) => (
          <WCard key={`dup-${i}`} w={works[i]} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="strips-section" id="results">
      <div className="inner-label">— Наши работы —</div>
      {makeStrip([0, 12, 1, 2, 3, 4, 5, 6], "go-l")}
      {makeStrip([7, 8, 13, 9, 10, 11, 0, 2], "go-r")}
      <div style={{ marginTop: 4 }}>{makeStrip([3, 5, 6, 14, 7, 8, 9, 10], "go-l")}</div>
    </div>
  );
}
