import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from 'framer-motion';

/**
 * Interactive Cinematic Preloader
 * - 10 second timeline: intro glitch name -> radar progress -> countdown
 * - Mouse-repelled particle network + click spark bursts
 * - Blinds reveal into the dashboard
 */

const TOTAL_DURATION = 10000; // 10 seconds before the dashboard opens
const INTRO_END = 1800; // end of the intro phase (ms)
const COUNTDOWN_START = TOTAL_DURATION - 3000; // final countdown (ms)

const RING_RADIUS = 86;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

const LOADING_MESSAGES = [
  'Waking up the pixels...',
  'Compiling caffeine into code...',
  'Teaching electrons to dance...',
  'Downloading more RAM...',
  'Aligning the chakras of CSS...',
  'Spinning up the quantum flux...',
  'Bribing the Wi-Fi router...',
  'Rendering bad decisions...',
  'Untangling headphone wires...',
  'Summoning the front-end gods...',
];

const ORBIT_CHIPS = ['React', '</>', 'JS', 'CSS', 'Vite', 'Motion','Java'];

const PARTICLE_COLORS = ['#00d9ff', '#ff006e', '#ffffff', '#a78bfa'];
const BURST_RGB = ['0,217,255', '255,0,110', '167,139,250', '255,255,255'];

const rand = (min, max) => min + Math.random() * (max - min);

/**
 * Full-screen particle network that reacts to the cursor
 * and explodes into sparks on click.
 */
function ParticleField({ pointerRef, burstsRef }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;
    let particles = [];
    let rafId = 0;

    const initParticles = () => {
      const count = Math.min(110, Math.max(45, Math.round((width * height) / 16000)));
      particles = Array.from({ length: count }, () => ({
        x: rand(0, width),
        y: rand(0, height),
        vx: rand(-0.5, 0.5),
        vy: rand(-0.5, 0.5),
        r: rand(0.8, 2.4),
        color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
      }));
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles();
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const draw = () => {
      // Fade previous frames so particles leave comet-like trails
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'source-over';

      const { x: mx, y: my } = pointerRef.current;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -15) p.x = width + 15;
        else if (p.x > width + 15) p.x = -15;
        if (p.y < -15) p.y = height + 15;
        else if (p.y > height + 15) p.y = -15;

        // Cursor repulsion
        const dx = p.x - mx;
        const dy = p.y - my;
        const distSq = dx * dx + dy * dy;
        if (distSq < 150 * 150 && distSq > 0.01) {
          const dist = Math.sqrt(distSq);
          const force = (150 - dist) / 150;
          p.vx += (dx / dist) * force * 0.4;
          p.vy += (dy / dist) * force * 0.4;
        }

        const speed = Math.hypot(p.vx, p.vy);
        if (speed > 2.6) {
          p.vx = (p.vx / speed) * 2.6;
          p.vy = (p.vy / speed) * 2.6;
        }
        p.vx *= 0.99;
        p.vy *= 0.99;
        if (speed < 0.15) {
          p.vx += rand(-0.05, 0.05);
          p.vy += rand(-0.05, 0.05);
        }
      }

      // Network lines
      ctx.lineWidth = 0.6;
      for (let i = 0; i < particles.length; i += 1) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j += 1) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 130 * 130) {
            const alpha = ((1 - Math.sqrt(distSq) / 130) * 0.3).toFixed(3);
            ctx.strokeStyle = `rgba(0, 217, 255, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Particles with glow
      for (const p of particles) {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.85;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 0.16;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 3.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Click bursts: shockwave ring + sparks
      if (burstsRef.current.length > 0) {
        for (const burst of burstsRef.current) {
          burst.life -= 0.025;
          const radius = (1 - burst.life) * 110;
          ctx.strokeStyle = `rgba(${burst.rgb}, ${Math.max(burst.life, 0) * 0.7})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(burst.x, burst.y, radius, 0, Math.PI * 2);
          ctx.stroke();

          for (const s of burst.sparks) {
            s.x += s.vx;
            s.y += s.vy;
            s.vx *= 0.95;
            s.vy *= 0.95;
            ctx.strokeStyle = `rgba(${burst.rgb}, ${Math.max(burst.life, 0)})`;
            ctx.lineWidth = s.size;
            ctx.beginPath();
            ctx.moveTo(s.x, s.y);
            ctx.lineTo(s.x - s.vx * 3, s.y - s.vy * 3);
            ctx.stroke();
          }
        }
        burstsRef.current = burstsRef.current.filter((b) => b.life > 0);
      }

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
    };
  }, [pointerRef, burstsRef]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}

