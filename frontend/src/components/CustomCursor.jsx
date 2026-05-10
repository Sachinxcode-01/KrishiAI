import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const circleRef = useRef(null);

  useEffect(() => {
    const gsap = window.gsap;
    if (!gsap) return;

    const moveCursor = (e) => {
      const { clientX: x, clientY: y } = e;

      // Small dot follows instantly
      gsap.to(dotRef.current, {
        x,
        y,
        duration: 0,
      });

      // Large circle follows with lag
      gsap.to(circleRef.current, {
        x,
        y,
        duration: 0.5,
        ease: "power2.out"
      });
    };

    const handleHover = (e) => {
      const isHoverable = e.target.closest('button, a, .hover-trigger');
      if (isHoverable) {
        gsap.to(circleRef.current, {
          scale: 2.5,
          duration: 0.3
        });
      } else {
        gsap.to(circleRef.current, {
          scale: 1,
          duration: 0.3
        });
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHover);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHover);
    };
  }, []);

  return (
    <>
      <div 
        ref={dotRef} 
        className="cursor-dot fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[10001]" 
      />
      <div 
        ref={circleRef} 
        className="cursor-circle fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[10000]" 
      />
    </>
  );
};

export default CustomCursor;
