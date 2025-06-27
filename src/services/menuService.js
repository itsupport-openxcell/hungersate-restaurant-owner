// Mock API service for menu management
const API_BASE_URL = '/api'

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Mock data
let menuItems = [
  {
    id: 1,
    name: "Paneer Tikka",
    description: "Marinated cottage cheese cubes grilled to perfection",
    price: 320,
    cuisine: "Indian",
    category: "Veg",
    status: "Available",
    image: "/images/paneer-tikka.png"
  },
  {
    id: 2,
    name: "Butter Chicken",
    description: "Creamy tomato-based curry with tender chicken",
    price: 450,
    cuisine: "Indian",
    category: "Non-Veg",
    status: "Available",
    image: "/images/food-placeholder.png"
  }
]

export const menuService = {
  // Get all menu items
  async getMenuItems() {
    await delay(500)
    return { data: menuItems, success: true }
  },

  // Get menu item by ID
  async getMenuItem(id) {
    await delay(300)
    const item = menuItems.find(item => item.id === parseInt(id))
    return { data: item, success: !!item }
  },

  // Create new menu item
  async createMenuItem(itemData) {
    await delay(800)
    const newItem = {
      id: Date.now(),
      ...itemData,
      createdAt: new Date().toISOString()
    }
    menuItems.push(newItem)
    return { data: newItem, success: true }
  },

  // Update menu item
  async updateMenuItem(id, itemData) {
    await delay(800)
    const index = menuItems.findIndex(item => item.id === parseInt(id))
    if (index !== -1) {
      menuItems[index] = { ...menuItems[index], ...itemData, updatedAt: new Date().toISOString() }
      return { data: menuItems[index], success: true }
    }
    return { data: null, success: false, error: 'Item not found' }
  },

  // Delete menu item
  async deleteMenuItem(id) {
    await delay(500)
    const index = menuItems.findIndex(item => item.id === parseInt(id))
    if (index !== -1) {
      const deletedItem = menuItems.splice(index, 1)[0]
      return { data: deletedItem, success: true }
    }
    return { data: null, success: false, error: 'Item not found' }
  },

  // Search menu items
  async searchMenuItems(query) {
    await delay(300)
    const filteredItems = menuItems.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      item.cuisine.toLowerCase().includes(query.toLowerCase())
    )
    return { data: filteredItems, success: true }
  }
}