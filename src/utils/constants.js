// Application constants

export const APP_CONFIG = {
  name: 'Restaurant Admin Panel',
  version: '1.0.0',
  description: 'Admin panel for restaurant management platform'
}

export const API_ENDPOINTS = {
  menu: '/api/menu',
  cuisines: '/api/cuisines',
  restaurants: '/api/restaurants',
  orders: '/api/orders',
  payments: '/api/payments',
  users: '/api/users',
  auth: '/api/auth'
}

export const ROUTES = {
  dashboard: '/dashboard',
  menu: {
    list: '/menu',
    add: '/menu/add',
    edit: (id) => `/menu/edit/${id}`
  },
  cuisine: {
    list: '/cuisine',
    add: '/cuisine/add',
    edit: (id) => `/cuisine/edit/${id}`
  },
  restaurants: {
    list: '/restaurants',
    add: '/restaurants/add',
    edit: (id) => `/restaurants/edit/${id}`
  },
  orders: '/orders',
  payments: '/payments',
  subUsers: '/sub-users',
  profile: '/profile',
  pickup: '/pickup',
  help: '/help',
  settings: '/settings'
}

export const STATUS_OPTIONS = {
  menu: ['Available', 'Unavailable'],
  cuisine: ['Active', 'Inactive'],
  restaurant: ['Active', 'Pending', 'Inactive'],
  order: ['Pending', 'Preparing', 'Ready', 'Delivered', 'Cancelled'],
  payment: ['Completed', 'Pending', 'Failed'],
  user: ['Active', 'Inactive']
}

export const CUISINE_TYPES = [
  'Indian',
  'Chinese',
  'Italian',
  'Mexican',
  'Thai',
  'Continental',
  'Japanese',
  'Korean',
  'Mediterranean',
  'American'
]

export const FOOD_CATEGORIES = [
  'Veg',
  'Non-Veg',
  'Vegan',
  'Jain',
  'Gluten-Free'
]

export const USER_ROLES = [
  'Super Admin',
  'Admin',
  'Manager',
  'Chef',
  'Cashier',
  'Waiter'
]

export const PAYMENT_METHODS = [
  'Cash',
  'Card',
  'UPI',
  'Wallet',
  'Net Banking'
]

export const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Puducherry'
]

export const TABLE_PAGE_SIZES = [10, 25, 50, 100]

export const DATE_FORMATS = {
  display: 'DD/MM/YYYY',
  api: 'YYYY-MM-DD',
  datetime: 'DD/MM/YYYY HH:mm'
}

export const FILE_UPLOAD = {
  maxSize: 10 * 1024 * 1024, // 10MB
  allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  allowedExtensions: ['.jpg', '.jpeg', '.png', '.gif', '.webp']
}

export const VALIDATION_RULES = {
  name: {
    minLength: 2,
    maxLength: 100
  },
  description: {
    minLength: 10,
    maxLength: 500
  },
  phone: {
    pattern: /^[\+]?[1-9][\d]{0,15}$/
  },
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  price: {
    min: 0,
    max: 10000
  }
}