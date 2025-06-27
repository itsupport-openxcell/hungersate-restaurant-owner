export const validateMenuItem = (data) => {
  const errors = {}
  
  if (!data.name || data.name.trim().length === 0) {
    errors.name = 'Dish name is required'
  }
  
  if (!data.type) {
    errors.type = 'Dish type is required'
  }
  
  if (!data.cuisine) {
    errors.cuisine = 'Cuisine is required'
  }
  
  if (!data.price || data.price <= 0) {
    errors.price = 'Price must be greater than 0'
  }
  
  return errors
}

export const validateCuisine = (data) => {
  const errors = {}
  
  if (!data.name || data.name.trim().length === 0) {
    errors.name = 'Cuisine name is required'
  }
  
  return errors
}

export const validateRestaurant = (data) => {
  const errors = {}
  
  if (!data.name || data.name.trim().length === 0) {
    errors.name = 'Restaurant name is required'
  }
  
  if (!data.cuisine) {
    errors.cuisine = 'Cuisine type is required'
  }
  
  if (!data.location || data.location.trim().length === 0) {
    errors.location = 'Location is required'
  }
  
  if (!data.phone || data.phone.trim().length === 0) {
    errors.phone = 'Phone number is required'
  }
  
  if (!data.email || data.email.trim().length === 0) {
    errors.email = 'Email is required'
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = 'Email format is invalid'
  }
  
  return errors
}