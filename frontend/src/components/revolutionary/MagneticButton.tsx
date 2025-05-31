import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'gradient' | 'glass';
  effect?: 'magnetic' | 'ripple' | 'glow' | 'morph';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  onClick,
  variant = 'primary',
  effect = 'magnetic',
  size = 'md'
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(springY, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distance = Math.sqrt(
      Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
    );

    if (distance < 100) {
      x.set((e.clientX - centerX) * 0.2);
      y.set((e.clientY - centerY) * 0.2);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-blue-600 to-purple-600 text-white';
      case 'secondary':
        return 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800';
      case 'gradient':
        return 'bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white';
      case 'glass':
        return 'glass text-gray-800';
      default:
        return 'bg-gradient-to-r from-blue-600 to-purple-600 text-white';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-4 py-2 text-sm';
      case 'md':
        return 'px-6 py-3 text-base';
      case 'lg':
        return 'px-8 py-4 text-lg';
      case 'xl':
        return 'px-10 py-5 text-xl';
      default:
        return 'px-6 py-3 text-base';
    }
  };

  const getEffectVariants = () => {
    switch (effect) {
      case 'magnetic':
        return {
          hover: {
            scale: 1.05,
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
            transition: { duration: 0.3 }
          },
          tap: { scale: 0.95 }
        };
      case 'ripple':
        return {
          hover: {
            scale: 1.1,
            boxShadow: [
              "0 0 0 0 rgba(59, 130, 246, 0.7)",
              "0 0 0 10px rgba(59, 130, 246, 0)",
              "0 0 0 20px rgba(59, 130, 246, 0)"
            ],
            transition: { duration: 0.6 }
          },
          tap: { scale: 0.9 }
        };
      case 'glow':
        return {
          hover: {
            boxShadow: "0 0 50px rgba(139, 92, 246, 0.8)",
            transition: { duration: 0.3 }
          },
          tap: { scale: 0.95 }
        };
      case 'morph':
        return {
          hover: {
            borderRadius: ["20px", "50px", "20px"],
            rotate: [0, 10, 0],
            transition: { duration: 0.8 }
          },
          tap: { scale: 0.9 }
        };
      default:
        return {
          hover: { scale: 1.05 },
          tap: { scale: 0.95 }
        };
    }
  };

  return (
    <motion.button
      ref={ref}
      className={`
        ${getVariantStyles()}
        ${getSizeStyles()}
        ${className}
        font-semibold rounded-xl border-0 cursor-pointer outline-none
        shadow-lg transition-all duration-300 ease-out
        relative overflow-hidden
      `}
      style={{
        x: effect === 'magnetic' ? springX : 0,
        y: effect === 'magnetic' ? springY : 0,
        rotateX: effect === 'magnetic' ? rotateX : 0,
        rotateY: effect === 'magnetic' ? rotateY : 0,
      }}
      variants={getEffectVariants()}
      whileHover="hover"
      whileTap="tap"
      onMouseMove={effect === 'magnetic' ? handleMouseMove : undefined}
      onMouseLeave={effect === 'magnetic' ? handleMouseLeave : undefined}
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.68, -0.55, 0.265, 1.55] }}
    >
      {/* Shine Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
        initial={{ x: '-100%', opacity: 0 }}
        whileHover={{ x: '100%', opacity: 0.3 }}
        transition={{ duration: 0.6 }}
      />
      
      {/* Content */}
      <span className="relative z-10 flex items-center justify-center">
        {children}
      </span>
    </motion.button>
  );
};

export default MagneticButton; 