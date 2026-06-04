const facts1 = [
  { n: "98%", t: "без оптических искажений" },
  { n: "2400+", t: "объектов полировано" },
  { n: "12 лет", t: "профессионального опыта" },
  { n: "1 день", t: "средний срок выполнения" },
];
const facts2 = [
  { n: "18 городов", t: "выезд мастера" },
  { n: "100%", t: "гарантия возврата денег" },
  { n: "0 искажений", t: "после полировки" },
  { n: "12 мес", t: "письменная гарантия" },
];

function FactItem({ d }) {
  return (
    <div className="ins3-item">
      <span className="ins3-num">{d.n}</span>
      <span className="ins3-dot"></span>
      <b>{d.t}</b>
    </div>
  );
}

export default function TextMarquee() {
  return (
    <div className="insert3">
      <div className="ins3-row">
        <div className="ins3-track sl">
          {facts1.map((d, i) => <FactItem key={i} d={d} />)}
          {facts1.map((d, i) => <FactItem key={`dup-${i}`} d={d} />)}
          {facts1.map((d, i) => <FactItem key={`dup2-${i}`} d={d} />)}
        </div>
      </div>
      <div className="ins3-row">
        <div className="ins3-track sr">
          {facts2.map((d, i) => <FactItem key={i} d={d} />)}
          {facts2.map((d, i) => <FactItem key={`dup-${i}`} d={d} />)}
          {facts2.map((d, i) => <FactItem key={`dup2-${i}`} d={d} />)}
        </div>
      </div>
    </div>
  );
}
