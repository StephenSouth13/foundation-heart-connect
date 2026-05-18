import { useEffect, useRef, useState } from "react";

/**
 * Scroll-triggered fade-in.
 * - Starts hidden, reveals when element enters viewport.
 * - Safety net: auto-reveals after 800ms in case observer never fires
 *   (e.g. element mounts already in viewport, async data, SSR mismatch).
 * - Respects prefers-reduced-motion: shows immediately.
 */
export function useScrollAnimation(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Reduced motion → show immediately
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) {
      // Safety net even if ref isn't attached yet
      const t = setTimeout(() => setIsVisible(true), 800);
      return () => clearTimeout(t);
    }

    // If already in viewport synchronously, reveal right away
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < vh && rect.bottom > 0) {
      setIsVisible(true);
      return;
    }

    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer?.unobserve(el);
          }
        },
        { threshold, rootMargin: "0px 0px -10% 0px" }
      );
      observer.observe(el);
    } else {
      setIsVisible(true);
    }

    // Final safety: if for any reason observer never fires within 1.2s, reveal
    const safety = setTimeout(() => setIsVisible(true), 1200);

    return () => {
      observer?.disconnect();
      clearTimeout(safety);
    };
  }, [threshold]);

  return { ref, isVisible };
}
