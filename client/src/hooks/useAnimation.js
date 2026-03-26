import { useEffect, useRef } from "react";

export default function useAnimation(speed = 2) {
  const sliderRef = useRef(0);      // x-position
  const directionRef = useRef(1);   // 1 → right, -1 → left
  const runningRef = useRef(false); // controls start/stop

  useEffect(() => {
    let animationFrameId;

    const animate = () => {
      if (runningRef.current) {
        sliderRef.current += speed * directionRef.current;

        if (sliderRef.current >= 100) directionRef.current = -1;
        if (sliderRef.current <= 0) directionRef.current = 1;
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [speed]);

  const start = () => { runningRef.current = true; };
  const stop = () => { runningRef.current = false; };

  return { sliderRef, start, stop };
}