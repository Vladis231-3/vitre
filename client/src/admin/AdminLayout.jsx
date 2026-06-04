import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("admin-body");
    return () => document.body.classList.remove("admin-body");
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="admin-layout">
      <div className="admin-sidebar">
        <div className="admin-sidebar-logo">VITRE<span>®</span></div>
        <NavLink to="/admin" end>📊 Dashboard</NavLink>
        <NavLink to="/admin/submissions">📋 Заявки</NavLink>
        <NavLink to="/admin/services">🛠 Услуги</NavLink>
        <NavLink to="/admin/works">🖼 Работы</NavLink>
        <NavLink to="/admin/reviews">⭐ Отзывы</NavLink>
        <NavLink to="/admin/cities">🏙 Города</NavLink>
        <NavLink to="/admin/settings">⚙️ Настройки</NavLink>
        <div className="logout">
          <div style={{ padding: "12px 24px", fontSize: 13, color: "rgba(255,255,255,.3)" }}>{user?.email}</div>
          <a href="#" onClick={handleLogout} style={{ color: "rgba(255,255,255,.4)" }}>🚪 Выйти</a>
        </div>
      </div>
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
}
