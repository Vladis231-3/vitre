const { Router } = require("express");
const supabase = require("../db");
const auth = require("../middleware/auth");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const { name, role, text, rating, initials } = req.body;
    if (!name || !text) return res.status(400).json({ error: "Имя и текст обязательны" });
    const { data, error } = await supabase
      .from("reviews")
      .insert({ name, role, text, rating, initials })
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
    const { name, role, text, rating, initials } = req.body;
    const { error } = await supabase
      .from("reviews")
      .update({ name, role, text, rating, initials })
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
      .from("reviews")
      .delete()
      .eq("id", req.params.id);
    if (error) throw error;
    res.json({ message: "Удалено" });
  } catch (err) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

module.exports = router;
