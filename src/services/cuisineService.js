// Mock data for cuisines
const mockCuisines = [
  {
    id: '1',
    name: 'Italian',
    description: 'Traditional Italian cuisine with pasta, pizza, and more',
    isActive: true
  },
  {
    id: '2',
    name: 'Chinese',
    description: 'Authentic Chinese dishes with bold flavors',
    isActive: true
  },
  {
    id: '3',
    name: 'Indian',
    description: 'Spicy and flavorful Indian curries and tandoor dishes',
    isActive: true
  },
  {
    id: '4',
    name: 'Mexican',
    description: 'Traditional Mexican food with fresh ingredients',
    isActive: false
  }
]

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const cuisineService = {
  async getAll() {
    await delay(500)
    return [...mockCuisines]
  },

  async getById(id) {
    await delay(300)
    const item = mockCuisines.find(item => item.id === id)
    if (!item) {
      throw new Error('Cuisine not found')
    }
    return { ...item }
  },

  async create(data) {
    await delay(800)
    const newItem = {
      ...data,
      id: Date.now().toString()
    }
    mockCuisines.push(newItem)
    return newItem
  },

  async update(id, data) {
    await delay(800)
    const index = mockCuisines.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error('Cuisine not found')
    }
    mockCuisines[index] = {
      ...mockCuisines[index],
      ...data
    }
    return mockCuisines[index]
  },

  async delete(id) {
    await delay(500)
    const index = mockCuisines.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error('Cuisine not found')
    }
    mockCuisines.splice(index, 1)
    return true
  }
}