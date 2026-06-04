import { useState, useEffect } from "react";
import api from "../utils/api";

export default function CitiesAdmin() {
  const [items, setItems] = useState([]);
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(null);

  const load = () => api.get("/cities").then((res) => setItems(res.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const save = async (data) => {
    if (edit) {
      await api.put(`/cities/${edit.id}`, data);
    } else {
      await api.post("/cities", data);
    }
    setModal(false);
    setEdit(null);
    load();
  };

  const remove = async (id) => {
    if (!confirm("Удалить город?")) return;
    await api.delete(`/cities/${id}`);
    load();
  };

  const Form = ({ data, onSave, onCancel }) => {
    const [name, setName] = useState(data?.name || "");
    const [slug, setSlug] = useState(data?.slug || "");
    const [description, setDescription] = useState(data?.description || "");
    const [features, setFeatures] = useState((data?.features || []).join("\n"));
    const [photos, setPhotos] = useState((data?.photos || []).join("\n"));
    const [sortOrder, setSortOrder] = useState(data?.sort_order || 0);

    const handleSubmit = () => {
      onSave({
        name,
        slug,
        description,
        features: features.split("\n").filter(Boolean),
        photos: photos.split("\n").filter(Boolean),
        sort_order: sortOrder,
      });
    };

    return (
      <div className="admin-modal-overlay" onClick={onCancel}>
        <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
          <h2>{data ? "Редактировать" : "Новый город"}</h2>
          <div className="admin-form-group"><label>Название</label><input value={name} onChange={(e) => setName(e.target.value)} /></div>
          <div className="admin-form-group"><label>Slug</label><input value={slug} onChange={(e) => setSlug(e.target.value)} /></div>
          <div className="admin-form-group"><label>Описание</label><textarea rows={2} value={description} onChange={(e) => setDescription(e.target.value)} /></div>
          <div className="admin-form-group"><label>Особенности (по одной на строку)</label><textarea rows={4} value={features} onChange={(e) => setFeatures(e.target.value)} /></div>
          <div className="admin-form-group"><label>Фото (по одному на строку)</label><textarea rows={4} value={photos} onChange={(e) => setPhotos(e.target.value)} /></div>
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
        <div><h1>Города</h1><p>География работ</p></div>
        <button className="admin-btn admin-btn-primary" onClick={() => { setEdit(null); setModal(true); }}>+ Добавить</button>
      </div>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>ID</th><th>Название</th><th>Slug</th><th>Фото</th><th></th></tr></thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>#{item.id}</td>
                <td>{item.name}</td>
                <td>{item.slug}</td>
                <td>{(item.photos || []).length} шт</td>
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
