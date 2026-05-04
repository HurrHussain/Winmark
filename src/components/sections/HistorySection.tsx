import { lazy, Suspense } from "react"
import { motion, MotionValue, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

const ParallaxBackground = lazy(() => import("./ParallaxBackground"))

export interface HistoryChapter {
  id: string
  year: string
  title: string
  description: string
  bgImage: string
  bgImageAlt?: string
}

interface HistorySectionProps {
  chapter: HistoryChapter
  index: number
  springIndex: MotionValue<number>
  isActive: boolean
}

export function HistorySection({ chapter, index, springIndex, isActive }: HistorySectionProps) {
  
  // Calculate relative progress of this specific section (-1 = below, 0 = centered, 1 = above)
  const relativeProgress = useTransform(springIndex, (latest) => latest - index)

  // Liquid Text Transitions: Scale and slide into place based on relative progress
  // -1 to 0 (entering from below): scale 0.8 -> 1, y 150 -> 0
  // 0 to 1 (leaving to above): scale 1 -> 0.9, y 0 -> -150
  const textScale = useTransform(relativeProgress, [-1, 0, 1], [0.8, 1, 0.9])
  const textY = useTransform(relativeProgress, [-1, 0, 1], [150, 0, -150])

  return (
    <section 
      className={cn(
        "relative h-screen w-full flex items-center overflow-hidden flex-shrink-0",
        "bg-[var(--midnight-slate)]" 
      )}
      style={{
        maskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)"
      }}
    >
      {/* 1. Parallax Background Image */}
      <Suspense fallback={<div className="absolute inset-0 bg-slate-900 animate-pulse" />}>
        <ParallaxBackground 
          image={chapter.bgImage} 
          alt={chapter.bgImageAlt || chapter.title} 
          relativeProgress={relativeProgress} 
        />
      </Suspense>

      {/* 2. Liquid Ghost Year Text (Behind Content) */}
      <motion.div
        animate={{ opacity: isActive ? 0.1 : 0 }}
        transition={{ duration: 1.0, ease: "easeInOut" }}
        style={{ 
          scale: textScale,
          y: textY
        }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
      >
        <span 
          className="text-[12rem] md:text-[20rem] font-black text-white leading-none tracking-tighter"
        >
          {chapter.year}
        </span>
      </motion.div>

      {/* 3. Main Content Overlay */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          animate={{ 
            opacity: isActive ? 1 : 0, 
            y: isActive ? 0 : 50 
          }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="max-w-2xl bg-[#0b1120]/60 backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-3xl"
        >
          <span className="text-teal-400 font-bold text-xs uppercase tracking-widest mb-4 block">
            {chapter.year}
          </span>
          <h2 
            className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
          >
            {chapter.title}
          </h2>
          <div className="w-16 h-px bg-teal-500/50 mb-6" />
          <p className="text-slate-300 text-lg md:text-xl font-light leading-relaxed">
            {chapter.description}
          </p>
        </motion.div>
      </div>

    </section>
  )
}
