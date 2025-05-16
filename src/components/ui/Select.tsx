import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
}

export const Select: React.FC<SelectProps> = ({ error, className = '', children, ...props }) => {
  return (
    <select
      className={`block w-full px-3 py-2 border ${
        error ? 'border-red-300' : 'border-gray-300'
      } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}; 