import React, { useState } from 'react'
import { Clock, Save, Copy, RotateCcw, Calendar } from 'lucide-react'
import Button from '../../components/Button'
import { FormField, Select } from '../../components/Form'
import toast from 'react-hot-toast'

const PickupManagement = () => {
  const [schedule, setSchedule] = useState([
    { day: "Monday", isOpen: true, openTime: "09:00", closeTime: "21:00" },
    { day: "Tuesday", isOpen: true, openTime: "09:00", closeTime: "21:00" },
    { day: "Wednesday", isOpen: true, openTime: "09:00", closeTime: "21:00" },
    { day: "Thursday", isOpen: true, openTime: "09:00", closeTime: "21:00" },
    { day: "Friday", isOpen: true, openTime: "09:00", closeTime: "22:00" },
    { day: "Saturday", isOpen: true, openTime: "10:00", closeTime: "22:00" },
    { day: "Sunday", isOpen: false, openTime: "10:00", closeTime: "20:00" },
  ])

  const [hasChanges, setHasChanges] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleToggleDay = (index) => {
    const newSchedule = [...schedule]
    newSchedule[index].isOpen = !newSchedule[index].isOpen
    setSchedule(newSchedule)
    setHasChanges(true)
  }

  const handleTimeChange = (index, field, value) => {
    const newSchedule = [...schedule]
    newSchedule[index][field] = value
    setSchedule(newSchedule)
    setHasChanges(true)
  }

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":")
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? "PM" : "AM"
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
    return `${displayHour.toString().padStart(2, "0")}:${minutes} ${ampm}`
  }

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log("Saving pickup schedule:", schedule)
    setHasChanges(false)
    setIsSaving(false)
    toast.success('Pickup schedule saved successfully')
  }

  const copyFromPreviousDay = (index) => {
    if (index > 0) {
      const newSchedule = [...schedule]
      newSchedule[index].openTime = newSchedule[index - 1].openTime
      newSchedule[index].closeTime = newSchedule[index - 1].closeTime
      newSchedule[index].isOpen = newSchedule[index - 1].isOpen
      setSchedule(newSchedule)
      setHasChanges(true)
    }
  }

  const applyToAllDays = (dayIndex) => {
    const newSchedule = [...schedule]
    const sourceDay = newSchedule[dayIndex]
    newSchedule.forEach((day, index) => {
      if (index !== dayIndex) {
        day.openTime = sourceDay.openTime
        day.closeTime = sourceDay.closeTime
        day.isOpen = sourceDay.isOpen
      }
    })
    setSchedule(newSchedule)
    setHasChanges(true)
  }

  const resetToDefault = () => {
    const defaultSchedule = [
      { day: "Monday", isOpen: true, openTime: "09:00", closeTime: "21:00" },
      { day: "Tuesday", isOpen: true, openTime: "09:00", closeTime: "21:00" },
      { day: "Wednesday", isOpen: true, openTime: "09:00", closeTime: "21:00" },
      { day: "Thursday", isOpen: true, openTime: "09:00", closeTime: "21:00" },
      { day: "Friday", isOpen: true, openTime: "09:00", closeTime: "21:00" },
      { day: "Saturday", isOpen: true, openTime: "09:00", closeTime: "21:00" },
      { day: "Sunday", isOpen: false, openTime: "09:00", closeTime: "21:00" },
    ]
    setSchedule(defaultSchedule)
    setHasChanges(true)
  }

  const getOpenDaysCount = () => {
    return schedule.filter((day) => day.isOpen).length
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">🕒 Pickup Management</h1>
        <p className="text-gray-600">Manage your pickup schedule for each day</p>
      </div>

      {/* Summary Bar */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-100 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 bg-white rounded-lg px-4 py-2 shadow-sm">
              <Calendar className="w-5 h-5 text-red-500" />
              <span className="text-sm font-semibold text-gray-700">{getOpenDaysCount()} of 7 days open</span>
            </div>
            {hasChanges && (
              <span className="bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800 border border-orange-200 px-3 py-1 rounded-full text-sm font-medium">
                ⚠️ Unsaved Changes
              </span>
            )}
          </div>
          <Button
            onClick={resetToDefault}
            variant="outline"
            size="sm"
            className="text-gray-600 border-gray-300 hover:bg-white hover:shadow-md transition-all"
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            Reset
          </Button>
        </div>
      </div>

      {/* Schedule Cards */}
      <div className="space-y-4">
        {schedule.map((daySchedule, index) => (
          <div
            key={daySchedule.day}
            className="bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl overflow-hidden"
          >
            <div className="p-6 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">
                    {daySchedule.day === "Monday" && "📅"}
                    {daySchedule.day === "Tuesday" && "📋"}
                    {daySchedule.day === "Wednesday" && "📊"}
                    {daySchedule.day === "Thursday" && "📈"}
                    {daySchedule.day === "Friday" && "🎉"}
                    {daySchedule.day === "Saturday" && "🌟"}
                    {daySchedule.day === "Sunday" && "☀️"}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900">{daySchedule.day}</h3>
                  {daySchedule.day === "Sunday" && (
                    <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full font-medium">
                      Weekend
                    </span>
                  )}
                  {(daySchedule.day === "Friday" || daySchedule.day === "Saturday") && (
                    <span className="text-xs bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                      Peak Hours
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`text-sm font-bold px-3 py-1 rounded-full ${
                      daySchedule.isOpen
                        ? "text-green-700 bg-gradient-to-r from-green-100 to-emerald-100"
                        : "text-red-700 bg-gradient-to-r from-red-100 to-pink-100"
                    }`}
                  >
                    {daySchedule.isOpen ? "🟢 Open" : "🔴 Closed"}
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={daySchedule.isOpen}
                      onChange={() => handleToggleDay(index)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                  </label>
                </div>
              </div>
            </div>

            <div className="p-6">
              {daySchedule.isOpen ? (
                <>
                  <div className="grid grid-cols-2 gap-6 mb-4">
                    <FormField label="🌅 Opening Time">
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5" />
                        <input
                          type="time"
                          value={daySchedule.openTime}
                          onChange={(e) => handleTimeChange(index, "openTime", e.target.value)}
                          className="w-full pl-12 pr-4 py-4 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm font-medium"
                        />
                      </div>
                      <div className="text-sm text-blue-600 mt-2 font-bold bg-white px-3 py-1 rounded-full text-center">
                        {formatTime(daySchedule.openTime)}
                      </div>
                    </FormField>

                    <FormField label="🌅 Closing Time">
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500 w-5 h-5" />
                        <input
                          type="time"
                          value={daySchedule.closeTime}
                          onChange={(e) => handleTimeChange(index, "closeTime", e.target.value)}
                          className="w-full pl-12 pr-4 py-4 border-2 border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white shadow-sm font-medium"
                        />
                      </div>
                      <div className="text-sm text-orange-600 mt-2 font-bold bg-white px-3 py-1 rounded-full text-center">
                        {formatTime(daySchedule.closeTime)}
                      </div>
                    </FormField>
                  </div>

                  <div className="flex gap-3 pt-4">
                    {index > 0 && (
                      <Button
                        onClick={() => copyFromPreviousDay(index)}
                        variant="outline"
                        size="sm"
                        className="text-sm text-blue-600 border-blue-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all shadow-sm"
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        📋 Copy from {schedule[index - 1].day}
                      </Button>
                    )}
                    <Button
                      onClick={() => applyToAllDays(index)}
                      variant="outline"
                      size="sm"
                      className="text-sm text-purple-600 border-purple-200 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all shadow-sm"
                    >
                      🔄 Apply to All Days
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-6 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl border-2 border-dashed border-gray-200">
                  <div className="text-4xl mb-2">😴</div>
                  <p className="text-gray-600 text-sm font-medium">Pickup is closed on {daySchedule.day}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Save Button */}
      <div className="bg-gradient-to-r from-white to-gray-50 border border-gray-200 p-4 rounded-xl shadow-lg">
        <Button
          onClick={handleSave}
          disabled={!hasChanges || isSaving}
          className="w-full h-16 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold text-lg rounded-xl flex items-center justify-center gap-3 disabled:opacity-50 shadow-lg transition-all"
        >
          {isSaving ? (
            <>
              <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
              💾 Saving Schedule...
            </>
          ) : (
            <>
              <Save className="w-6 h-6" />
              💾 Save Schedule
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

export default PickupManagement