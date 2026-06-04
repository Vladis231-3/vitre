import { useEffect } from "react";

export default function Navbar() {
  useEffect(() => {
    const onScroll = () => {
      const nav = document.getElementById("nav");
      if (!nav) return;
      nav.classList.toggle("s", window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav id="nav">
      <a href="/" className="logo">VITRE<span>®</span></a>
      <div className="nav-r">
        <ul className="nav-links">
          <li><a href="#services">Услуги</a></li>
          <li><a href="#results">Работы</a></li>
          <li><a href="#process">Процесс</a></li>
          <li><a href="#cities">Города</a></li>
        </ul>
        <a href="#cta" className="nav-cta">Заявка →</a>
      </div>
    </nav>
  );
}
