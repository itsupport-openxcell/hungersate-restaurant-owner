// Form validation utilities

export const validators = {
  // Email validation
  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!value) return 'Email is required'
    if (!emailRegex.test(value)) return 'Please enter a valid email address'
    return null
  },

  // Phone validation
  phone: (value) => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
    if (!value) return 'Phone number is required'
    if (!phoneRegex.test(value.replace(/\s/g, ''))) return 'Please enter a valid phone number'
    return null
  },

  // Required field validation
  required: (value, fieldName = 'This field') => {
    if (!value || (typeof value === 'string' && !value.trim())) {
      return `${fieldName} is required`
    }
    return null
  },

  // Minimum length validation
  minLength: (value, min, fieldName = 'This field') => {
    if (!value || value.length < min) {
      return `${fieldName} must be at least ${min} characters long`
    }
    return null
  },

  // Maximum length validation
  maxLength: (value, max, fieldName = 'This field') => {
    if (value && value.length > max) {
      return `${fieldName} must not exceed ${max} characters`
    }
    return null
  },

  // Number validation
  number: (value, fieldName = 'This field') => {
    if (value && isNaN(Number(value))) {
      return `${fieldName} must be a valid number`
    }
    return null
  },

  // Positive number validation
  positiveNumber: (value, fieldName = 'This field') => {
    if (value && (isNaN(Number(value)) || Number(value) <= 0)) {
      return `${fieldName} must be a positive number`
    }
    return null
  },

  // Price validation
  price: (value) => {
    if (!value) return 'Price is required'
    if (isNaN(Number(value)) || Number(value) <= 0) {
      return 'Price must be a positive number'
    }
    if (Number(value) > 10000) {
      return 'Price seems too high, please verify'
    }
    return null
  },

  // URL validation
  url: (value) => {
    if (!value) return null // Optional field
    try {
      new URL(value)
      return null
    } catch {
      return 'Please enter a valid URL'
    }
  },

  // Password validation
  password: (value) => {
    if (!value) return 'Password is required'
    if (value.length < 8) return 'Password must be at least 8 characters long'
    if (!/(?=.*[a-z])/.test(value)) return 'Password must contain at least one lowercase letter'
    if (!/(?=.*[A-Z])/.test(value)) return 'Password must contain at least one uppercase letter'
    if (!/(?=.*\d)/.test(value)) return 'Password must contain at least one number'
    return null
  },

  // Confirm password validation
  confirmPassword: (value, originalPassword) => {
    if (!value) return 'Please confirm your password'
    if (value !== originalPassword) return 'Passwords do not match'
    return null
  }
}

// Validate entire form object
export const validateForm = (formData, validationRules) => {
  const errors = {}
  
  Object.keys(validationRules).forEach(field => {
    const rules = validationRules[field]
    const value = formData[field]
    
    for (const rule of rules) {
      const error = rule(value)
      if (error) {
        errors[field] = error
        break // Stop at first error for this field
      }
    }
  })
  
  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
}