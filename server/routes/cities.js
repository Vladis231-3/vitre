const { Router } = require("express");
const supabase = require("../db");
const auth = require("../middleware/auth");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("cities")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const { name, slug, description, features, photos, sort_order } = req.body;
    if (!name || !slug) return res.status(400).json({ error: "Название и slug обязательны" });
    const { data, error } = await supabase
      .from("cities")
      .insert({
        name,
        slug,
        description,
        features: features || [],
        photos: photos || [],
        sort_order,
      })
      .select("id")
      .single();
    if (error) throw error;
    res.status(201).json({ id: data.id });
  } catch (err) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const { name, slug, description, features, photos, sort_order } = req.body;
    const update = {};
    if (name !== undefined) update.name = name;
    if (slug !== undefined) update.slug = slug;
    if (description !== undefined) update.description = description;
    if (features !== undefined) update.features = features;
    if (photos !== undefined) update.photos = photos;
    if (sort_order !== undefined) update.sort_order = sort_order;
    const { error } = await supabase
      .from("cities")
      .update(update)
      .eq("id", req.params.id);
    if (error) throw error;
    res.json({ message: "Обновлено" });
  } catch (err) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const { error } = await supabase
      .from("cities")
      .delete()
      .eq("id", req.params.id);
    if (error) throw error;
    res.json({ message: "Удалено" });
  } catch (err) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

module.exports = router;
