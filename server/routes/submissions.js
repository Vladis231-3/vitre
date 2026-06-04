const { Router } = require("express");
const supabase = require("../db");
const auth = require("../middleware/auth");

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ error: "Имя и телефон обязательны" });
    }
    const { data, error } = await supabase
      .from("submissions")
      .insert({ name, phone, email, message })
      .select("id")
      .single();
    if (error) throw error;
    res.status(201).json({ id: data.id, message: "Заявка отправлена" });
  } catch (err) {
    console.error("Create submission error:", err);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const { status, search } = req.query;
    let query = supabase.from("submissions").select("*").order("created_at", { ascending: false });
    if (status) query = query.eq("status", status);
    if (search) {
      query = query.or(`name.ilike.%${search}%,phone.ilike.%${search}%,email.ilike.%${search}%`);
    }
    const { data, error } = await query;
    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error("Get submissions error:", err);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("submissions")
      .select("*")
      .eq("id", req.params.id)
      .maybeSingle();
    if (error) throw error;
    if (!data) return res.status(404).json({ error: "Не найдено" });
    res.json(data);
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
    const { error } = await supabase
      .from("submissions")
      .update({ status })
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
      .from("submissions")
      .delete()
      .eq("id", req.params.id);
    if (error) throw error;
    res.json({ message: "Удалено" });
  } catch (err) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

module.exports = router;
