// Mock data for menu items
const mockMenuItems = [
  {
    id: '1',
    name: 'Margherita Pizza',
    type: 'veg',
    cuisine: 'italian',
    price: 12.99,
    description: 'Classic pizza with tomato sauce, mozzarella, and fresh basil'
  },
  {
    id: '2',
    name: 'Chicken Tikka Masala',
    type: 'non-veg',
    cuisine: 'indian',
    price: 15.99,
    description: 'Tender chicken in a creamy tomato-based curry sauce'
  },
  {
    id: '3',
    name: 'Kung Pao Chicken',
    type: 'non-veg',
    cuisine: 'chinese',
    price: 13.99,
    description: 'Spicy stir-fried chicken with peanuts and vegetables'
  },
  {
    id: '4',
    name: 'Vegetable Pad Thai',
    type: 'veg',
    cuisine: 'thai',
    price: 11.99,
    description: 'Stir-fried rice noodles with vegetables and tamarind sauce'
  }
]

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const menuService = {
  async getAll() {
    await delay(500)
    return [...mockMenuItems]
  },

  async getById(id) {
    await delay(300)
    const item = mockMenuItems.find(item => item.id === id)
    if (!item) {
      throw new Error('Menu item not found')
    }
    return { ...item }
  },

  async create(data) {
    await delay(800)
    const newItem = {
      ...data,
      id: Date.now().toString(),
      price: parseFloat(data.price)
    }
    mockMenuItems.push(newItem)
    return newItem
  },

  async update(id, data) {
    await delay(800)
    const index = mockMenuItems.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error('Menu item not found')
    }
    mockMenuItems[index] = {
      ...mockMenuItems[index],
      ...data,
      price: parseFloat(data.price)
    }
    return mockMenuItems[index]
  },

  async delete(id) {
    await delay(500)
    const index = mockMenuItems.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error('Menu item not found')
    }
    mockMenuItems.splice(index, 1)
    return true
  }
}