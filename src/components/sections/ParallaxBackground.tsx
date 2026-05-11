import { motion, MotionValue, useTransform } from "framer-motion"

interface ParallaxBackgroundProps {
  image: string;
  alt: string;
  relativeProgress: MotionValue<number>;
  isMobile?: boolean;
}

export default function ParallaxBackground({ image, alt, relativeProgress, isMobile }: ParallaxBackgroundProps) {
  // Parallax translation based on relative progress
  // -1 (entering from below) -> moves slightly up (-10%)
  // 0 (centered) -> 0%
  // 1 (leaving to above) -> moves slightly down (10%)
  const y = useTransform(relativeProgress, [-1, 0, 1], ["-10%", "0%", "10%"])

  return (
    <motion.div
      style={isMobile ? {} : { y }}
      className={isMobile ? "absolute inset-0 w-full h-full top-0 z-0" : "absolute inset-0 w-full h-[120%] -top-[10%] z-0"}
    >
      <img
        src={image}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover grayscale brightness-50"
      />
    </motion.div>
  )
}
