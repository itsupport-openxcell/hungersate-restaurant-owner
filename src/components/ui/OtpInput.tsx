import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { cn } from '../../lib/utils';

interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

const OtpInput: React.FC<OtpInputProps> = ({
  length = 6,
  value,
  onChange,
  disabled = false,
  className,
}) => {
  const [otp, setOtp] = useState<string[]>(value.split('').slice(0, length));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Initialize refs array
  useEffect(() => {
    inputRefs.current = Array(length)
      .fill(null)
      .map((_, i) => inputRefs.current[i] || null);
  }, [length]);

  // Update local state when value prop changes
  useEffect(() => {
    const otpArray = value.split('').slice(0, length);
    setOtp(otpArray.concat(Array(length - otpArray.length).fill('')));
  }, [value, length]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = e.target.value;
    
    // Only accept single digit
    if (newValue.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = newValue;
    setOtp(newOtp);
    
    // Notify parent component
    onChange(newOtp.join(''));
    
    // Auto-focus next input if value is entered
    if (newValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    // Navigate left on Backspace if current field is empty
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    
    // Navigate left/right with arrow keys
    if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    }
    
    if (e.key === 'ArrowRight' && index < length - 1) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').slice(0, length);
    
    if (pastedData.match(/^\d+$/)) {
      const newOtp = pastedData.split('').concat(Array(length - pastedData.length).fill(''));
      setOtp(newOtp);
      onChange(newOtp.join(''));
      
      // Focus last filled input or the next empty one
      const focusIndex = Math.min(pastedData.length, length - 1);
      inputRefs.current[focusIndex]?.focus();
    }
  };

  return (
    <div className={cn('flex justify-center gap-2', className)}>
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={otp[index] || ''}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={index === 0 ? handlePaste : undefined}
          disabled={disabled}
          className={cn(
            'w-12 h-14 text-center text-xl rounded-md border border-gray-300',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
            'disabled:opacity-50'
          )}
        />
      ))}
    </div>
  );
};

export default OtpInput;