export const LoadingAnimation = ({ isLoading }) => {
  const [progress, setProgress] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  const pointerRef = useRef({ x: -500, y: -500 });
  const burstsRef = useRef([]);

  const rawGlowX = useMotionValue(-500);
  const rawGlowY = useMotionValue(-500);
  const glowX = useSpring(rawGlowX, { stiffness: 180, damping: 22, mass: 0.5 });
  const glowY = useSpring(rawGlowY, { stiffness: 180, damping: 22, mass: 0.5 });

  // 10 second timeline
  useEffect(() => {
    if (!isLoading) return undefined;
    let rafId = 0;
    const start = performance.now();
    const tick = (now) => {
      const time = Math.min(now - start, TOTAL_DURATION);
      setElapsed(time);
      setProgress(time / TOTAL_DURATION);
      if (now - start < TOTAL_DURATION) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isLoading]);

  // Lock scrolling while the preloader is visible
  useEffect(() => {
    if (!isLoading) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isLoading]);

  const phase =
    elapsed < INTRO_END ? 'intro' : elapsed < COUNTDOWN_START ? 'loading' : 'countdown';
  const countdown = Math.max(1, Math.ceil((TOTAL_DURATION - elapsed) / 1000));
  const message =
    LOADING_MESSAGES[Math.floor(elapsed / 750) % LOADING_MESSAGES.length];
  const statusText = phase === 'countdown' ? 'INITIALIZING DASHBOARD...' : message;
  const percent = Math.round(progress * 100);

  const handlePointerMove = (event) => {
    pointerRef.current = { x: event.clientX, y: event.clientY };
    rawGlowX.set(event.clientX);
    rawGlowY.set(event.clientY);
  };

  const handlePointerDown = (event) => {
    const rgb = BURST_RGB[Math.floor(Math.random() * BURST_RGB.length)];
    const sparks = Array.from({ length: 16 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = rand(2, 7);
      return {
        x: event.clientX,
        y: event.clientY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: rand(1, 3),
      };
    });
    burstsRef.current.push({ x: event.clientX, y: event.clientY, life: 1, rgb, sparks });
  };

  return (
    <>
      {/* Blinds that slide away to reveal the dashboard */}
      <AnimatePresence>
        {isLoading &&
          [0, 1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={`blind-${i}`}
              className="pointer-events-none fixed left-0 right-0 z-40 bg-dark-900"
              style={{ top: `${(i * 100) / 6}%`, height: `${100 / 6 + 0.4}%` }}
              exit={{
                y: i % 2 === 0 ? '115%' : '-115%',
                transition: {
                  duration: 0.8,
                  delay: 0.3 + i * 0.07,
                  ease: [0.76, 0, 0.24, 1],
                },
              }}
            />
          ))}
      </AnimatePresence>

      {/* Preloader scene */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="preloader-scene"
            className="fixed inset-0 z-50 select-none overflow-hidden bg-dark-900"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 1.06,
              filter: 'blur(8px)',
              transition: { duration: 0.55, delay: 0.05, ease: 'easeIn' },
            }}
            onPointerMove={handlePointerMove}
            onPointerDown={handlePointerDown}
          >
            <ParticleField pointerRef={pointerRef} burstsRef={burstsRef} />

            {/* Cursor glow */}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 h-[420px] w-[420px] rounded-full blur-3xl"
              style={{
                x: glowX,
                y: glowY,
                marginLeft: -210,
                marginTop: -210,
                background:
                  'radial-gradient(circle, rgba(0,217,255,0.28) 0%, rgba(255,0,110,0.16) 40%, transparent 70%)',
              }}
            />

            {/* Perspective cyber grid */}
            <div className="loader-grid" aria-hidden="true" />
            {/* Vignette */}
            <div className="loader-vignette absolute inset-0" aria-hidden="true" />
            {/* CRT scanlines */}
            <div className="scanlines absolute inset-0" aria-hidden="true" />

            {/* Center content */}
            <motion.div
              className="absolute left-1/2 top-1/2 z-10 flex w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-5 px-4"
            >
              {/* Orbiting tech chips */}
              {phase !== 'countdown' && (
                <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 sm:block">
                  <div className="relative h-full w-full animate-spin [animation-duration:26s]">
                    {ORBIT_CHIPS.map((chip, i) => (
                      <div
                        key={chip}
                        className="absolute -translate-x-1/2 -translate-y-1/2"
                        style={{
                          left: `${50 + 47 * Math.cos((i / ORBIT_CHIPS.length) * Math.PI * 2)}%`,
                          top: `${50 + 47 * Math.sin((i / ORBIT_CHIPS.length) * Math.PI * 2)}%`,
                        }}
                      >
                        <div className="animate-spin [animation-duration:26s] [animation-direction:reverse]">
                          <span className="block rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] tracking-widest text-[#9fd9ea] backdrop-blur-sm">
                            {chip}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Glitch name */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
              >
                <h1
                  className="glitch-text text-5xl font-bold uppercase tracking-[0.15em] sm:text-7xl"
                  data-text="ADINATH"
                >
                  <span className="bg-gradient-to-r from-[#00d9ff] via-[#c4b5fd] to-[#ff006e] bg-clip-text text-transparent">
                    ADINATH
                  </span>
                </h1>
                <p className="mt-2 text-sm uppercase tracking-[0.5em] text-[#8ab4c8] sm:text-base">
                  Kanha Padghan
                </p>
              </motion.div>

              {/* Phase content: intro -> radar -> countdown */}
              <AnimatePresence mode="wait">
                {phase === 'intro' && (
                  <motion.div
                    key="intro"
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.25 } }}
                  >
                    <p className="text-base text-[#e9fbff] sm:text-lg">
                      Designer <span className="text-[#ff006e]">✦</span> Developer{' '}
                      <span className="text-[#00d9ff]">✦</span> Dreamer
                    </p>
                    <p className="mt-3 text-[11px] uppercase tracking-widest text-[#6f8a99]">
                      move your mouse · click for sparks
                    </p>
                  </motion.div>
                )}

                {phase === 'loading' && (
                  <motion.div
                    key="loading"
                    className="relative flex flex-col items-center"
                    initial={{ opacity: 0, scale: 0.75 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{
                      opacity: 0,
                      scale: 1.25,
                      filter: 'blur(8px)',
                      transition: { duration: 0.3, ease: 'easeIn' },
                    }}
                    transition={{ type: 'spring', stiffness: 160, damping: 18 }}
                  >
                    {/* Radar sweep */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-[-34px] animate-spin rounded-full bg-[conic-gradient(from_0deg,rgba(0,217,255,0)_0deg,rgba(0,217,255,0.22)_70deg,rgba(255,0,110,0.18)_120deg,rgba(0,217,255,0)_180deg)] [animation-duration:4.5s]"
                    />

                    <div className="relative">
                      <svg
                        width="200"
                        height="200"
                        viewBox="0 0 200 200"
                        className="drop-shadow-[0_0_18px_rgba(0,217,255,0.35)]"
                      >
                        <defs>
                          <linearGradient
                            id="ringGrad"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                          >
                            <stop offset="0%" stopColor="#00d9ff" />
                            <stop offset="50%" stopColor="#a78bfa" />
                            <stop offset="100%" stopColor="#ff006e" />
                          </linearGradient>
                        </defs>
                        <circle
                          cx="100"
                          cy="100"
                          r={RING_RADIUS}
                          fill="none"
                          stroke="rgba(255,255,255,0.08)"
                          strokeWidth="10"
                        />
                        <circle
                          cx="100"
                          cy="100"
                          r={RING_RADIUS}
                          fill="none"
                          stroke="url(#ringGrad)"
                          strokeWidth="10"
                          strokeLinecap="round"
                          strokeDasharray={RING_CIRCUMFERENCE}
                          strokeDashoffset={RING_CIRCUMFERENCE * (1 - progress)}
                          transform="rotate(-90 100 100)"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-bold text-[#e9fbff]">
                          {percent}
                          <span className="text-xl">%</span>
                        </span>
                        <span className="mt-1 text-[10px] tracking-[0.35em] text-[#6f8a99]">
                          LOADING
                        </span>
                      </div>
                    </div>

                    {/* Linear progress bar */}
                    <div className="mt-5 h-1.5 w-56 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#00d9ff] to-[#ff006e]"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </motion.div>
                )}

                {phase === 'countdown' && (
                  <motion.div
                    key="countdown"
                    className="flex h-[220px] w-[200px] items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  >
                    <AnimatePresence mode="popLayout">
                      <motion.span
                        key={countdown}
                        className="text-[110px] font-bold leading-none text-[#e9fbff] drop-shadow-[0_0_30px_rgba(0,217,255,0.6)]"
                        initial={{ scale: 2.2, opacity: 0, rotate: -8 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        exit={{ scale: 0.4, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 16 }}
                      >
                        {countdown}
                      </motion.span>
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Rotating status message */}
              <div className="h-6 overflow-hidden text-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={statusText}
                    className="text-xs tracking-wider text-[#7fd8ee] sm:text-sm"
                    initial={{ y: 14, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -14, opacity: 0, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.3 }}
                  >
                    {statusText}
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Cyan flash on exit */}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-30 bg-[#00d9ff]"
              initial={{ opacity: 0 }}
              exit={{
                opacity: [0, 0.85, 0],
                transition: { duration: 0.6, delay: 0.1, times: [0, 0.25, 1] },
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LoadingAnimation;
