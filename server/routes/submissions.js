const { Router } = require("express");
const db = require("../db");
const auth = require("../middleware/auth");

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ error: "Имя и телефон обязательны" });
    }
    const [id] = await db("submissions").insert({ name, phone, email, message }).returning("id");
    res.status(201).json({ id: id.id, message: "Заявка отправлена" });
  } catch (err) {
    console.error("Create submission error:", err);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const { status, search } = req.query;
    let query = db("submissions").orderBy("created_at", "desc");
    if (status) query = query.where({ status });
    if (search) {
      query = query.where(function () {
        this.where("name", "ilike", `%${search}%`)
          .orWhere("phone", "ilike", `%${search}%`)
          .orWhere("email", "ilike", `%${search}%`);
      });
    }
    const items = await query;
    res.json(items);
  } catch (err) {
    console.error("Get submissions error:", err);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const item = await db("submissions").where({ id: req.params.id }).first();
    if (!item) return res.status(404).json({ error: "Не найдено" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const { status } = req.body;
    if (!["new", "read", "archived"].includes(status)) {
      return res.status(400).json({ error: "Неверный статус" });
    }
    await db("submissions").where({ id: req.params.id }).update({ status });
    res.json({ message: "Обновлено" });
  } catch (err) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    await db("submissions").where({ id: req.params.id }).del();
    res.json({ message: "Удалено" });
  } catch (err) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

module.exports = router;
