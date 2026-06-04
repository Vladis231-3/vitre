export default function Insert1() {
  return (
    <div className="insert1">
      <div className="ins1-bg"></div>
      <div className="ins1-grid"></div>
      <div className="ins1-lines">
        <div className="ins1-line" style={{ width: "60%", left: "20%", "--ls": "8s", "--ld": "0s" }}></div>
        <div className="ins1-line" style={{ width: "40%", left: "40%", "--ls": "11s", "--ld": "2s" }}></div>
        <div className="ins1-line" style={{ width: "70%", left: "10%", "--ls": "7s", "--ld": "4s" }}></div>
      </div>
      <div className="ins1-glass ig1"><div className="ins1-scratch" style={{ width: "1px", height: "80px", top: "20%", left: "40%", transform: "rotate(8deg)" }}></div></div>
      <div className="ins1-glass ig2"></div>
      <div className="ins1-glass ig3"><div className="ins1-scratch" style={{ width: "1px", height: "60px", top: "30%", left: "35%", transform: "rotate(12deg)" }}></div></div>
      <div className="ins1-glass ig4"></div>
      <div className="ins1-content rv">
        <h2>Убираем любые<br /><em>царапины</em> со стекла</h2>
        <p>Профессиональное оборудование и многоступенчатая полировка — без замены стекла, без оптических искажений.</p>
        <div className="ins1-btns">
          <a href="#cta" className="btn-p teal">Отправить заявку на оценку →</a>
          <a href="#cta" className="btn-p outline">Рассчитать стоимость</a>
        </div>
      </div>
    </div>
  );
}
