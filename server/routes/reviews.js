const { Router } = require("express");
const db = require("../db");
const auth = require("../middleware/auth");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const items = await db("reviews").orderBy("created_at", "desc");
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const { name, role, text, rating, initials } = req.body;
    if (!name || !text) return res.status(400).json({ error: "Имя и текст обязательны" });
    const [id] = await db("reviews").insert({ name, role, text, rating, initials }).returning("id");
    res.status(201).json({ id: id.id });
  } catch (err) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const { name, role, text, rating, initials } = req.body;
    await db("reviews").where({ id: req.params.id }).update({ name, role, text, rating, initials });
    res.json({ message: "Обновлено" });
  } catch (err) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    await db("reviews").where({ id: req.params.id }).del();
    res.json({ message: "Удалено" });
  } catch (err) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

module.exports = router;
