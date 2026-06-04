const services = [
  { icon: "🪟", title: "Стеклопакеты", desc: "Полировка после ремонта: царапины от шпателей, абразивов, монтажной пены. Без замены стекла.", n: "01" },
  { icon: "🏪", title: "Витрины и фасады", desc: "Глубокие царапины на торговых витринах и стеклянных фасадах. Работаем без демонтажа.", n: "02" },
  { icon: "🌅", title: "Панорамные окна", desc: "Крупногабаритные панорамные окна. Сохраняем оптическую чистоту на больших площадях.", n: "03" },
  { icon: "🔧", title: "После строительства", desc: "Следы болгарки, перфоратора, сварки — всё устранимо без замены остекления.", n: "04" },
  { icon: "🏢", title: "Офисные перегородки", desc: "Стеклянные перегородки в офисах и коворкингах. Матовость, царапины, разводы — устраняем полностью.", n: "05" },
  { icon: "🚗", title: "Автостёкла", desc: "Ветровые и боковые стёкла автомобилей. Восстановление до заводской прозрачности.", n: "06" },
];

export default function Services() {
  return (
    <section id="services">
      <div className="svc-head">
        <div>
          <div className="s-lbl rv">Что мы делаем</div>
          <h2 className="s-h rv d1">Наши <em>услуги</em></h2>
        </div>
        <p className="svc-desc rv d2">Профессиональное оборудование и 12 лет опыта — гарантируем результат или возвращаем деньги.</p>
      </div>
      <div className="svc-grid">
        {services.map((s, i) => (
          <div className={`svc-card rv d${i + 1}`} key={s.title}>
            <div className="svc-ico">{s.icon}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
            <span className="svc-n">{s.n}</span>
          </div>
        ))}
      </div>
      <div className="svc-cta rv d2">
        <div className="svc-cta-l">
          <h3>Не знаете, можно ли убрать вашу царапину?</h3>
          <p>Пришлите фото — бесплатно оценим повреждение и скажем, реально ли это исправить без замены стекла.</p>
        </div>
        <div className="svc-cta-r">
          <a href="#cta" className="btn-p">Отправить фото →</a>
          <a href="#cta" className="btn-p teal">Получить оценку</a>
        </div>
      </div>
    </section>
  );
}
