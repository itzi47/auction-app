import React from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  className,
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className="space-y-1">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-secondary-700"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          'w-full px-3 py-2 border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0',
          error
            ? 'border-accent-300 focus:border-accent-500 focus:ring-accent-500'
            : 'border-secondary-300 focus:border-primary-500 focus:ring-primary-500',
          'disabled:bg-secondary-50 disabled:text-secondary-500 disabled:cursor-not-allowed',
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-accent-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-sm text-secondary-500">{helperText}</p>
      )}
    </div>
  );
};

export default Input; 