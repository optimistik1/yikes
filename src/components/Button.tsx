import React, { ReactNode } from 'react';

type ButtonSize = 'small' | 'medium' | 'large';
type ButtonColor = 'primary' | 'secondary' | 'danger' | 'accent';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  color?: ButtonColor;
  title: string;
  icon?: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  size = 'medium', 
  color = 'primary', 
  title, 
  icon,
  className = '',
  ...props 
}) => {
  const sizeClasses = {
    small: 'text-sm py-1 px-3',
    medium: 'text-base py-2 px-4',
    large: 'text-lg py-3 px-6'
  };

  const colorClasses = {
    primary: 'bg-[#00FF00] hover:bg-[#00E600] text-black',
    secondary: 'bg-gray-700 hover:bg-gray-600 text-white',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
    accent: 'bg-[#00FF00]/10 text-[#00FF00] hover:bg-[#00FF00]/20'
  };

  return (
    <button
      className={`rounded-lg font-medium transition-all flex items-center justify-center ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {title}
    </button>
  );
};