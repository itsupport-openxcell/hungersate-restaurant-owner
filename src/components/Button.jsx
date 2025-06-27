import React from 'react'

const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  size = 'md', 
  disabled = false,
  className = '',
  ...props 
}) => {
  const baseClasses = 'italic font-medium rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variants = {
    primary: 'bg-[#FF0000] hover:bg-[#E60000] text-white focus:ring-[#FF0000] disabled:bg-gray-400',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500',
    danger: 'bg-[#FF0000] hover:bg-[#E60000] text-white focus:ring-[#FF0000]',
    outline: 'border-2 border-[#FF0000] text-[#FF0000] hover:bg-[#FF0000] hover:text-white focus:ring-[#FF0000]'
  }
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  }
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button