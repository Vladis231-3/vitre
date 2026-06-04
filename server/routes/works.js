const { Router } = require("express");
const supabase = require("../db");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const { supabaseUpload, getPublicUrl } = require("../middleware/upload");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("works")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) throw error;
    const enriched = data.map((item) => ({
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
      const result = await supabaseUpload(req.file);
      if (result.error) {
        return res.status(500).json({ error: "Ошибка загрузки файла" });
      }
      filename = getPublicUrl(result.path);
    }

    const { data, error } = await supabase
      .from("works")
      .insert({ title, subtitle, tag, type: type || "photo", filename, bg_class, width_class, sort_order })
      .select("id")
      .single();
    if (error) throw error;

    res.status(201).json({ id: data.id, url: filename });
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
      const result = await supabaseUpload(req.file);
      if (result.error) {
        return res.status(500).json({ error: "Ошибка загрузки файла" });
      }
      update.filename = getPublicUrl(result.path);
    }

    const { error } = await supabase
      .from("works")
      .update(update)
      .eq("id", req.params.id);
    if (error) throw error;

    res.json({ message: "Обновлено" });
  } catch (err) {
    console.error("Update work error:", err);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const { error } = await supabase
      .from("works")
      .delete()
      .eq("id", req.params.id);
    if (error) throw error;
    res.json({ message: "Удалено" });
  } catch (err) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

module.exports = router;
