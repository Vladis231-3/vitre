const { Router } = require("express");
const db = require("../db");
const auth = require("../middleware/auth");

const router = Router();

router.get("/", auth, async (req, res) => {
  try {
    const totalSubmissions = (await db("submissions").count("* as cnt").first()).cnt;
    const newSubmissions = (await db("submissions").where({ status: "new" }).count("* as cnt").first()).cnt;
    const todaySubmissions = (
      await db("submissions")
        .whereRaw("created_at >= CURRENT_DATE")
        .count("* as cnt")
        .first()
    ).cnt;
    const totalServices = (await db("services").count("* as cnt").first()).cnt;
    const totalReviews = (await db("reviews").count("* as cnt").first()).cnt;
    const totalWorks = (await db("works").count("* as cnt").first()).cnt;

    const submissionsByDay = await db("submissions")
      .select(db.raw("DATE(created_at) as date"))
      .count("* as count")
      .groupBy("date")
      .orderBy("date", "asc")
      .limit(30);

    res.json({
      totalSubmissions,
      newSubmissions,
      todaySubmissions,
      totalServices,
      totalReviews,
      totalWorks,
      submissionsByDay,
    });
  } catch (err) {
    console.error("Stats error:", err);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

module.exports = router;
