import { useEffect, useRef, useState } from "react";

export function useActivity(sessionId, sendEvent) {
  const [snapshot, setSnapshot] = useState({ mouseMoveCount: 0, keypressCount: 0 });
  const counters = useRef({ mouseMoveCount: 0, keypressCount: 0 });
  const lastBeat = useRef(Date.now());

  useEffect(() => {
    const onMove = () => counters.current.mouseMoveCount++;
    const onKey = () => counters.current.keypressCount++;

    window.addEventListener("mousemove", onMove);
    window.addEventListener("keydown", onKey);

    const id = setInterval(() => {
      const now = Date.now();
      const elapsedMs = now - lastBeat.current;
      lastBeat.current = now;
      const payload = {
        sessionId,
        mouseMoveCount: counters.current.mouseMoveCount,
        keypressCount: counters.current.keypressCount,
        elapsedMs,
        userAgent: navigator.userAgent,
        page: window.location.pathname,
      };
      setSnapshot({ mouseMoveCount: counters.current.mouseMoveCount, keypressCount: counters.current.keypressCount });
      counters.current = { mouseMoveCount: 0, keypressCount: 0 };
      sendEvent(payload);
    }, 5000);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("keydown", onKey);
      clearInterval(id);
    };
  }, [sessionId, sendEvent]);

  return { heartbeatSnapshot: snapshot };
}
