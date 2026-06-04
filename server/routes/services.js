const { Router } = require("express");
const db = require("../db");
const auth = require("../middleware/auth");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const items = await db("services").orderBy("sort_order", "asc");
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const { title, description, icon, sort_order } = req.body;
    if (!title) return res.status(400).json({ error: "Название обязательно" });
    const [id] = await db("services").insert({ title, description, icon, sort_order }).returning("id");
    res.status(201).json({ id: id.id });
  } catch (err) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const { title, description, icon, sort_order } = req.body;
    await db("services").where({ id: req.params.id }).update({ title, description, icon, sort_order });
    res.json({ message: "Обновлено" });
  } catch (err) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    await db("services").where({ id: req.params.id }).del();
    res.json({ message: "Удалено" });
  } catch (err) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

module.exports = router;
