const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const supabase = require("../db");

const router = Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email и пароль обязательны" });
    }

    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (error) throw error;
    if (!user) {
      return res.status(401).json({ error: "Неверный email или пароль" });
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ error: "Неверный email или пароль" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    res.json({ token, user: { id: user.id, email: user.email } });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

router.get("/me", async (req, res) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Нет токена" });
  }
  try {
    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { data: user, error } = await supabase
      .from("users")
      .select("id, email")
      .eq("id", decoded.id)
      .maybeSingle();
    if (error) throw error;
    if (!user) return res.status(401).json({ error: "Пользователь не найден" });
    res.json(user);
  } catch {
    res.status(401).json({ error: "Неверный токен" });
  }
});

module.exports = router;
