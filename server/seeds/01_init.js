const bcrypt = require("bcryptjs");

exports.seed = async function (knex) {
  await knex("settings").del();
  await knex("reviews").del();
  await knex("works").del();
  await knex("services").del();
  await knex("submissions").del();
  await knex("cities").del();
  await knex("users").del();

  await knex("users").insert({
    email: "admin@vitre.ru",
    password_hash: await bcrypt.hash("admin123", 10),
  });

  await knex("settings").insert([
    { key: "objects_count", value: "2400" },
    { key: "experience_years", value: "12" },
    { key: "quality_percent", value: "98" },
    { key: "cities_count", value: "18" },
    { key: "company_phone", value: "+7 (999) 999-99-99" },
    { key: "company_email", value: "info@vitre.ru" },
  ]);

  await knex("services").insert([
    { title: "Стеклопакеты", description: "Полировка после ремонта: царапины от шпателей, абразивов, монтажной пены. Без замены стекла.", icon: "🪟", sort_order: 1 },
    { title: "Витрины и фасады", description: "Глубокие царапины на торговых витринах и стеклянных фасадах. Работаем без демонтажа.", icon: "🏪", sort_order: 2 },
    { title: "Панорамные окна", description: "Крупногабаритные панорамные окна. Сохраняем оптическую чистоту на больших площадях.", icon: "🌅", sort_order: 3 },
    { title: "После строительства", description: "Следы болгарки, перфоратора, сварки — всё устранимо без замены остекления.", icon: "🔧", sort_order: 4 },
    { title: "Офисные перегородки", description: "Стеклянные перегородки в офисах и коворкингах. Матовость, царапины, разводы — устраняем полностью.", icon: "🏢", sort_order: 5 },
    { title: "Автостёкла", description: "Ветровые и боковые стёкла автомобилей. Восстановление до заводской прозрачности.", icon: "🚗", sort_order: 6 },
  ]);

  await knex("reviews").insert([
    { name: "Алексей Воронов", role: "Частный клиент · Москва", text: "После ремонта квартиры остались глубокие царапины от шпателей. Мастер приехал быстро, и за полдня стекло выглядит как новое. Результат идеальный.", rating: 5, initials: "А" },
    { name: "Марина Белова", role: "Управляющая ТЦ · СПБ", text: "Заказывали полировку витрин в нашем ТЦ — три панно по 6 метров. Работали без остановки магазина. Рекомендуем всем управляющим.", rating: 5, initials: "М" },
    { name: "Денис Соколов", role: "Застройщик · Казань", text: "Работаем с командой VITRE три года. Обслуживаем весь ЖК — более 200 стеклопакетов. Качество стабильно высокое.", rating: 5, initials: "Д" },
    { name: "Ольга Карпова", role: "Дизайнер · Москва", text: "Обратилась после дорогого ремонта — царапины на огромном панорамном окне. Думала придётся менять. Оказалось, всё решаемо — спасибо!", rating: 5, initials: "О" },
    { name: "Илья Громов", role: "Владелец ресторана · Краснодар", text: "Витрина ресторана была в царапинах. Приехали на следующий день, сделали быстро и чисто. Теперь знаю куда звонить.", rating: 5, initials: "И" },
    { name: "Екатерина Дьяченко", role: "HR-директор · ЕКБ", text: "Обновляли офис — стеклянные перегородки все в царапинах. Мастера отработали профессионально, без запаха и пыли.", rating: 5, initials: "Е" },
  ]);

  await knex("cities").insert([
    {
      name: "Москва",
      slug: "msk",
      description: "Работаем по всей Москве и МО. Выезд в день обращения.",
      features: JSON.stringify(["Выезд от 1 часа с момента заявки", "Бесплатная диагностика на объекте", "Работаем с ЖК, ТЦ, БЦ", "Гарантия 12 месяцев письменно"]),
      photos: JSON.stringify(["polirovka1.jpg", "polirovka2.jpg", "polirovka3.jpg", "polirovka4.jpg"]),
      sort_order: 1,
    },
    {
      name: "Санкт-Петербург",
      slug: "spb",
      description: "Полировка в Петербурге и ЛО. Витрины элитных объектов и отелей.",
      features: JSON.stringify(["Выезд в день обращения", "Работа на высоте", "Рестораны и отели", "Гарантия 12 месяцев"]),
      photos: JSON.stringify(["polirovka5.jpg", "polirovka6.jpg", "polirovka7.jpg", "polirovka8.jpg"]),
      sort_order: 2,
    },
    {
      name: "Казань",
      slug: "kzn",
      description: "Активно работаем с застройщиками — поточная полировка новостроек.",
      features: JSON.stringify(["Договоры с застройщиками", "Поточная полировка новостроек", "ТЦ «Мега», «Ривьера»", "Гарантия 12 месяцев"]),
      photos: JSON.stringify(["polirovka9.jpg", "polirovka10.jpg", "polirovka11.jpg", "polirovka12.jpg"]),
      sort_order: 3,
    },
    {
      name: "Екатеринбург",
      slug: "ekb",
      description: "Работаем в ЕКБ и Свердловской области. БЦ, гостиницы, торговые сети.",
      features: JSON.stringify(["Партнёрство с УК", "Высота до 80м", "«Гипербола», «Мегаполис»", "Гарантия 12 месяцев"]),
      photos: JSON.stringify(["polirovka13.jpg", "polirovka14.jpg", "polirovka15.jpg", "polirovka16.jpg"]),
      sort_order: 4,
    },
    {
      name: "Новосибирск",
      slug: "nsk",
      description: "Крупнейший офис в Сибири. Выезжаем в Барнаул, Томск, Кемерово.",
      features: JSON.stringify(["Крупнейший офис в Сибири", "Барнаул, Томск, Кемерово", "Субподряд строителям", "Гарантия 12 месяцев"]),
      photos: JSON.stringify(["polirovka17.jpg", "polirovka18.jpg", "polirovka19.jpg", "polirovka20.jpg"]),
      sort_order: 5,
    },
    {
      name: "Краснодар",
      slug: "krd",
      description: "Выезжаем в Сочи, Анапу, Геленджик. Сезонное обслуживание отелей.",
      features: JSON.stringify(["Сочи, Анапа, Геленджик", "Сезонное обслуживание отелей", "Постгарантийное обслуживание", "Гарантия 12 месяцев"]),
      photos: JSON.stringify(["polirovka21.jpg", "polirovka22.jpg", "polirovka23.jpg", "polirovka24.jpg"]),
      sort_order: 6,
    },
  ]);
};
