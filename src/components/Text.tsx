import React, { ComponentType, HTMLAttributes } from 'react';

type TextSize = 'small' | 'medium' | 'large' | 'xlarge';
type TextColor = 'primary' | 'secondary' | 'accent' | 'warning' | 'error';

interface TextProps extends HTMLAttributes<HTMLElement> {
  size?: TextSize;
  color?: TextColor;
  children: React.ReactNode;
  className?: string;
  as?: ComponentType<any> | string;
}

export const Text: React.FC<TextProps> = ({ 
  size = 'medium', 
  color = 'primary', 
  children, 
  className = '',
  as: Component = 'p',
  ...props 
}) => {
  const sizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg md:text-xl',
    xlarge: 'text-xl md:text-2xl'
  };
  
  const colorClasses = {
    primary: 'text-white',
    secondary: 'text-gray-400',
    accent: 'text-[#00FF00]',
    warning: 'text-amber-400',
    error: 'text-red-400'
  };

  return (
    <Component 
      className={`${sizeClasses[size]} ${colorClasses[color]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Text;