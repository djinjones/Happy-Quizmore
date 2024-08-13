import { useEffect, useRef } from 'react';
import { Fireworks } from 'fireworks-js';

const FireworksDisplay = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const fireworks = new Fireworks(containerRef.current, {
        rocketsPoint: {
          min: 50,
          max: 50,
        },
        hue: {
          min: 0,
          max: 360,
        },
        delay: {
          min: 15,
          max: 30,
        },
        speed: 2,
        acceleration: 1.05,
        friction: 0.98,
        gravity: 1.5,
        particles: 50,
        trace: 3,
        explosion: 5,
        autoresize: true,
        brightness: {
          min: 50,
          max: 80,
          decay: {
            min: 0.015,
            max: 0.03,
          },
        },
        boundaries: {
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        },
        sound: {
          enable: true,
          files: [
            'https://fireworks-js.com/sounds/explosion0.mp3',
            'https://fireworks-js.com/sounds/explosion1.mp3',
            'https://fireworks-js.com/sounds/explosion2.mp3',
          ],
          volume: {
            min: 1,
            max: 2,
          },
        },
      });

      fireworks.start();

      // Clean up on component unmount
      return () => {
        fireworks.stop();
      };
    }
  }, []);

  return (
    <div
    ref={containerRef}
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 9999,  // Ensure it's on top of other elements
      pointerEvents: 'none',
      backgroundColor: 'transparent',  // Make sure it’s not hidden
      }}
    />
  );
};

export default FireworksDisplay;
