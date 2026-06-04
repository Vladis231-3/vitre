import { useState, useEffect } from "react";
import api from "../utils/api";

export default function WorksAdmin() {
  const [items, setItems] = useState([]);
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(null);

  const load = () => api.get("/works").then((res) => setItems(res.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const save = async (formData) => {
    if (edit) {
      await api.put(`/works/${edit.id}`, formData, { headers: { "Content-Type": "multipart/form-data" } });
    } else {
      await api.post("/works", formData, { headers: { "Content-Type": "multipart/form-data" } });
    }
    setModal(false);
    setEdit(null);
    load();
  };

  const remove = async (id) => {
    if (!confirm("Удалить работу?")) return;
    await api.delete(`/works/${id}`);
    load();
  };

  const Form = ({ data, onSave, onCancel }) => {
    const [title, setTitle] = useState(data?.title || "");
    const [subtitle, setSubtitle] = useState(data?.subtitle || "");
    const [tag, setTag] = useState(data?.tag || "");
    const [type, setType] = useState(data?.type || "photo");
    const [file, setFile] = useState(null);
    const [sortOrder, setSortOrder] = useState(data?.sort_order || 0);

    const handleSubmit = () => {
      const fd = new FormData();
      fd.append("title", title);
      fd.append("subtitle", subtitle);
      fd.append("tag", tag);
      fd.append("type", type);
      fd.append("sort_order", String(sortOrder));
      if (file) fd.append("file", file);
      onSave(fd);
    };

    return (
      <div className="admin-modal-overlay" onClick={onCancel}>
        <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
          <h2>{data ? "Редактировать" : "Новая работа"}</h2>
          <div className="admin-form-group"><label>Название</label><input value={title} onChange={(e) => setTitle(e.target.value)} /></div>
          <div className="admin-form-group"><label>Подпись</label><input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} /></div>
          <div className="admin-form-group"><label>Тег</label><input value={tag} onChange={(e) => setTag(e.target.value)} /></div>
          <div className="admin-form-group"><label>Тип</label><select value={type} onChange={(e) => setType(e.target.value)}><option value="photo">Фото</option><option value="video">Видео</option></select></div>
          <div className="admin-form-group"><label>Файл</label><input type="file" onChange={(e) => setFile(e.target.files[0])} /></div>
          <div className="admin-form-group"><label>Порядок</label><input type="number" value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value))} /></div>
          <div className="admin-modal-actions">
            <button className="admin-btn admin-btn-ghost" onClick={onCancel}>Отмена</button>
            <button className="admin-btn admin-btn-primary" onClick={handleSubmit}>Сохранить</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="admin-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div><h1>Работы</h1><p>Портфолио выполненных работ</p></div>
        <button className="admin-btn admin-btn-primary" onClick={() => { setEdit(null); setModal(true); }}>+ Добавить</button>
      </div>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>ID</th><th>Название</th><th>Тег</th><th>Тип</th><th>Файл</th><th></th></tr></thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>#{item.id}</td>
                <td>{item.title}</td>
                <td>{item.tag}</td>
                <td>{item.type}</td>
                <td>{item.filename || "—"}</td>
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
