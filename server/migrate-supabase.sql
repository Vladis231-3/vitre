-- ============================================================
-- VITRE — полная настройка базы данных Supabase
-- 1. Откройте https://supabase.com → ваш проект → SQL Editor
-- 2. Вставьте весь этот SQL и запустите (Ctrl+Enter)
-- 3. Потом сделайте то же самое с файлом seed-supabase.sql
-- ============================================================

-- Таблица users
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Таблица submissions (заявки)
CREATE TABLE IF NOT EXISTS submissions (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  message TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Таблица services (услуги)
CREATE TABLE IF NOT EXISTS services (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Таблица works (работы)
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

-- Таблица reviews (отзывы)
CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  text TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  initials TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Таблица cities (города)
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

-- Таблица settings (настройки)
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT
);
