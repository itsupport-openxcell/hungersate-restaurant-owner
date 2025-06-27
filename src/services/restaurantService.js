// Mock data for restaurants
const mockRestaurants = [
  {
    id: '1',
    name: 'Bella Italia',
    cuisine: 'italian',
    location: 'Downtown, Main Street',
    phone: '+1 (555) 123-4567',
    email: 'info@bellaitalia.com',
    description: 'Authentic Italian restaurant with traditional recipes',
    isActive: true
  },
  {
    id: '2',
    name: 'Spice Palace',
    cuisine: 'indian',
    location: 'Uptown, Oak Avenue',
    phone: '+1 (555) 234-5678',
    email: 'contact@spicepalace.com',
    description: 'Traditional Indian cuisine with modern presentation',
    isActive: true
  },
  {
    id: '3',
    name: 'Dragon Garden',
    cuisine: 'chinese',
    location: 'Chinatown, Dragon Street',
    phone: '+1 (555) 345-6789',
    email: 'hello@dragongarden.com',
    description: 'Authentic Chinese dishes in a beautiful setting',
    isActive: false
  }
]

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const restaurantService = {
  async getAll() {
    await delay(500)
    return [...mockRestaurants]
  },

  async getById(id) {
    await delay(300)
    const item = mockRestaurants.find(item => item.id === id)
    if (!item) {
      throw new Error('Restaurant not found')
    }
    return { ...item }
  },

  async create(data) {
    await delay(800)
    const newItem = {
      ...data,
      id: Date.now().toString()
    }
    mockRestaurants.push(newItem)
    return newItem
  },

  async update(id, data) {
    await delay(800)
    const index = mockRestaurants.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error('Restaurant not found')
    }
    mockRestaurants[index] = {
      ...mockRestaurants[index],
      ...data
    }
    return mockRestaurants[index]
  },

  async delete(id) {
    await delay(500)
    const index = mockRestaurants.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error('Restaurant not found')
    }
    mockRestaurants.splice(index, 1)
    return true
  }
}