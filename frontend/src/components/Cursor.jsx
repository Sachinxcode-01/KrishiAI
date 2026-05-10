import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef = useRef(null);
  const circleRef = useRef(null);

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const { gsap } = window;
    if (!gsap) return;

    const moveCursor = (e) => {
      const { clientX, clientY } = e;
      
      // Instant movement for dot
      gsap.set(dotRef.current, { x: clientX, y: clientY });
      
      // Smooth movement for circle
      gsap.to(circleRef.current, {
        x: clientX,
        y: clientY,
        duration: 0.45,
        ease: 'power2.out'
      });
    };

    const handleHover = () => {
      gsap.to(circleRef.current, { scale: 2.8, duration: 0.3 });
    };

    const handleLeave = () => {
      gsap.to(circleRef.current, { scale: 1, duration: 0.3 });
    };

    window.addEventListener('mousemove', moveCursor);

    // Add listeners to interactive elements
    const hoverables = document.querySelectorAll('button, a, .interactive');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', handleHover);
      el.addEventListener('mouseleave', handleLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      hoverables.forEach(el => {
        el.removeEventListener('mouseenter', handleHover);
        el.removeEventListener('mouseleave', handleLeave);
      });
    };
  }, []);

  return (
    <div className="hidden md:block pointer-events-none">
      <div 
        ref={dotRef}
        className="fixed top-0 left-0 size-[5px] bg-[var(--primary)] rounded-full z-[99999] -translate-x-1/2 -translate-y-1/2"
      />
      <div 
        ref={circleRef}
        className="fixed top-0 left-0 size-[42px] border border-[var(--primary)] rounded-full z-[99998] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      />
    </div>
  );
}
