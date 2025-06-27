import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Table from '../../components/Table'
import Button from '../../components/Button'
import Modal from '../../components/Modal'
import { restaurantService } from '../../services/restaurantService'

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, item: null })
  const navigate = useNavigate()
  
  useEffect(() => {
    loadRestaurants()
  }, [])
  
  const loadRestaurants = async () => {
    try {
      const data = await restaurantService.getAll()
      setRestaurants(data)
    } catch (error) {
      console.error('Error loading restaurants:', error)
    } finally {
      setLoading(false)
    }
  }
  
  const handleEdit = (item) => {
    navigate(`/restaurants/edit/${item.id}`)
  }
  
  const handleDelete = (item) => {
    setDeleteModal({ isOpen: true, item })
  }
  
  const confirmDelete = async () => {
    try {
      await restaurantService.delete(deleteModal.item.id)
      setRestaurants(restaurants.filter(item => item.id !== deleteModal.item.id))
      setDeleteModal({ isOpen: false, item: null })
    } catch (error) {
      console.error('Error deleting restaurant:', error)
    }
  }
  
  const columns = [
    { key: 'name', header: 'Restaurant Name' },
    { key: 'cuisine', header: 'Cuisine Type' },
    { key: 'location', header: 'Location' },
    { key: 'phone', header: 'Phone' },
    { 
      key: 'isActive', 
      header: 'Status',
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs italic ${
          value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {value ? 'Active' : 'Inactive'}
        </span>
      )
    }
  ]
  
  if (loading) {
    return <div className="text-center py-8 italic">Loading...</div>
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 italic">Restaurant Management</h1>
          <p className="text-gray-600 italic">Manage restaurant listings</p>
        </div>
        <Link to="/restaurants/new">
          <Button>Add New Restaurant</Button>
        </Link>
      </div>
      
      <Table
        columns={columns}
        data={restaurants}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      
      <Modal.Confirm
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, item: null })}
        onConfirm={confirmDelete}
        title="Delete Restaurant"
        message={`Are you sure you want to delete "${deleteModal.item?.name}"? This action cannot be undone.`}
      />
    </div>
  )
}

export default RestaurantList