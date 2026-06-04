const { Router } = require("express");
const supabase = require("../db");
const auth = require("../middleware/auth");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("services")
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
    const { title, description, icon, sort_order } = req.body;
    if (!title) return res.status(400).json({ error: "Название обязательно" });
    const { data, error } = await supabase
      .from("services")
      .insert({ title, description, icon, sort_order })
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
    const { title, description, icon, sort_order } = req.body;
    const { error } = await supabase
      .from("services")
      .update({ title, description, icon, sort_order })
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
      .from("services")
      .delete()
      .eq("id", req.params.id);
    if (error) throw error;
    res.json({ message: "Удалено" });
  } catch (err) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

module.exports = router;
