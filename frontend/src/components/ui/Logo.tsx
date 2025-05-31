import React from 'react';
import { Gavel } from 'lucide-react';

interface LogoProps {
  variant?: 'default' | 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  variant = 'default', 
  size = 'md', 
  showText = true,
  className = '' 
}) => {
  const sizeClasses = {
    sm: {
      icon: 'w-6 h-6',
      container: 'w-8 h-8',
      text: 'text-lg'
    },
    md: {
      icon: 'w-6 h-6',
      container: 'w-10 h-10',
      text: 'text-xl'
    },
    lg: {
      icon: 'w-8 h-8',
      container: 'w-12 h-12',
      text: 'text-2xl'
    },
    xl: {
      icon: 'w-10 h-10',
      container: 'w-16 h-16',
      text: 'text-4xl'
    }
  };

  const variantClasses = {
    default: {
      container: 'bg-primary-600',
      icon: 'text-white',
      text: 'text-secondary-900'
    },
    light: {
      container: 'bg-white',
      icon: 'text-primary-600',
      text: 'text-secondary-900'
    },
    dark: {
      container: 'bg-secondary-900',
      icon: 'text-white',
      text: 'text-white'
    }
  };

  const sizes = sizeClasses[size];
  const variants = variantClasses[variant];

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Logo Icon */}
      <div className={`
        flex items-center justify-center 
        ${sizes.container} 
        ${variants.container} 
        rounded-xl 
        shadow-md 
        transition-transform 
        hover:scale-105 
        hover:shadow-lg
      `}>
        <Gavel className={`${sizes.icon} ${variants.icon}`} />
      </div>
      
      {/* Logo Text */}
      {showText && (
        <div className="flex flex-col">
          <span className={`
            ${sizes.text} 
            ${variants.text} 
            font-bold 
            leading-tight
            tracking-tight
          `}>
            AuctionHub
          </span>
          {size === 'xl' && (
            <span className={`
              text-sm 
              ${variant === 'dark' ? 'text-gray-300' : 'text-secondary-500'} 
              font-medium 
              tracking-wide
            `}>
              Premium Auctions
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Logo; 