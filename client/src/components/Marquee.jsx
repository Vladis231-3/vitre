const items = [
  "Стеклопакеты", "Панорамные окна", "Витрины", "Фасады",
  "После ремонта", "Без искажений", "Гарантия 12 мес",
  "Выезд в день заявки", "Москва", "СПБ", "Казань",
  "Екатеринбург", "Новосибирск", "Краснодар",
];

export default function Marquee() {
  return (
    <div className="mq-wrap">
      <div className="mq-track" id="mq">
        {items.map((i) => (
          <span className="mq-item" key={i}>
            <span className="mq-dot"></span>{i}
          </span>
        ))}
        {items.map((i) => (
          <span className="mq-item" key={`dup-${i}`}>
            <span className="mq-dot"></span>{i}
          </span>
        ))}
      </div>
    </div>
  );
}
