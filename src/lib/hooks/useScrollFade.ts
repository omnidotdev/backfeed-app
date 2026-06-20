import { useCallback, useLayoutEffect, useRef, useState } from "react";

/**
 * Track whether a scroll container is clipped at its start/end edges, so a fade
 * affordance can be shown only on the edge where content is actually hidden. The
 * end fade clears once the user reaches the bottom (and never appears when the
 * content fits), so it cannot dim reachable controls such as a comment's reply
 * button.
 *
 * Remeasures on scroll, on resize of the container or its content, and whenever
 * a caller-provided dependency (e.g. the item count) changes.
 */
const useScrollFade = (deps: unknown[] = []) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ start, end }, setEdges] = useState({ start: false, end: false });

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    const { scrollTop, scrollHeight, clientHeight } = el;

    setEdges({
      // 1px tolerance absorbs sub-pixel rounding
      start: scrollTop > 1,
      end: Math.ceil(scrollTop + clientHeight) < scrollHeight - 1,
    });
  }, []);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    measure();

    el.addEventListener("scroll", measure, { passive: true });

    // container resize covers the viewport shrinking; observing the content
    // child covers it growing (comments loading, replies expanding)
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    if (el.firstElementChild) observer.observe(el.firstElementChild);

    return () => {
      el.removeEventListener("scroll", measure);
      observer.disconnect();
    };
  }, [measure, ...deps]);

  return { ref, showStartFade: start, showEndFade: end };
};

export default useScrollFade;
