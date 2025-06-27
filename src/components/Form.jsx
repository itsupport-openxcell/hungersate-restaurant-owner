import React from 'react'

const Form = ({ children, onSubmit, className = '' }) => {
  return (
    <form onSubmit={onSubmit} className={`space-y-6 ${className}`}>
      {children}
    </form>
  )
}

const FormField = ({ label, children, error, required = false }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 italic mb-2">
        {label}
        {required && <span className="text-[#FF0000] ml-1">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-sm text-[#FF0000] italic">{error}</p>
      )}
    </div>
  )
}

const Input = ({ type = 'text', placeholder, value, onChange, className = '', ...props }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FF0000] focus:border-[#FF0000] italic ${className}`}
      {...props}
    />
  )
}

const Select = ({ options, value, onChange, placeholder, className = '', ...props }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FF0000] focus:border-[#FF0000] italic ${className}`}
      {...props}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

const Textarea = ({ placeholder, value, onChange, rows = 4, className = '', ...props }) => {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
      className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FF0000] focus:border-[#FF0000] italic ${className}`}
      {...props}
    />
  )
}

Form.Field = FormField
Form.Input = Input
Form.Select = Select
Form.Textarea = Textarea

export default Form