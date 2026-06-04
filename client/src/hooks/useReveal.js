import { useEffect } from "react";

export default function useReveal() {
  useEffect(() => {
    const ro = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("in");
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".rv, .rv-l, .rv-r").forEach((el) => ro.observe(el));
    return () => ro.disconnect();
  }, []);
}
