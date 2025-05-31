import React from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'glass' | 'gradient' | '3d' | 'magnetic';
  hoverEffect?: 'lift' | 'rotate' | 'scale' | 'glow';
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ 
  children, 
  className = '', 
  variant = 'glass',
  hoverEffect = 'lift' 
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  
  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ["17.5deg", "-17.5deg"]
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ["-17.5deg", "17.5deg"]
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'glass':
        return 'glass';
      case 'gradient':
        return 'bg-gradient-to-br from-purple-400 via-pink-500 to-red-500';
      case '3d':
        return 'card-3d bg-white shadow-2xl';
      case 'magnetic':
        return 'card-revolutionary';
      default:
        return 'glass';
    }
  };

  const getHoverVariants = () => {
    switch (hoverEffect) {
      case 'lift':
        return {
          hover: { y: -20, scale: 1.05, transition: { duration: 0.3 } }
        };
      case 'rotate':
        return {
          hover: { rotate: [0, 5, -5, 0], transition: { duration: 0.6 } }
        };
      case 'scale':
        return {
          hover: { scale: 1.1, transition: { duration: 0.3 } }
        };
      case 'glow':
        return {
          hover: { 
            boxShadow: "0 0 50px rgba(139, 92, 246, 0.6)",
            transition: { duration: 0.3 }
          }
        };
      default:
        return {
          hover: { y: -10, scale: 1.02, transition: { duration: 0.3 } }
        };
    }
  };

  return (
    <motion.div
      className={`${getVariantStyles()} ${className} cursor-pointer`}
      style={{
        rotateX: variant === '3d' ? rotateX : 0,
        rotateY: variant === '3d' ? rotateY : 0,
      }}
      variants={getHoverVariants()}
      whileHover="hover"
      whileTap={{ scale: 0.95 }}
      onMouseMove={variant === '3d' ? handleMouseMove : undefined}
      onMouseLeave={variant === '3d' ? handleMouseLeave : undefined}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.68, -0.55, 0.265, 1.55]
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard; 