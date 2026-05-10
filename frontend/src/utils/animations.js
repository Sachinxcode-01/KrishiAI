export function initAnimations() {
  // Wait for scripts to load from CDN
  if (typeof window === 'undefined' || !window.gsap || !window.ScrollTrigger || !window.Lenis) {
    const timer = setTimeout(initAnimations, 100);
    return () => clearTimeout(timer);
  }

  const { gsap, ScrollTrigger } = window;
  const Lenis = window.Lenis;

  if (!Lenis) {
    console.warn('Lenis not found, skipping smooth scroll initialization');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Set up Lenis smooth scroll
  const lenis = new Lenis({
    duration: 0.8,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1.1,
  });

  lenis.on('scroll', ScrollTrigger.update);

  const raf = (time) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };

  requestAnimationFrame(raf);

  return () => {
    lenis.destroy();
  };
}
