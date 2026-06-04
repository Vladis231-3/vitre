import { useEffect, useRef } from "react";

const items = [
  { num: "2400", suffix: "+", label: "Объектов полировано", bar: 92 },
  { num: "12", suffix: " лет", label: "Опыт на рынке", bar: 78 },
  { num: "98", suffix: "%", label: "Без оптических искажений", bar: 98 },
  { num: "18", suffix: " гор.", label: "Выезд мастера", bar: 60 },
];

function Counter({ target, suffix }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const dur = 1600;
          const start = performance.now();
          const tick = (now) => {
            const p = Math.min((now - start) / dur, 1);
            el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target);
            if (p < 1) requestAnimationFrame(tick);
            else el.textContent = target;
          };
          requestAnimationFrame(tick);
          obs.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="cnt" data-t={target}>
      0
    </span>
  );
}

export default function Numbers() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.style.width = e.target.dataset.w + "%";
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    document.querySelectorAll(".i2-fill").forEach((b) => obs.observe(b));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="insert2">
      <div className="i2-orb io1"></div>
      <div className="i2-orb io2"></div>
      <div className="i2-grid">
        {items.map((item, i) => (
          <div className={`i2-item rv d${i + 1}`} key={item.label}>
            <div className="i2-num">
              <Counter target={parseInt(item.num)} suffix={item.suffix} />
              <em>{item.suffix}</em>
            </div>
            <div className="i2-lbl">{item.label}</div>
            <div className="i2-bar">
              <div className="i2-fill" data-w={item.bar}></div>
            </div>
          </div>
        ))}
      </div>
      <div className="i2-cta rv">
        <div className="i2-cta-l">
          <h3>Готовы восстановить<br />ваше стекло <em style={{ fontStyle: "italic", color: "var(--teal3)" }}>сегодня</em></h3>
          <p>Выезд мастера — в день заявки. Бесплатная диагностика на объекте.</p>
        </div>
        <div className="i2-cta-r">
          <a href="#cta" className="btn-p teal">Отправить заявку →</a>
          <a href="#cta" className="btn-p outline">Рассчитать стоимость</a>
        </div>
      </div>
    </div>
  );
}
