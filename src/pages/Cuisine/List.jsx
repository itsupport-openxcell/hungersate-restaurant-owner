import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Table from '../../components/Table'
import Button from '../../components/Button'
import Modal from '../../components/Modal'
import { cuisineService } from '../../services/cuisineService'

const CuisineList = () => {
  const [cuisines, setCuisines] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, item: null })
  const navigate = useNavigate()
  
  useEffect(() => {
    loadCuisines()
  }, [])
  
  const loadCuisines = async () => {
    try {
      const data = await cuisineService.getAll()
      setCuisines(data)
    } catch (error) {
      console.error('Error loading cuisines:', error)
    } finally {
      setLoading(false)
    }
  }
  
  const handleEdit = (item) => {
    navigate(`/cuisines/edit/${item.id}`)
  }
  
  const handleDelete = (item) => {
    setDeleteModal({ isOpen: true, item })
  }
  
  const confirmDelete = async () => {
    try {
      await cuisineService.delete(deleteModal.item.id)
      setCuisines(cuisines.filter(item => item.id !== deleteModal.item.id))
      setDeleteModal({ isOpen: false, item: null })
    } catch (error) {
      console.error('Error deleting cuisine:', error)
    }
  }
  
  const columns = [
    { key: 'name', header: 'Cuisine Name' },
    { key: 'description', header: 'Description' },
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
          <h1 className="text-2xl font-bold text-gray-900 italic">Cuisine Management</h1>
          <p className="text-gray-600 italic">Manage cuisine categories</p>
        </div>
        <Link to="/cuisines/new">
          <Button>Add New Cuisine</Button>
        </Link>
      </div>
      
      <Table
        columns={columns}
        data={cuisines}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      
      <Modal.Confirm
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, item: null })}
        onConfirm={confirmDelete}
        title="Delete Cuisine"
        message={`Are you sure you want to delete "${deleteModal.item?.name}"? This action cannot be undone.`}
      />
    </div>
  )
}

export default CuisineList