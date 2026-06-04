import { useEffect, useRef } from "react";

export default function Cursor() {
  const cdRef = useRef(null);
  const crRef = useRef(null);
  const mx = useRef(0);
  const my = useRef(0);

  useEffect(() => {
    const isTouch = window.matchMedia("(max-width:768px)").matches;
    if (isTouch) return;

    const onMouse = (e) => { mx.current = e.clientX; my.current = e.clientY; };
    document.addEventListener("mousemove", onMouse);

    const tick = () => {
      if (cdRef.current) {
        cdRef.current.style.left = mx.current + "px";
        cdRef.current.style.top = my.current + "px";
      }
      if (crRef.current) {
        const rx = crRef.current.offsetLeft + (mx.current - crRef.current.offsetLeft) * 0.1;
        const ry = crRef.current.offsetTop + (my.current - crRef.current.offsetTop) * 0.1;
        crRef.current.style.left = rx + "px";
        crRef.current.style.top = ry + "px";
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    document.querySelectorAll("a, button, .svc-card, .wcard, .rcard, .proc-step, .i2-item, .ffloat, .cta-go, .ct, .ins1-btns a").forEach((el) => {
      el.addEventListener("mouseenter", () => document.body.classList.add("ch"));
      el.addEventListener("mouseleave", () => document.body.classList.remove("ch"));
    });
    document.addEventListener("mousedown", () => document.body.classList.add("cc"));
    document.addEventListener("mouseup", () => document.body.classList.remove("cc"));

    const darkEls = document.querySelectorAll(".insert1, .insert2, #cta");
    darkEls.forEach((el) => el.dataset.dark = "true");

    const checkDark = () => {
      const el = document.elementFromPoint(mx.current, my.current);
      if (!el) { document.body.classList.remove("dark-zone"); return; }
      const dark = !!el.closest("[data-dark]");
      document.body.classList.toggle("dark-zone", dark);
    };
    document.addEventListener("mousemove", checkDark);

    return () => {
      document.removeEventListener("mousemove", onMouse);
      document.removeEventListener("mousemove", checkDark);
    };
  }, []);

  return (
    <div id="cur">
      <div id="cur-d" ref={cdRef}></div>
      <div id="cur-r" ref={crRef}></div>
    </div>
  );
}
