const { Router } = require("express");
const supabase = require("../db");
const auth = require("../middleware/auth");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase.from("settings").select("*");
    if (error) throw error;
    const obj = {};
    data.forEach((r) => (obj[r.key] = r.value));
    res.json(obj);
  } catch (err) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

router.put("/", auth, async (req, res) => {
  try {
    const entries = req.body;
    for (const [key, value] of Object.entries(entries)) {
      const { data: existing } = await supabase
        .from("settings")
        .select("id")
        .eq("key", key)
        .maybeSingle();
      if (existing) {
        const { error } = await supabase
          .from("settings")
          .update({ value })
          .eq("key", key);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("settings")
          .insert({ key, value });
        if (error) throw error;
      }
    }
    res.json({ message: "Сохранено" });
  } catch (err) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

module.exports = router;
