const { Router } = require("express");
const db = require("../db");
const auth = require("../middleware/auth");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const items = await db("cities").orderBy("sort_order", "asc");
    const parsed = items.map((c) => ({
      ...c,
      features: typeof c.features === "string" ? JSON.parse(c.features) : c.features,
      photos: typeof c.photos === "string" ? JSON.parse(c.photos) : c.photos,
    }));
    res.json(parsed);
  } catch (err) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const { name, slug, description, features, photos, sort_order } = req.body;
    if (!name || !slug) return res.status(400).json({ error: "Название и slug обязательны" });
    const [id] = await db("cities")
      .insert({
        name,
        slug,
        description,
        features: JSON.stringify(features || []),
        photos: JSON.stringify(photos || []),
        sort_order,
      })
      .returning("id");
    res.status(201).json({ id: id.id });
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
    if (features !== undefined) update.features = JSON.stringify(features);
    if (photos !== undefined) update.photos = JSON.stringify(photos);
    if (sort_order !== undefined) update.sort_order = sort_order;
    await db("cities").where({ id: req.params.id }).update(update);
    res.json({ message: "Обновлено" });
  } catch (err) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    await db("cities").where({ id: req.params.id }).del();
    res.json({ message: "Удалено" });
  } catch (err) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

module.exports = router;
