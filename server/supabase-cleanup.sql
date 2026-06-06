-- Удаление дубликатов (оставляем первые 6 записей)
DELETE FROM services WHERE id > 6;
DELETE FROM reviews WHERE id > 6;
DELETE FROM cities WHERE id > 6;

-- Сброс sequence, чтобы новые id начинались с 7
ALTER SEQUENCE services_id_seq RESTART WITH 7;
ALTER SEQUENCE reviews_id_seq RESTART WITH 7;
ALTER SEQUENCE cities_id_seq RESTART WITH 7;
