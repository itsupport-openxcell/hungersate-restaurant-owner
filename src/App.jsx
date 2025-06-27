import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import AdminLayout from './layouts/AdminLayout'
import Dashboard from './pages/Dashboard'
import MenuList from './pages/Menu/List'
import MenuForm from './pages/Menu/Form'
import CuisineList from './pages/Cuisine/List'
import CuisineForm from './pages/Cuisine/Form'
import RestaurantList from './pages/Restaurants/List'
import RestaurantForm from './pages/Restaurants/Form'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="menu" element={<MenuList />} />
          <Route path="menu/new" element={<MenuForm />} />
          <Route path="menu/edit/:id" element={<MenuForm />} />
          <Route path="cuisines" element={<CuisineList />} />
          <Route path="cuisines/new" element={<CuisineForm />} />
          <Route path="cuisines/edit/:id" element={<CuisineForm />} />
          <Route path="restaurants" element={<RestaurantList />} />
          <Route path="restaurants/new" element={<RestaurantForm />} />
          <Route path="restaurants/edit/:id" element={<RestaurantForm />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App