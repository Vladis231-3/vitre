import { useEffect } from "react";

const baData = [
  { title: "Стеклопакет после ремонта", sub: "Москва — ЖК «Садовые кварталы»", do: "do1.jpg", posle: "posle1.jpg" },
  { title: "Витрина торгового центра", sub: "СПБ — ТЦ «Галерея»", do: "do2.jpg", posle: "posle2.jpg" },
  { title: "Панорамное окно", sub: "Казань — ЖК «River Park»", do: "do3.jpg", posle: "posle3.jpg" },
  { title: "Офисная перегородка", sub: "ЕКБ — БЦ «Высоцкий»", do: "do4.jpg", posle: "posle4.jpg" },
  { title: "Витрина ресторана", sub: "Краснодар", do: "do5.jpg", posle: "posle5.jpg" },
  { title: "Фасадное стекло", sub: "Сочи", do: "do6.jpg", posle: "posle6.jpg" },
  { title: "Ветровое стекло BMW", sub: "Москва", do: "do7.jpg", posle: "posle7.jpg" },
  { title: "Витрина бутика", sub: "Москва-Сити", do: "do8.jpg", posle: "posle8.jpg" },
];

function BACard({ d }) {
  const doBase = d.do.replace(/\.\w+$/, "");
  const posleBase = d.posle.replace(/\.\w+$/, "");
  return (
    <div className="bacard">
      <div className="ba-before-layer">
        <picture>
          <source srcSet={`/images/${doBase}.avif`} type="image/avif" />
          <img src={`/images/${d.do}`} alt={d.title} loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </picture>
        <div className="ba-scr bas1"></div>
        <div className="ba-scr bas2"></div>
      </div>
      <div className="ba-after-layer">
        <picture>
          <source srcSet={`/images/${posleBase}.avif`} type="image/avif" />
          <img src={`/images/${d.posle}`} alt={d.title + " после"} loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </picture>
      </div>
      <div className="ba-line"><div className="ba-line-ico">⇄</div></div>
      <div className="ba-lbls2"><span className="ba-lbl2 bl-b">До</span><span className="ba-lbl2 bl-a">После</span></div>
      <div className="ba-idle-hint"><div className="ba-idle-pill">← двигай мышью →</div></div>
      <div className="ba-inf2"><h4>{d.title}</h4><span>{d.sub}</span></div>
    </div>
  );
}

export default function BeforeAfter() {
  useEffect(() => {
    const isMobile = window.matchMedia("(max-width:768px)").matches;
    document.querySelectorAll(".bacard").forEach((card) => {
      const afterLayer = card.querySelector(".ba-after-layer");
      const line = card.querySelector(".ba-line");

      if (isMobile) {
        card.classList.add("active");
        let pct = 0, dir = 1, rafId;
        const animate = () => {
          pct += dir * 0.4;
          if (pct >= 96) dir = -1;
          if (pct <= 4) dir = 1;
          afterLayer.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
          line.style.left = pct + "%";
          rafId = requestAnimationFrame(animate);
        };
        const delay = Math.random() * 2000;
        setTimeout(() => requestAnimationFrame(animate), delay);
        const obs = new IntersectionObserver((entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) rafId = requestAnimationFrame(animate);
            else cancelAnimationFrame(rafId);
          });
        }, { threshold: 0.2 });
        obs.observe(card);
      } else {
        card.addEventListener("mouseenter", () => card.classList.add("active"));
        card.addEventListener("mouseleave", () => {
          card.classList.remove("active");
          afterLayer.style.clipPath = "inset(0 50% 0 0)";
          line.style.left = "50%";
        });
        card.addEventListener("mousemove", (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
          afterLayer.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
          line.style.left = pct + "%";
        });
      }
    });
  }, []);

  return (
    <div className="ba-strips" id="results">
      <div className="ba-strips-label rv">
        <div className="s-lbl" style={{ justifyContent: "center" }}>
          <span style={{ width: 24, height: 1, background: "var(--teal)", display: "inline-block" }}></span>&nbsp;Результаты&nbsp;
          <span style={{ width: 24, height: 1, background: "var(--teal)", display: "inline-block" }}></span>
        </div>
        <h2 className="s-h">До и <em>после</em></h2>
        <div className="ba-hint-global">
          <span className="ba-hint-arrow">← →</span>
          Двигайте мышью внутри карточки — влево видите «до», вправо — «после»
        </div>
      </div>
      <div className="strip-row">
        <div className="strip-track go-l" style={{ "--spd": "42s" }}>
          {baData.slice(0, 4).map((d, i) => <BACard key={i} d={d} />)}
          {baData.slice(0, 4).map((d, i) => <BACard key={`dup-${i}`} d={d} />)}
        </div>
      </div>
      <div style={{ marginTop: 16 }}>
        <div className="strip-row">
          <div className="strip-track go-r" style={{ "--spd": "50s" }}>
            {baData.slice(4).map((d, i) => <BACard key={i} d={d} />)}
            {baData.slice(4).map((d, i) => <BACard key={`dup-${i}`} d={d} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
