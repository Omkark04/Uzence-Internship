import React, { useState, useId } from 'react';

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  required?: boolean;
  invalid?: boolean;
  loading?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  showClear?: boolean;
  showPasswordToggle?: boolean;
  type?: string;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  value = '',
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  required = false,
  invalid = false,
  loading = false,
  variant = 'outlined',
  size = 'md',
  showClear = false,
  showPasswordToggle = false,
  type = 'text',
  className = '',
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const fieldId = useId();

  const hasError = invalid || !!errorMessage;
  const hasValue = value.length > 0;
  const isPasswordType = type === 'password';

  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-5 py-4 text-lg',
  }[size];

  // Variant classes
  const variantClasses = {
    filled: `bg-gray-50 dark:bg-gray-700 border ${
      hasError ? 'border-red-400' : 'border-gray-300 dark:border-gray-600 focus:border-blue-500'
    }`,
    outlined: `bg-white dark:bg-gray-800 border ${
      hasError ? 'border-red-400' : 'border-gray-300 dark:border-gray-600 focus:border-blue-500'
    }`,
    ghost: `bg-transparent border-b ${
      hasError ? 'border-red-400' : 'border-gray-300 dark:border-gray-500 focus:border-blue-500'
    }`,
  }[variant];

  const baseClasses = `w-full rounded-lg transition-all duration-200 
  focus:outline-none focus:ring-2 
  ${hasError ? 'focus:ring-red-200' : 'focus:ring-blue-200'}
  ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
  text-gray-900 dark:text-gray-100
  placeholder-gray-400 dark:placeholder-gray-500
  ${sizeClasses} ${variantClasses}`;

  return (
    <div className={`relative ${className}`}>
      {/* Label */}
      {label && (
        <label
          htmlFor={fieldId}
          className={`block mb-2 text-sm font-medium ${
            hasError
              ? 'text-red-600 dark:text-red-400'
              : disabled
              ? 'text-gray-400 dark:text-gray-500'
              : 'text-gray-700 dark:text-gray-300'
          }`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {/* Input field */}
        <input
          id={fieldId}
          type={isPasswordType && showPasswordToggle && showPassword ? 'text' : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled || loading}
          aria-invalid={hasError}
          aria-required={required}
          aria-busy={loading}
          className={`${baseClasses} ${showClear || showPasswordToggle ? 'pr-12' : ''}`}
        />

        {/* Loading Spinner */}
        {loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="h-4 w-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Action Buttons */}
        {!loading && (showClear || (showPasswordToggle && isPasswordType)) && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
            {showClear && hasValue && !disabled && (
              <button
                type="button"
                onClick={() =>
                  onChange?.({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>)
                }
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                aria-label="Clear input"
              >
                ✕
              </button>
            )}
            {showPasswordToggle && isPasswordType && !disabled && (
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Helper text / Error message */}
      {!hasError && helperText && (
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">{helperText}</p>
      )}
      {hasError && errorMessage && (
        <p className="mt-2 text-xs text-red-600 dark:text-red-400">{errorMessage}</p>
      )}
    </div>
  );
};

export default InputField;
