export default function Footer() {
  return (
    <footer>
      <div className="f-logo">VITRE<span>®</span></div>
      <div className="f-links">
        <a href="#services">Услуги</a>
        <a href="#cities">Города</a>
        <a href="#results">Работы</a>
        <a href="#cta">Заявка</a>
        <a href="https://t.me/vitre_ru" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>Telegram</a>
      </div>
      <div className="f-copy">© 2025 VITRE — Полировка стекла в Москве и по России</div>
    </footer>
  );
}
