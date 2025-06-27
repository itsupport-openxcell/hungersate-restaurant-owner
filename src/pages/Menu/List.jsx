import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Table from '../../components/Table'
import Button from '../../components/Button'
import Modal from '../../components/Modal'
import { menuService } from '../../services/menuService'

const MenuList = () => {
  const [menuItems, setMenuItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, item: null })
  const navigate = useNavigate()
  
  useEffect(() => {
    loadMenuItems()
  }, [])
  
  const loadMenuItems = async () => {
    try {
      const data = await menuService.getAll()
      setMenuItems(data)
    } catch (error) {
      console.error('Error loading menu items:', error)
    } finally {
      setLoading(false)
    }
  }
  
  const handleEdit = (item) => {
    navigate(`/menu/edit/${item.id}`)
  }
  
  const handleDelete = (item) => {
    setDeleteModal({ isOpen: true, item })
  }
  
  const confirmDelete = async () => {
    try {
      await menuService.delete(deleteModal.item.id)
      setMenuItems(menuItems.filter(item => item.id !== deleteModal.item.id))
      setDeleteModal({ isOpen: false, item: null })
    } catch (error) {
      console.error('Error deleting menu item:', error)
    }
  }
  
  const columns = [
    { key: 'name', header: 'Dish Name' },
    { 
      key: 'type', 
      header: 'Type',
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs italic ${
          value === 'veg' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {value === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}
        </span>
      )
    },
    { key: 'cuisine', header: 'Cuisine' },
    { 
      key: 'price', 
      header: 'Price',
      render: (value) => `$${value.toFixed(2)}`
    },
    { key: 'description', header: 'Description' }
  ]
  
  if (loading) {
    return <div className="text-center py-8 italic">Loading...</div>
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 italic">Menu Management</h1>
          <p className="text-gray-600 italic">Manage your restaurant menu items</p>
        </div>
        <Link to="/menu/new">
          <Button>Add New Dish</Button>
        </Link>
      </div>
      
      <Table
        columns={columns}
        data={menuItems}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      
      <Modal.Confirm
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, item: null })}
        onConfirm={confirmDelete}
        title="Delete Menu Item"
        message={`Are you sure you want to delete "${deleteModal.item?.name}"? This action cannot be undone.`}
      />
    </div>
  )
}

export default MenuList