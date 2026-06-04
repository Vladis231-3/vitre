const { Router } = require("express");
const db = require("../db");
const auth = require("../middleware/auth");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const rows = await db("settings");
    const obj = {};
    rows.forEach((r) => (obj[r.key] = r.value));
    res.json(obj);
  } catch (err) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

router.put("/", auth, async (req, res) => {
  try {
    const entries = req.body;
    for (const [key, value] of Object.entries(entries)) {
      await db("settings").insert({ key, value }).onConflict("key").merge();
    }
    res.json({ message: "Сохранено" });
  } catch (err) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

module.exports = router;
