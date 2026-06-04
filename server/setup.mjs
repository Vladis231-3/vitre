import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { execSync } from "child_process";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env") });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey || supabaseUrl.includes("your-project")) {
  console.error("Ошибка: не настроены SUPABASE_URL и SUPABASE_KEY в server/.env");
  process.exit(1);
}

console.log("Подключение к Supabase...");
const supabase = createClient(supabaseUrl, supabaseKey);

const { data: buckets } = await supabase.storage.listBuckets();
const exists = buckets?.some((b) => b.name === "uploads");

if (!exists) {
  console.log("Создание bucket 'uploads'...");
  const { error } = await supabase.storage.createBucket("uploads", {
    public: true,
    fileSizeLimit: 52428800,
  });
  if (error) { console.error("Ошибка создания bucket:", error.message); process.exit(1); }
  console.log("Bucket 'uploads' создан!");
} else {
  console.log("Bucket 'uploads' уже существует.");
}

console.log("Запуск миграций...");
try {
  execSync("npx knex migrate:latest --knexfile db/knexfile.js", { cwd: __dirname, stdio: "inherit" });
  console.log("Миграции выполнены!");
} catch (err) {
  console.error("Ошибка миграций:", err.message);
  process.exit(1);
}

console.log("Заполнение начальными данными...");
try {
  execSync("npx knex seed:run --knexfile db/knexfile.js", { cwd: __dirname, stdio: "inherit" });
  console.log("Начальные данные загружены!");
} catch (err) {
  console.error("Ошибка сидов:", err.message);
  process.exit(1);
}

console.log("\n✅ Настройка завершена!");
console.log("   Админ: admin@vitre.ru / admin123");
