import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const cdRef = useRef(null);
  const crRef = useRef(null);
  const mx = useRef(-100);
  const my = useRef(-100);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const onMouse = (e) => {
      mx.current = e.clientX;
      my.current = e.clientY;
      if (!visible) setVisible(true);
    };
    document.addEventListener("mousemove", onMouse);

    let rafId;
    const tick = () => {
      if (cdRef.current) {
        cdRef.current.style.transform = `translate(${mx.current}px, ${my.current}px)`;
      }
      if (crRef.current) {
        const curLeft = parseFloat(crRef.current.style.left) || mx.current;
        const curTop = parseFloat(crRef.current.style.top) || my.current;
        const rx = curLeft + (mx.current - curLeft) * 0.12;
        const ry = curTop + (my.current - curTop) * 0.12;
        crRef.current.style.left = rx + "px";
        crRef.current.style.top = ry + "px";
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const addHoverListeners = () => {
      document.querySelectorAll("a, button, .svc-card, .wcard, .rcard, .proc-step, .i2-item, .ffloat, .cta-go, .ct, .ins1-btns a").forEach((el) => {
        el.addEventListener("mouseenter", () => document.body.classList.add("ch"));
        el.addEventListener("mouseleave", () => document.body.classList.remove("ch"));
      });
    };
    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    document.addEventListener("mousedown", () => document.body.classList.add("cc"));
    document.addEventListener("mouseup", () => document.body.classList.remove("cc"));

    const darkEls = document.querySelectorAll(".insert1, .insert2, #cta");
    darkEls.forEach((el) => (el.dataset.dark = "true"));

    const checkDark = () => {
      const el = document.elementFromPoint(mx.current, my.current);
      if (!el) {
        document.body.classList.remove("dark-zone");
        return;
      }
      const dark = !!el.closest("[data-dark]");
      document.body.classList.toggle("dark-zone", dark);
    };
    document.addEventListener("mousemove", checkDark);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMouse);
      document.removeEventListener("mousemove", checkDark);
      observer.disconnect();
    };
  }, []);

  return (
    <div id="cur" style={{ opacity: visible ? 1 : 0 }}>
      <div id="cur-d" ref={cdRef}></div>
      <div id="cur-r" ref={crRef}></div>
    </div>
  );
}
