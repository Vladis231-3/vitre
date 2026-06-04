import { useState } from "react";
import api from "../utils/api";

export default function ContactForm() {
  const [phone, setPhone] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phone.trim()) return;
    setSending(true);
    try {
      await api.post("/contact", { name: "Посетитель сайта", phone, message: "Заявка с формы" });
      setDone(true);
      setPhone("");
    } catch {
      alert("Ошибка отправки. Попробуйте позже.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="cta">
      <div className="co1"></div>
      <div className="co2"></div>
      <div style={{ position: "relative", zIndex: 1 }}>
        <div className="s-lbl rv">Заявка</div>
        <h2 className="s-h rv d1">Отправьте заявку —<br /><em>выедем сегодня</em></h2>
        <p className="cta-sub rv d2">Бесплатная диагностика на объекте. Оценим повреждения и назовём точную стоимость перед началом работ.</p>
        {done ? (
          <div style={{ color: "#fff", fontSize: 18, margin: "40px 0" }}>Спасибо! Мы свяжемся с вами в ближайшее время.</div>
        ) : (
          <form className="cta-form rv d3" onSubmit={handleSubmit}>
            <input
              className="cta-inp"
              type="tel"
              placeholder="+7 (___) ___-__-__"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <button className="cta-go" type="submit" disabled={sending}>
              {sending ? "Отправка..." : "Отправить заявку →"}
            </button>
          </form>
        )}
        <p className="cta-note rv d4">Нажимая кнопку, вы принимаете политику конфиденциальности</p>
        <div className="cta-extra rv d4">
          <a href="tel:+79999999999" className="cta-extra-link">📞 Позвонить напрямую</a>
          <a href="mailto:info@vitre.ru" className="cta-extra-link">✉️ Написать на почту</a>
          <a href="#cta" className="cta-extra-link">📸 Отправить фото повреждения</a>
        </div>
      </div>
    </section>
  );
}
