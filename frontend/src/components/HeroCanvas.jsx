import React, { useEffect, useRef } from 'react';

const HeroCanvas = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const THREE = window.THREE;
    if (!THREE) return;

    let scene, camera, renderer, particles;
    let mouseX = 0, mouseY = 0;

    const init = () => {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 5;

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      containerRef.current.appendChild(renderer.domElement);

      // Particle Geometry
      const geometry = new THREE.BufferGeometry();
      const vertices = [];
      const count = 2000;

      for (let i = 0; i < count; i++) {
        vertices.push(
          Math.random() * 20 - 10,
          Math.random() * 20 - 10,
          Math.random() * 20 - 10
        );
      }

      geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

      // Particle Material
      const material = new THREE.PointsMaterial({
        color: 0x00FF87,
        size: 0.02,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
      });

      particles = new THREE.Points(geometry, material);
      scene.add(particles);

      window.addEventListener('resize', onWindowResize);
      window.addEventListener('mousemove', onMouseMove);
      animate();
    };

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const onMouseMove = (e) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.0005;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.0005;
    };

    const animate = () => {
      requestAnimationFrame(animate);

      particles.rotation.y += 0.001;
      particles.rotation.x += 0.0005;

      // Parallax
      particles.position.x += (mouseX - particles.position.x) * 0.05;
      particles.position.y += (-mouseY - particles.position.y) * 0.05;

      renderer.render(scene, camera);
    };

    init();

    return () => {
      window.removeEventListener('resize', onWindowResize);
      window.removeEventListener('mousemove', onMouseMove);
      if (renderer) {
        renderer.dispose();
      }
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0" />;
};

export default HeroCanvas;
