import { useState, useEffect } from "react";
import api from "../utils/api";

export default function ServicesAdmin() {
  const [items, setItems] = useState([]);
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(null);

  const load = () => api.get("/services").then((res) => setItems(res.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const save = async (data) => {
    if (edit) {
      await api.put(`/services/${edit.id}`, data);
    } else {
      await api.post("/services", data);
    }
    setModal(false);
    setEdit(null);
    load();
  };

  const remove = async (id) => {
    if (!confirm("Удалить услугу?")) return;
    await api.delete(`/services/${id}`);
    load();
  };

  const Form = ({ data, onSave, onCancel }) => {
    const [title, setTitle] = useState(data?.title || "");
    const [description, setDescription] = useState(data?.description || "");
    const [icon, setIcon] = useState(data?.icon || "");
    const [sortOrder, setSortOrder] = useState(data?.sort_order || 0);

    return (
      <div className="admin-modal-overlay" onClick={onCancel}>
        <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
          <h2>{data ? "Редактировать" : "Новая услуга"}</h2>
          <div className="admin-form-group"><label>Название</label><input value={title} onChange={(e) => setTitle(e.target.value)} /></div>
          <div className="admin-form-group"><label>Описание</label><textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} /></div>
          <div className="admin-form-group"><label>Иконка (emoji)</label><input value={icon} onChange={(e) => setIcon(e.target.value)} /></div>
          <div className="admin-form-group"><label>Порядок</label><input type="number" value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value))} /></div>
          <div className="admin-modal-actions">
            <button className="admin-btn admin-btn-ghost" onClick={onCancel}>Отмена</button>
            <button className="admin-btn admin-btn-primary" onClick={() => onSave({ title, description, icon, sort_order: sortOrder })}>Сохранить</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="admin-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div><h1>Услуги</h1><p>Управление списком услуг</p></div>
        <button className="admin-btn admin-btn-primary" onClick={() => { setEdit(null); setModal(true); }}>+ Добавить</button>
      </div>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>ID</th><th>Иконка</th><th>Название</th><th>Порядок</th><th></th></tr></thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>#{item.id}</td>
                <td style={{ fontSize: 22 }}>{item.icon}</td>
                <td>{item.title}</td>
                <td>{item.sort_order}</td>
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
