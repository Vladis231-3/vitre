import { useState, useEffect } from "react";
import api from "../utils/api";

export default function ReviewsAdmin() {
  const [items, setItems] = useState([]);
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(null);

  const load = () => api.get("/reviews").then((res) => setItems(res.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const save = async (data) => {
    if (edit) {
      await api.put(`/reviews/${edit.id}`, data);
    } else {
      await api.post("/reviews", data);
    }
    setModal(false);
    setEdit(null);
    load();
  };

  const remove = async (id) => {
    if (!confirm("Удалить отзыв?")) return;
    await api.delete(`/reviews/${id}`);
    load();
  };

  const Form = ({ data, onSave, onCancel }) => {
    const [name, setName] = useState(data?.name || "");
    const [role, setRole] = useState(data?.role || "");
    const [text, setText] = useState(data?.text || "");
    const [rating, setRating] = useState(data?.rating || 5);
    const [initials, setInitials] = useState(data?.initials || "");

    return (
      <div className="admin-modal-overlay" onClick={onCancel}>
        <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
          <h2>{data ? "Редактировать" : "Новый отзыв"}</h2>
          <div className="admin-form-group"><label>Имя</label><input value={name} onChange={(e) => setName(e.target.value)} /></div>
          <div className="admin-form-group"><label>Роль</label><input value={role} onChange={(e) => setRole(e.target.value)} /></div>
          <div className="admin-form-group"><label>Текст</label><textarea rows={4} value={text} onChange={(e) => setText(e.target.value)} /></div>
          <div className="admin-form-group"><label>Рейтинг</label><input type="number" min={1} max={5} value={rating} onChange={(e) => setRating(Number(e.target.value))} /></div>
          <div className="admin-form-group"><label>Инициалы</label><input value={initials} onChange={(e) => setInitials(e.target.value)} maxLength={2} /></div>
          <div className="admin-modal-actions">
            <button className="admin-btn admin-btn-ghost" onClick={onCancel}>Отмена</button>
            <button className="admin-btn admin-btn-primary" onClick={() => onSave({ name, role, text, rating, initials })}>Сохранить</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="admin-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div><h1>Отзывы</h1><p>Отзывы клиентов</p></div>
        <button className="admin-btn admin-btn-primary" onClick={() => { setEdit(null); setModal(true); }}>+ Добавить</button>
      </div>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>ID</th><th>Имя</th><th>Рейтинг</th><th>Текст</th><th></th></tr></thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>#{item.id}</td>
                <td>{item.name}</td>
                <td>{"★".repeat(item.rating)}</td>
                <td style={{ maxWidth: 300, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.text}</td>
                <td>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button className="admin-btn admin-btn-ghost" onClick={() => { setEdit(item); setModal(true); }}>✏️</button>
                    <button className="admin-btn admin-btn-danger" onClick={() => remove(item.id)}>✕</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal && <Form data={edit} onSave={save} onCancel={() => { setModal(false); setEdit(null); }} />}
    </div>
  );
}
