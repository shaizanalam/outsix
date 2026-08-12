'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type CursorState = 'default' | 'view' | 'shop' | 'add' | 'drag';

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [state, setCursorState] = useState<CursorState>('default');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Hide on touch
    if ('ontouchstart' in window) return;

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };
    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    const onTarget = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-cursor="view"]')) setCursorState('view');
      else if (target.closest('[data-cursor="shop"]')) setCursorState('shop');
      else if (target.closest('[data-cursor="add"]')) setCursorState('add');
      else if (target.closest('[data-cursor="drag"]')) setCursorState('drag');
      else setCursorState('default');
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onTarget);
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onTarget);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
    };
  }, []);

  const label = state !== 'default' ? state.toUpperCase() : null;

  return (
    <motion.div
      style={{
        position: 'fixed',
        left: pos.x,
        top: pos.y,
        zIndex: 9999,
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
      }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.15 }}
      aria-hidden="true"
    >
      {/* DOT */}
      <motion.div
        animate={{ scale: label ? 1.6 : 1 }}
        transition={{ duration: 0.2 }}
        style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: 'var(--white)',
          position: 'relative',
        }}
      >
        <AnimatePresence>
          {label && (
            <motion.span
              key={label}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              style={{
                position: 'absolute',
                top: '14px',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '8px',
                letterSpacing: '0.1em',
                color: 'var(--white)',
                fontFamily: 'Barlow Condensed, sans-serif',
                fontWeight: 700,
                whiteSpace: 'nowrap',
              }}
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
