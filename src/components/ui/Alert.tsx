import React from 'react';
import { cn } from '../../lib/utils';
import { CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';

type AlertVariant = 'success' | 'info' | 'warning' | 'error';

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  message: string;
  className?: string;
  icon?: React.ReactNode;
}

const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  message,
  className,
  icon,
}) => {
  const variantStyles = {
    success: 'bg-success-50 border-success-500 text-success-800',
    info: 'bg-accent-50 border-accent-500 text-accent-800',
    warning: 'bg-warning-50 border-warning-500 text-warning-800',
    error: 'bg-error-50 border-error-500 text-error-800',
  };

  const getIcon = () => {
    if (icon) return icon;
    
    switch (variant) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-success-500" />;
      case 'info':
        return <Info className="w-5 h-5 text-accent-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-warning-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-error-500" />;
    }
  };

  return (
    <div
      className={cn(
        'rounded-md border p-4',
        variantStyles[variant],
        className
      )}
    >
      <div className="flex">
        <div className="flex-shrink-0">{getIcon()}</div>
        <div className="ml-3">
          {title && (
            <h3 className="text-sm font-medium">{title}</h3>
          )}
          <div className={cn('text-sm', title && 'mt-2')}>
            <p>{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alert;