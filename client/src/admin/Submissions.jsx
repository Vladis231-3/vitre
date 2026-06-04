import { useState, useEffect } from "react";
import api from "../utils/api";

export default function Submissions() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [detail, setDetail] = useState(null);

  const load = () => {
    const params = {};
    if (status) params.status = status;
    if (search) params.search = search;
    api.get("/submissions", { params }).then((res) => setItems(res.data)).catch(() => {});
  };

  useEffect(() => { load(); }, [status]);

  const updateStatus = async (id, newStatus) => {
    await api.put(`/submissions/${id}`, { status: newStatus });
    load();
  };

  const remove = async (id) => {
    if (!confirm("Удалить заявку?")) return;
    await api.delete(`/submissions/${id}`);
    load();
  };

  return (
    <div>
      <div className="admin-header">
        <h1>Заявки</h1>
        <p>Управление входящими заявками</p>
      </div>
      <div className="admin-search">
        <input placeholder="Поиск по имени, телефону, email..." value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => e.key === "Enter" && load()} />
        <div className="admin-filter">
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">Все статусы</option>
            <option value="new">Новые</option>
            <option value="read">Прочитанные</option>
            <option value="archived">Архив</option>
          </select>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={load}>Поиск</button>
      </div>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Имя</th>
              <th>Телефон</th>
              <th>Email</th>
              <th>Статус</th>
              <th>Дата</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>#{item.id}</td>
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td>{item.email || "—"}</td>
                <td>
                  <span className={`status-badge status-${item.status}`}>
                    {item.status === "new" ? "Новая" : item.status === "read" ? "Прочитана" : "Архив"}
                  </span>
                </td>
                <td>{new Date(item.created_at).toLocaleString("ru")}</td>
                <td>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button className="admin-btn admin-btn-ghost" onClick={() => setDetail(item)}>👁</button>
                    {item.status !== "read" && (
                      <button className="admin-btn admin-btn-ghost" onClick={() => updateStatus(item.id, "read")}>✓</button>
                    )}
                    <button className="admin-btn admin-btn-danger" onClick={() => remove(item.id)}>✕</button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={7} style={{ textAlign: "center", color: "#A09C94", padding: 40 }}>Нет заявок</td></tr>
            )}
          </tbody>
        </table>
      </div>
      {detail && (
        <div className="admin-modal-overlay" onClick={() => setDetail(null)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Заявка #{detail.id}</h2>
            <div className="admin-form-group">
              <label>Имя</label>
              <input value={detail.name} readOnly />
            </div>
            <div className="admin-form-group">
              <label>Телефон</label>
              <input value={detail.phone} readOnly />
            </div>
            <div className="admin-form-group">
              <label>Email</label>
              <input value={detail.email || "—"} readOnly />
            </div>
            <div className="admin-form-group">
              <label>Сообщение</label>
              <textarea rows={4} value={detail.message || ""} readOnly />
            </div>
            <div className="admin-form-group">
              <label>Статус</label>
              <select value={detail.status} onChange={(e) => { updateStatus(detail.id, e.target.value); setDetail(null); }}>
                <option value="new">Новая</option>
                <option value="read">Прочитана</option>
                <option value="archived">Архив</option>
              </select>
            </div>
            <div className="admin-modal-actions">
              <button className="admin-btn admin-btn-ghost" onClick={() => setDetail(null)}>Закрыть</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
