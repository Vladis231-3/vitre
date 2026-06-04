const { Router } = require("express");
const db = require("../db");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const supabase = require("../utils/supabase");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const items = await db("works").orderBy("sort_order", "asc");
    const enriched = items.map((item) => ({
      ...item,
      url: item.filename
        ? item.filename.startsWith("http")
          ? item.filename
          : `/images/${item.filename}`
        : null,
    }));
    res.json(enriched);
  } catch (err) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

router.post("/", auth, upload.single("file"), async (req, res) => {
  try {
    const { title, subtitle, tag, type, bg_class, width_class, sort_order } = req.body;
    if (!title) return res.status(400).json({ error: "Название обязательно" });

    let filename = null;

    if (req.file) {
      const ext = req.file.originalname.split(".").pop();
      const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${ext}`;
      const filePath = `works/${uniqueName}`;

      const { error: uploadError } = await supabase.storage
        .from("uploads")
        .upload(filePath, req.file.buffer, {
          contentType: req.file.mimetype,
          upsert: false,
        });

      if (uploadError) {
        console.error("Supabase upload error:", uploadError);
        return res.status(500).json({ error: "Ошибка загрузки файла" });
      }

      const { data: publicUrl } = supabase.storage.from("uploads").getPublicUrl(filePath);
      filename = publicUrl.publicUrl;
    }

    const [id] = await db("works")
      .insert({ title, subtitle, tag, type: type || "photo", filename, bg_class, width_class, sort_order })
      .returning("id");

    res.status(201).json({ id: id.id, url: filename });
  } catch (err) {
    console.error("Create work error:", err);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

router.put("/:id", auth, upload.single("file"), async (req, res) => {
  try {
    const { title, subtitle, tag, type, bg_class, width_class, sort_order } = req.body;
    const update = { title, subtitle, tag, type, bg_class, width_class, sort_order };

    if (req.file) {
      const ext = req.file.originalname.split(".").pop();
      const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${ext}`;
      const filePath = `works/${uniqueName}`;

      const { error: uploadError } = await supabase.storage
        .from("uploads")
        .upload(filePath, req.file.buffer, {
          contentType: req.file.mimetype,
          upsert: false,
        });

      if (uploadError) {
        console.error("Supabase upload error:", uploadError);
        return res.status(500).json({ error: "Ошибка загрузки файла" });
      }

      const { data: publicUrl } = supabase.storage.from("uploads").getPublicUrl(filePath);
      update.filename = publicUrl.publicUrl;
    }

    await db("works").where({ id: req.params.id }).update(update);
    res.json({ message: "Обновлено" });
  } catch (err) {
    console.error("Update work error:", err);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    await db("works").where({ id: req.params.id }).del();
    res.json({ message: "Удалено" });
  } catch (err) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

module.exports = router;
