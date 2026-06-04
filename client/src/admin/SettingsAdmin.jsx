import { useState, useEffect } from "react";
import api from "../utils/api";

const keys = [
  { key: "objects_count", label: "Количество объектов" },
  { key: "experience_years", label: "Лет опыта" },
  { key: "quality_percent", label: "Процент качества" },
  { key: "cities_count", label: "Количество городов" },
  { key: "company_phone", label: "Телефон компании" },
  { key: "company_email", label: "Email компании" },
];

export default function SettingsAdmin() {
  const [settings, setSettings] = useState({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.get("/settings").then((res) => setSettings(res.data)).catch(() => {});
  }, []);

  const handleSave = async () => {
    await api.put("/settings", settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="admin-header">
        <h1>Настройки</h1>
        <p>Управление настройками сайта</p>
      </div>
      <div style={{ background: "#fff", borderRadius: 16, padding: 32, boxShadow: "0 1px 3px rgba(0,0,0,.04)", maxWidth: 500 }}>
        {keys.map(({ key, label }) => (
          <div className="admin-form-group" key={key}>
            <label>{label}</label>
            <input value={settings[key] || ""} onChange={(e) => setSettings({ ...settings, [key]: e.target.value })} />
          </div>
        ))}
        <button className="admin-btn admin-btn-primary" onClick={handleSave}>
          {saved ? "✓ Сохранено" : "Сохранить"}
        </button>
      </div>
    </div>
  );
}
