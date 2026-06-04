const reviews = [
  { init: "А", name: "Алексей Воронов", role: "Частный клиент · Москва", text: "После ремонта квартиры остались глубокие царапины от шпателей. Мастер приехал быстро, и за полдня стекло выглядит как новое. Результат идеальный." },
  { init: "М", name: "Марина Белова", role: "Управляющая ТЦ · СПБ", text: "Заказывали полировку витрин в нашем ТЦ — три панно по 6 метров. Работали без остановки магазина. Рекомендуем всем управляющим." },
  { init: "Д", name: "Денис Соколов", role: "Застройщик · Казань", text: "Работаем с командой VITRE три года. Обслуживаем весь ЖК — более 200 стеклопакетов. Качество стабильно высокое." },
  { init: "О", name: "Ольга Карпова", role: "Дизайнер · Москва", text: "Обратилась после дорогого ремонта — царапины на огромном панорамном окне. Думала придётся менять. Оказалось, всё решаемо — спасибо!" },
  { init: "И", name: "Илья Громов", role: "Владелец ресторана · Краснодар", text: "Витрина ресторана была в царапинах. Приехали на следующий день, сделали быстро и чисто. Теперь знаю куда звонить." },
  { init: "Е", name: "Екатерина Дьяченко", role: "HR-директор · ЕКБ", text: "Обновляли офис — стеклянные перегородки все в царапинах. Мастера отработали профессионально, без запаха и пыли." },
];

function RCard({ r }) {
  return (
    <div className="rcard">
      <div className="rc-stars">★★★★★</div>
      <p className="rc-text">"{r.text}"</p>
      <div className="rc-auth">
        <div className="rc-av">{r.init}</div>
        <div>
          <div className="rc-name">{r.name}</div>
          <div className="rc-role">{r.role}</div>
        </div>
      </div>
    </div>
  );
}

export default function Reviews() {
  return (
    <div className="rev-section">
      <div className="rev-label">
        <div className="s-lbl rv">Отзывы</div>
        <h2 className="s-h rv d1">Говорят <em>клиенты</em></h2>
      </div>
      <div className="rev-strip">
        <div className="rev-track rl">
          {reviews.slice(0, 4).map((r, i) => <RCard key={i} r={r} />)}
          {reviews.slice(0, 4).map((r, i) => <RCard key={`dup-${i}`} r={r} />)}
        </div>
      </div>
      <div className="rev-strip" style={{ marginTop: 16 }}>
        <div className="rev-track rr">
          {reviews.slice(4).map((r, i) => <RCard key={i} r={r} />)}
          {reviews.slice(0, 2).map((r, i) => <RCard key={`dup-${i}`} r={r} />)}
        </div>
      </div>
    </div>
  );
}
