import { useState, useEffect, useRef } from "react";

interface AnimatedCounterProps {
  end: number;
  label: string;
  suffix?: string;
}

export default function AnimatedCounter({ end, label, suffix = "" }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let currentCount = 0;
    const increment = end / 60; // Animate over ~60 frames (1 second at 60fps)
    const timer = setInterval(() => {
      currentCount += increment;
      if (currentCount >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(currentCount));
      }
    }, 16); // ~60fps

    return () => clearInterval(timer);
  }, [isVisible, end]);

  return (
    <div
      ref={ref}
      className="text-center transform transition-all duration-700"
      style={{
        opacity: isVisible ? 1 : 0.5,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
      }}
    >
      <div className="text-5xl md:text-6xl font-bold text-accent mb-3 font-mono tracking-tight">
        {count}{suffix}
      </div>
      <p className="text-sm text-muted-foreground font-medium">{label}</p>
    </div>
  );
}
