import { useEffect, useRef } from 'react';

// ============================================
// Text Reveal Effect - Words fade in on scroll
// ============================================
export const TextReveal = ({ children, className = "" }: { children: string; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('text-reveal-active');
          (entry.target as HTMLElement).style.opacity = '1';
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`text-reveal ${className}`}
      style={{
        opacity: 1,
        animation: 'textRevealIn 0.8s ease-out forwards',
      }}
    >
      {children}
    </div>
  );
};

// ============================================
// Split Text Effect - Each word animates separately
// ============================================
export const SplitText = ({ text, className = "" }: { text: string; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const words = ref.current?.querySelectorAll('.split-word');
          words?.forEach((word, idx) => {
            (word as HTMLElement).style.animation = `splitWordIn 0.6s ease-out ${idx * 0.1}s forwards`;
            (word as HTMLElement).style.opacity = '1';
          });
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const words = text.split(' ');

  return (
    <div ref={ref} className={className}>
      {words.map((word, idx) => (
        <span
          key={idx}
          className="split-word inline-block mr-2"
          style={{
            opacity: 1,
            display: 'inline-block',
          }}
        >
          {word}
        </span>
      ))}
    </div>
  );
};

// ============================================
// Gradient Text Effect - Animated gradient on text
// ============================================
export const GradientText = ({ children, className = "" }: { children: string; className?: string }) => {
  return (
    <span
      className={`bg-gradient-to-r from-accent via-cyan-400 to-accent bg-clip-text text-transparent animate-pulse ${className}`}
      style={{
        backgroundSize: '200% 200%',
        animation: 'gradientShift 3s ease infinite',
      }}
    >
      {children}
    </span>
  );
};

// ============================================
// Character Reveal Effect - Letter by letter
// ============================================
export const CharacterReveal = ({ text, className = "" }: { text: string; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const chars = ref.current?.querySelectorAll('.char');
          chars?.forEach((char, idx) => {
            (char as HTMLElement).style.animation = `charRevealIn 0.05s ease-out ${idx * 0.05}s forwards`;
            (char as HTMLElement).style.opacity = '1';
          });
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {text.split('').map((char, idx) => (
        <span
          key={idx}
          className="char inline-block"
          style={{
            opacity: 1,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
};

// ============================================
// Underline Reveal Effect - Underline animates on scroll
// ============================================
export const UnderlineReveal = ({ children, className = "" }: { children: string; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('underline-active');
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative inline-block ${className}`}
      style={{
        backgroundImage: 'linear-gradient(to right, currentColor 0%, currentColor 100%)',
        backgroundSize: '0% 2px',
        backgroundPosition: 'left bottom',
        backgroundRepeat: 'no-repeat',
        transition: 'background-size 0.8s ease-out',
      }}
    >
      {children}
    </div>
  );
};
