const { Router } = require("express");
const supabase = require("../db");
const auth = require("../middleware/auth");

const router = Router();

router.get("/", auth, async (req, res) => {
  try {
    const { count: totalSubmissions } = await supabase
      .from("submissions")
      .select("*", { count: "exact", head: true });

    const { count: newSubmissions } = await supabase
      .from("submissions")
      .select("*", { count: "exact", head: true })
      .eq("status", "new");

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const { count: todaySubmissions } = await supabase
      .from("submissions")
      .select("*", { count: "exact", head: true })
      .gte("created_at", today.toISOString());

    const { count: totalServices } = await supabase
      .from("services")
      .select("*", { count: "exact", head: true });

    const { count: totalReviews } = await supabase
      .from("reviews")
      .select("*", { count: "exact", head: true });

    const { count: totalWorks } = await supabase
      .from("works")
      .select("*", { count: "exact", head: true });

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const { data: submissionsData } = await supabase
      .from("submissions")
      .select("created_at")
      .gte("created_at", thirtyDaysAgo.toISOString())
      .order("created_at", { ascending: true });

    const submissionsByDayMap = {};
    submissionsData.forEach((s) => {
      const date = new Date(s.created_at).toISOString().split("T")[0];
      submissionsByDayMap[date] = (submissionsByDayMap[date] || 0) + 1;
    });
    const submissionsByDay = Object.entries(submissionsByDayMap)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));

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
