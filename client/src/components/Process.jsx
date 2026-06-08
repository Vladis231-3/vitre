import { useEffect, useRef } from "react";

export default function Process() {
  const vidRef = useRef(null);
  const fbRef = useRef(null);

  useEffect(() => {
    const vid = vidRef.current;
    const fb = fbRef.current;
    if (!vid || !fb) return;
    const hide = () => fb.classList.remove("show");
    vid.addEventListener("canplay", hide);
    vid.addEventListener("playing", hide);
    setTimeout(() => { if (vid.readyState >= 2) hide(); }, 500);
  }, []);

  return (
    <section id="process">
      <div className="s-lbl rv">Как мы работаем</div>
      <h2 className="s-h rv d1">Четыре шага<br />до <em>идеального</em> стекла</h2>
      <div className="proc-grid">
        <div className="proc-steps rv-l d2">
          <div className="proc-step">
            <div className="ps-n">01</div>
            <div className="ps-b">
              <h4>Диагностика</h4>
              <p>Оцениваем глубину царапин и тип стекла. Определяем метод и называем точную стоимость.</p>
            </div>
          </div>
          <div className="proc-step">
            <div className="ps-n">02</div>
            <div className="ps-b">
              <h4>Подготовка</h4>
              <p>Очищаем поверхность, защищаем рамы и прилегающие конструкции от абразива.</p>
            </div>
          </div>
          <div className="proc-step">
            <div className="ps-n">03</div>
            <div className="ps-b">
              <h4>Полировка</h4>
              <p>Многоступенчатая полировка специальными составами. Контроль оптики на каждом этапе.</p>
            </div>
          </div>
          <div className="proc-step">
            <div className="ps-n">04</div>
            <div className="ps-b">
              <h4>Контроль качества</h4>
              <p>Финальная проверка под профессиональным освещением. Фотоотчёт и гарантия 12 месяцев.</p>
            </div>
          </div>
          <div className="proc-cta">
            <a href="#cta" className="btn-p">Записать мастера →</a>
            <a href="#cta" className="btn-p teal">Оценить стоимость</a>
          </div>
        </div>
        <div className="proc-vis rv-r d3">
          <video ref={vidRef} className="pv-video" autoPlay muted loop playsInline preload="none">
            <source src="/videos/process-video.mp4" type="video/mp4" />
          </video>
          <div ref={fbRef} className="pv-fallback show">
            <div className="pv-in">
              <div className="pv-lbl">Степень полировки</div>
              <div className="pv-track"><div className="pv-fill"></div></div>
              <div className="pv-tag"><div className="pvd"></div>Мастер работает на объекте</div>
            </div>
            <div className="pv-shine"></div>
          </div>
          <div className="pv-video-label">
            <div className="pvd"></div>
            Мастер работает на объекте
          </div>
        </div>
      </div>
    </section>
  );
}
