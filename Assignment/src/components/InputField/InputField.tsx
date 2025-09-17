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
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const fieldId = useId();
  const inputId = fieldId;

  const hasError = invalid || !!errorMessage;
  const hasValue = value && value.length > 0;
  const isPasswordType = type === 'password';

  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-5 py-4 text-lg',
  }[size];

  // Variant classes
  const variantClasses = {
    filled: `bg-gray-50 border-gray-200 focus:bg-white ${
      hasError ? 'border-red-300' : 'focus:border-blue-500'
    }`,
    outlined: `bg-white border-gray-300 ${
      hasError ? 'border-red-300' : 'focus:border-blue-500'
    }`,
    ghost: `bg-transparent border-transparent ${
      hasError ? 'border-red-300' : 'focus:border-blue-500'
    }`,
  }[variant];

  const baseClasses = `w-full rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 ${
    hasError ? 'focus:ring-red-200' : 'focus:ring-blue-200'
  } ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`;

  return (
    <div className={`relative ${className}`}>
      {/* Label */}
      {label && (
        <label
          htmlFor={inputId}
          className={`block mb-2 text-sm font-medium ${
            hasError
              ? 'text-red-600'
              : disabled
              ? 'text-gray-400'
              : 'text-gray-700'
          }`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {/* Input field */}
        <input
          id={inputId}
          type={isPasswordType && showPasswordToggle && showPassword ? 'text' : type}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          disabled={disabled || loading}
          className={`${sizeClasses} ${baseClasses} ${variantClasses} ${
            showClear || showPasswordToggle ? 'pr-10' : ''
          }`}
        />

        {/* Loading spinner */}
        {loading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400"></div>
          </div>
        )}

        {/* Action buttons */}
        {!loading && (showClear || (showPasswordToggle && isPasswordType)) && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
            {showClear && hasValue && !disabled && (
              <button
                type="button"
                onClick={() =>
                  onChange?.({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>)
                }
                className="text-gray-400 hover:text-gray-600 transition-colors"
                disabled={disabled}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            {showPasswordToggle && isPasswordType && !disabled && (
              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="text-gray-400 hover:text-gray-600 transition-colors w-20 h-20"
                disabled={disabled}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {showPassword ? (
                    <>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </>
                  ) : (
                    <>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </>
                  )}
                </svg>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Helper text and error message */}
      {helperText && !hasError && (
        <p className="mt-2 text-xs text-gray-500">{helperText}</p>
      )}
      {hasError && (
        <p className="mt-2 text-xs text-red-600">{errorMessage}</p>
      )}
    </div>
  );
};

export default InputField;