import { useEffect, useRef } from "react";

export default function Hero() {
  const vidRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    const vid = vidRef.current;
    if (!vid) return;

    const fb = document.querySelector(".hero-vid-fallback");
    if (fb) {
      vid.addEventListener("canplay", () => fb.classList.add("hidden"));
      setTimeout(() => { if (vid.readyState >= 2) fb.classList.add("hidden"); }, 300);
    }

    let soundUnlocked = false;
    const tryPlay = () => {
      vid.muted = false;
      vid.play()
        .then(() => {
          soundUnlocked = true;
          if (btnRef.current) { btnRef.current.style.opacity = "0"; setTimeout(() => btnRef.current?.remove(), 300); }
        })
        .catch(() => {
          vid.muted = true;
          vid.play().catch(() => {});
          if (btnRef.current) btnRef.current.style.display = "flex";
        });
    };
    tryPlay();

    const btn = btnRef.current;
    if (btn) {
      btn.addEventListener("click", () => {
        vid.muted = false;
        vid.play().then(() => {
          soundUnlocked = true;
          btn.style.opacity = "0";
          setTimeout(() => btn.remove(), 300);
        }).catch(() => {});
      });
    }

    const hero = document.getElementById("hero");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          if (soundUnlocked) vid.muted = false;
          vid.play().catch(() => {});
        } else {
          vid.muted = true;
          vid.pause();
        }
      });
    }, { threshold: 0.15 });
    if (hero) observer.observe(hero);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="hero">
      <div className="h-orb ho1"></div>
      <div className="h-orb ho2"></div>
      <div className="h-orb ho3"></div>
      <div className="hero-l">
        <div className="h-pill"><div className="h-pill-dot"></div>Профессиональная полировка стекла</div>
        <h1 className="h-title"><span className="line">Полировка</span><span className="line"><em>стекла</em></span></h1>
        <p className="h-sub">Удаляем царапины со стеклопакетов, панорамных окон и витрин без оптических искажений. Повреждения от ремонта — наша специализация.</p>
        <div className="h-actions">
          <a href="#cta" className="btn-p">Отправить заявку →</a>
          <a href="#cta" className="btn-p teal">Получить оценку стоимости</a>
          <a href="#results" className="btn-g">Смотреть работы <span className="a">→</span></a>
        </div>
      </div>
      <div className="hero-r">
        <div className="hero-vid-wrap">
          <video className="hero-vid" ref={vidRef} autoPlay loop playsInline preload="auto">
            <source src="/videos/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="hero-vid-fallback">
            <div className="hvf-inner">
              <div className="hvf-icon">🪟</div>
              <div className="hvf-text">hero-video.mp4</div>
              <div className="hvf-sub">Положите видео рядом с HTML-файлом</div>
            </div>
          </div>
          <div className="hero-vid-badge"><div className="h-pill-dot"></div>Профессиональная полировка</div>
          <button ref={btnRef} id="hvid-sound-btn" style={{ display: "none", position: "absolute", bottom: "70px", left: "50%", transform: "translateX(-50%)", background: "rgba(0,0,0,.55)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,.2)", color: "#fff", borderRadius: "100px", padding: "8px 18px", fontSize: "12px", letterSpacing: ".5px", cursor: "pointer", whiteSpace: "nowrap", zIndex: 5, transition: "opacity .3s" }}>
            <span>🔇</span> Нажмите для звука
          </button>
        </div>
      </div>
    </section>
  );
}
