-- ============================================================
-- VITRE — ПОЛНАЯ НАСТРОЙКА БАЗЫ ДАННЫХ
-- 1. Откройте https://supabase.com → ваш проект → SQL Editor
-- 2. Вставьте весь этот SQL (Ctrl+A, Ctrl+V)
-- 3. Запустите (Ctrl+Enter)
-- ============================================================

-- СОЗДАНИЕ ТАБЛИЦ
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS submissions (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  message TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS services (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS works (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  tag TEXT,
  type TEXT DEFAULT 'photo' CHECK (type IN ('photo', 'video')),
  filename TEXT,
  bg_class TEXT,
  width_class TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  text TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  initials TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS cities (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  slug TEXT,
  features JSONB DEFAULT '[]',
  photos JSONB DEFAULT '[]',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT
);

-- НАЧАЛЬНЫЕ ДАННЫЕ (SEED)

-- Администратор (admin@vitre.ru / admin123)
INSERT INTO users (email, password_hash) VALUES
  ('admin@vitre.ru', '$2a$10$TCi2uVclIXhhX4R46B.LkukIycRVg.GCXtGkED8nRrsZ9sZ1Knyp.')
ON CONFLICT (email) DO NOTHING;

-- Настройки
INSERT INTO settings (key, value) VALUES
  ('objects_count', '2400'),
  ('experience_years', '12'),
  ('quality_percent', '98'),
  ('cities_count', '18'),
  ('company_phone', '+7 (999) 999-99-99'),
  ('company_email', 'info@vitre.ru')
ON CONFLICT (key) DO NOTHING;

-- Услуги
INSERT INTO services (title, description, icon, sort_order) VALUES
  ('Стеклопакеты', 'Полировка после ремонта: царапины от шпателей, абразивов, монтажной пены. Без замены стекла.', '🪟', 1),
  ('Витрины и фасады', 'Глубокие царапины на торговых витринах и стеклянных фасадах. Работаем без демонтажа.', '🏪', 2),
  ('Панорамные окна', 'Крупногабаритные панорамные окна. Сохраняем оптическую чистоту на больших площадях.', '🌅', 3),
  ('После строительства', 'Следы болгарки, перфоратора, сварки — всё устранимо без замены остекления.', '🔧', 4),
  ('Офисные перегородки', 'Стеклянные перегородки в офисах и коворкингах. Матовость, царапины, разводы — устраняем полностью.', '🏢', 5),
  ('Автостёкла', 'Ветровые и боковые стёкла автомобилей. Восстановление до заводской прозрачности.', '🚗', 6)
ON CONFLICT DO NOTHING;

-- Отзывы
INSERT INTO reviews (name, role, text, rating, initials) VALUES
  ('Алексей Воронов', 'Частный клиент · Москва', 'После ремонта квартиры остались глубокие царапины от шпателей. Мастер приехал быстро, и за полдня стекло выглядит как новое. Результат идеальный.', 5, 'А'),
  ('Марина Белова', 'Управляющая ТЦ · СПБ', 'Заказывали полировку витрин в нашем ТЦ — три панно по 6 метров. Работали без остановки магазина. Рекомендуем всем управляющим.', 5, 'М'),
  ('Денис Соколов', 'Застройщик · Казань', 'Работаем с командой VITRE три года. Обслуживаем весь ЖК — более 200 стеклопакетов. Качество стабильно высокое.', 5, 'Д'),
  ('Ольга Карпова', 'Дизайнер · Москва', 'Обратилась после дорогого ремонта — царапины на огромном панорамном окне. Думала придётся менять. Оказалось, всё решаемо — спасибо!', 5, 'О'),
  ('Илья Громов', 'Владелец ресторана · Краснодар', 'Витрина ресторана была в царапинах. Приехали на следующий день, сделали быстро и чисто. Теперь знаю куда звонить.', 5, 'И'),
  ('Екатерина Дьяченко', 'HR-директор · ЕКБ', 'Обновляли офис — стеклянные перегородки все в царапинах. Мастера отработали профессионально, без запаха и пыли.', 5, 'Е')
ON CONFLICT DO NOTHING;

-- Города
INSERT INTO cities (name, slug, description, features, photos, sort_order) VALUES
  ('Москва', 'msk', 'Работаем по всей Москве и МО. Выезд в день обращения.',
   '["Выезд от 1 часа с момента заявки", "Бесплатная диагностика на объекте", "Работаем с ЖК, ТЦ, БЦ", "Гарантия 12 месяцев письменно"]',
   '["polirovka1.jpg", "polirovka2.jpg", "polirovka3.jpg", "polirovka4.jpg"]', 1),
  ('Санкт-Петербург', 'spb', 'Полировка в Петербурге и ЛО. Витрины элитных объектов и отелей.',
   '["Выезд в день обращения", "Работа на высоте", "Рестораны и отели", "Гарантия 12 месяцев"]',
   '["polirovka5.jpg", "polirovka6.jpg", "polirovka7.jpg", "polirovka8.jpg"]', 2),
  ('Казань', 'kzn', 'Активно работаем с застройщиками — поточная полировка новостроек.',
   '["Договоры с застройщиками", "Поточная полировка новостроек", "ТЦ «Мега», «Ривьера»", "Гарантия 12 месяцев"]',
   '["polirovka9.jpg", "polirovka10.jpg", "polirovka11.jpg", "polirovka12.jpg"]', 3),
  ('Екатеринбург', 'ekb', 'Работаем в ЕКБ и Свердловской области. БЦ, гостиницы, торговые сети.',
   '["Партнёрство с УК", "Высота до 80м", "«Гипербола», «Мегаполис»", "Гарантия 12 месяцев"]',
   '["polirovka13.jpg", "polirovka14.jpg", "polirovka15.jpg", "polirovka16.jpg"]', 4),
  ('Новосибирск', 'nsk', 'Крупнейший офис в Сибири. Выезжаем в Барнаул, Томск, Кемерово.',
   '["Крупнейший офис в Сибири", "Барнаул, Томск, Кемерово", "Субподряд строителям", "Гарантия 12 месяцев"]',
   '["polirovka17.jpg", "polirovka18.jpg", "polirovka19.jpg", "polirovka20.jpg"]', 5),
  ('Краснодар', 'krd', 'Выезжаем в Сочи, Анапу, Геленджик. Сезонное обслуживание отелей.',
   '["Сочи, Анапа, Геленджик", "Сезонное обслуживание отелей", "Постгарантийное обслуживание", "Гарантия 12 месяцев"]',
   '["polirovka21.jpg", "polirovka22.jpg", "polirovka23.jpg", "polirovka24.jpg"]', 6)
ON CONFLICT DO NOTHING;
