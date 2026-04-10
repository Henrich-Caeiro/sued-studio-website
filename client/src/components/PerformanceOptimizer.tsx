// Performance optimization utilities for Three.js rendering

export const usePerformanceOptimizations = () => {
  // Detect device capabilities
  const isMobile = () => {
    if (typeof window === 'undefined') return false;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  };

  // Get optimal particle count based on device
  const getOptimalParticleCount = (baseCount: number): number => {
    if (isMobile()) {
      return Math.floor(baseCount * 0.4); // 40% on mobile
    }
    
    // Check GPU capability
    if ((navigator as any).deviceMemory && (navigator as any).deviceMemory < 4) {
      return Math.floor(baseCount * 0.6); // 60% on low-end devices
    }
    
    return baseCount;
  };

  // Get optimal canvas resolution
  const getOptimalDPR = (): number => {
    if (isMobile()) {
      return Math.min(window.devicePixelRatio, 1.5);
    }
    return window.devicePixelRatio;
  };

  // Throttle function for scroll events
  const throttle = (func: Function, limit: number) => {
    let inThrottle: boolean;
    return function (this: any, ...args: any[]) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  };

  return {
    isMobile: isMobile(),
    optimalParticleCount: getOptimalParticleCount,
    optimalDPR: getOptimalDPR(),
    throttle
  };
};

// CSS for responsive canvas sizing
export const canvasStyles = {
  width: '100%',
  height: '100%',
  display: 'block',
  pointerEvents: 'none' as const
};
