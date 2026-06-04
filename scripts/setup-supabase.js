/**
 * Скрипт для первичной настройки Supabase.
 * Запускать после создания проекта в Supabase:
 *
 *   1. Создать проект на https://supabase.com
 *   2. Скопировать Project URL и service_role key
 *   3. Обновить server/.env с этими данными
 *   4. Запустить: node scripts/setup-supabase.js
 *
 * Скрипт создаст bucket "uploads" и применит миграции.
 */

require("dotenv").config({ path: require("path").join(__dirname, "..", "server", ".env") });
const { createClient } = require("@supabase/supabase-js");
const { execSync } = require("child_process");

async function setup() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_KEY;

  if (!supabaseUrl || !supabaseKey || supabaseUrl.includes("your-project")) {
    console.error("Ошибка: не настроены SUPABASE_URL и SUPABASE_KEY в server/.env");
    console.error("1. Создайте проект на https://supabase.com");
    console.error("2. Скопируйте Project URL и service_role key");
    console.error("3. Обновите server/.env");
    process.exit(1);
  }

  console.log("Подключение к Supabase...");
  const supabase = createClient(supabaseUrl, supabaseKey);

  // Создаём bucket uploads
  const { data: buckets } = await supabase.storage.listBuckets();
  const exists = buckets?.some((b) => b.name === "uploads");

  if (!exists) {
    console.log("Создание bucket 'uploads'...");
    const { error } = await supabase.storage.createBucket("uploads", {
      public: true,
      fileSizeLimit: 52428800, // 50 MB
    });
    if (error) {
      console.error("Ошибка создания bucket:", error.message);
      process.exit(1);
    }
    console.log("Bucket 'uploads' создан!");
  } else {
    console.log("Bucket 'uploads' уже существует.");
  }

  // Запускаем миграции
  console.log("Запуск миграций...");
  try {
    execSync("npx knex migrate:latest", {
      cwd: require("path").join(__dirname, "..", "server"),
      stdio: "inherit",
      env: { ...process.env, NODE_ENV: "development" },
    });
    console.log("Миграции выполнены!");
  } catch (err) {
    console.error("Ошибка миграций:", err.message);
    process.exit(1);
  }

  // Запускаем сиды
  console.log("Заполнение начальными данными...");
  try {
    execSync("npx knex seed:run", {
      cwd: require("path").join(__dirname, "..", "server"),
      stdio: "inherit",
    });
    console.log("Начальные данные загружены!");
  } catch (err) {
    console.error("Ошибка сидов:", err.message);
    process.exit(1);
  }

  console.log("\n✅ Настройка завершена!");
  console.log("   Админ: admin@vitre.ru / admin123");
}

setup();
