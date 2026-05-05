import { motion, useScroll, useTransform } from 'framer-motion';
import type { ReactNode } from 'react';
import { useRef } from 'react';

// ── Hero Parallax ──
export function HeroParallax({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div ref={ref} style={{ y, opacity }} className={className}>
      {children}
    </motion.div>
  );
}

// ── Split Text Reveal ──
export function SplitTextReveal({ lines, stagger = 0.1 }: { lines: ReactNode[]; stagger?: number }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  return (
    <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
      {lines.map((line, i) => (
        <motion.div key={i} variants={item}>
          {line}
        </motion.div>
      ))}
    </motion.div>
  );
}

// ── Text Reveal ──
export function TextReveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

// ── Fade Up ──
export function FadeUp({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Clip Reveal ──
export function ClipReveal({ children, direction = 'bottom', className }: { children: ReactNode; direction?: 'left' | 'right' | 'top' | 'bottom'; className?: string }) {
  const getClipPath = () => {
    switch (direction) {
      case 'left': return 'inset(0 100% 0 0)';
      case 'right': return 'inset(0 0 0 100%)';
      case 'top': return 'inset(100% 0 0 0)';
      case 'bottom': return 'inset(0 0 100% 0)';
      default: return 'inset(0 0 100% 0)';
    }
  };

  return (
    <motion.div
      initial={{ clipPath: getClipPath() }}
      whileInView={{ clipPath: 'inset(0 0 0 0)' }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Parallax Section ──
export function ParallaxSection({ children, speed = 0.2, className }: { children: ReactNode; speed?: number; className?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className={`overflow-hidden ${className || ''}`}>
      <motion.div style={{ y, scale: 1.1 }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}

// ── Section Label ──
export function SectionLabel({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <FadeUp>
      <span className={`inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.4em] ${dark ? 'text-teal-400/70' : 'text-teal-600/70'}`}>
        <span className={`h-px w-6 ${dark ? 'bg-teal-400/30' : 'bg-teal-600/30'}`} />
        {children}
        <span className={`h-px w-6 ${dark ? 'bg-teal-400/30' : 'bg-teal-600/30'}`} />
      </span>
    </FadeUp>
  );
}

// ── Marquee ──
export function Marquee({ children, speed = 30, className }: { children: ReactNode; speed?: number; className?: string }) {
  return (
    <div className={`overflow-hidden flex w-full ${className || ''}`}>
      <motion.div
        className="flex min-w-full shrink-0 gap-4 pr-4"
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: speed,
        }}
      >
        {children}
      </motion.div>
      <motion.div
        className="flex min-w-full shrink-0 gap-4 pr-4"
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: speed,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ── Stagger Grid ──
export function StaggerGrid({ children, className, stagger = 0.1 }: { children: ReactNode; className?: string; stagger?: number }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  // Convert children to array to map over them
  const childArray = Array.isArray(children) ? children : [children];

  return (
    <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className={className}>
      {childArray.map((child, i) => (
        <motion.div key={i} variants={item}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
