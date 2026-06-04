import { useState, useEffect } from "react";
import api from "../utils/api";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/stats").then((res) => setStats(res.data)).catch(() => {});
  }, []);

  if (!stats) return <p>Загрузка...</p>;

  const cards = [
    { label: "Всего заявок", value: stats.totalSubmissions },
    { label: "Новые заявки", value: stats.newSubmissions },
    { label: "Сегодня", value: stats.todaySubmissions },
    { label: "Услуг", value: stats.totalServices },
    { label: "Работ", value: stats.totalWorks },
    { label: "Отзывов", value: stats.totalReviews },
  ];

  return (
    <div>
      <div className="admin-header">
        <h1>Dashboard</h1>
        <p>Статистика сайта VITRE</p>
      </div>
      <div className="admin-cards">
        {cards.map((c) => (
          <div className="admin-card" key={c.label}>
            <div className="admin-card-value">{c.value}</div>
            <div className="admin-card-label">{c.label}</div>
          </div>
        ))}
      </div>
      {stats.submissionsByDay?.length > 0 && (
        <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 400, marginBottom: 16 }}>Заявки по дням</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={stats.submissionsByDay}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="count" fill="#1F5C51" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
