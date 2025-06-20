"use client"

import { useState } from "react"
import { ArrowLeft, Clock, Save, Copy, RotateCcw, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"

interface PickupManagementProps {
  isOpen: boolean
  onClose: () => void
}

interface DaySchedule {
  day: string
  isOpen: boolean
  openTime: string
  closeTime: string
}

export default function PickupManagement({ isOpen, onClose }: PickupManagementProps) {
  const [schedule, setSchedule] = useState<DaySchedule[]>([
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

  const handleToggleDay = (index: number) => {
    const newSchedule = [...schedule]
    newSchedule[index].isOpen = !newSchedule[index].isOpen
    setSchedule(newSchedule)
    setHasChanges(true)
  }

  const handleTimeChange = (index: number, field: "openTime" | "closeTime", value: string) => {
    const newSchedule = [...schedule]
    newSchedule[index][field] = value
    setSchedule(newSchedule)
    setHasChanges(true)
  }

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":")
    const hour = Number.parseInt(hours)
    const ampm = hour >= 12 ? "PM" : "AM"
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
    return `${displayHour.toString().padStart(2, "0")}:${minutes} ${ampm}`
  }

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log("Saving pickup schedule:", schedule)
    setHasChanges(false)
    setIsSaving(false)
    // Show success message
  }

  const copyFromPreviousDay = (index: number) => {
    if (index > 0) {
      const newSchedule = [...schedule]
      newSchedule[index].openTime = newSchedule[index - 1].openTime
      newSchedule[index].closeTime = newSchedule[index - 1].closeTime
      newSchedule[index].isOpen = newSchedule[index - 1].isOpen
      setSchedule(newSchedule)
      setHasChanges(true)
    }
  }

  const applyToAllDays = (dayIndex: number) => {
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

  if (!isOpen) return null

  return (
    <div className="fixed left-80 top-0 right-0 bottom-0 bg-white z-50 shadow-xl border-l border-gray-200 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 pt-12 flex-shrink-0 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
          </button>
          <h1 className="text-xl font-bold text-gray-800">🕒 Pickup Management</h1>
        </div>
      </div>

      {/* Summary Bar */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 border-b border-red-100 p-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 bg-white rounded-lg px-4 py-2 shadow-sm">
              <Calendar className="w-5 h-5 text-red-500" />
              <span className="text-sm font-semibold text-gray-700">{getOpenDaysCount()} of 7 days open</span>
            </div>
            {hasChanges && (
              <Badge
                variant="secondary"
                className="bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800 border-orange-200"
              >
                ⚠️ Unsaved Changes
              </Badge>
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

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <div className="mb-6 text-center">
            <p className="text-gray-600">Adjust your pickup schedule for each day</p>
          </div>

          <div className="space-y-4 pb-24">
            {schedule.map((daySchedule, index) => (
              <Card
                key={daySchedule.day}
                className="border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-200 bg-gradient-to-br from-white to-gray-50"
              >
                <CardHeader className="pb-3 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-3">
                      <span className="text-2xl">
                        {daySchedule.day === "Monday" && "📅"}
                        {daySchedule.day === "Tuesday" && "📋"}
                        {daySchedule.day === "Wednesday" && "📊"}
                        {daySchedule.day === "Thursday" && "📈"}
                        {daySchedule.day === "Friday" && "🎉"}
                        {daySchedule.day === "Saturday" && "🌟"}
                        {daySchedule.day === "Sunday" && "☀️"}
                      </span>
                      {daySchedule.day}
                      {daySchedule.day === "Sunday" && (
                        <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-800">
                          Weekend
                        </Badge>
                      )}
                      {(daySchedule.day === "Friday" || daySchedule.day === "Saturday") && (
                        <Badge
                          variant="secondary"
                          className="text-xs bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800"
                        >
                          Peak Hours
                        </Badge>
                      )}
                    </CardTitle>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-sm font-bold px-3 py-1 rounded-full ${daySchedule.isOpen
                            ? "text-green-700 bg-gradient-to-r from-green-100 to-emerald-100"
                            : "text-red-700 bg-gradient-to-r from-red-100 to-pink-100"
                            }`}
                        >
                          {daySchedule.isOpen ? "🟢 Open" : "🔴 Closed"}
                        </span>
                        <Switch
                          checked={daySchedule.isOpen}
                          onCheckedChange={() => handleToggleDay(index)}
                          className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-green-500 data-[state=checked]:to-emerald-500"
                        />
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Time Settings */}
                  {daySchedule.isOpen && (
                    <>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
                          <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                            🌅 Opening Time
                          </label>
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
                        </div>

                        <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-lg border border-orange-100">
                          <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                            🌅 Closing Time
                          </label>
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
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className="flex gap-3 pt-4">
                        {index > 0 && (
                          <Button
                            onClick={() => copyFromPreviousDay(index)}
                            variant="outline"
                            size="sm"
                            className="text-sm text-blue-600 border-blue-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all shadow-sm"
                          >
                            <Copy className="w-4 h-4 mr-2" />📋 Copy from {schedule[index - 1].day}
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
                  )}

                  {/* Closed Day Message */}
                  {!daySchedule.isOpen && (
                    <div className="text-center py-6 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl border-2 border-dashed border-gray-200">
                      <div className="text-4xl mb-2">😴</div>
                      <p className="text-gray-600 text-sm font-medium">Pickup is closed on {daySchedule.day}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed Save Button */}
      <div className="bg-gradient-to-r from-white to-gray-50 border-t border-gray-200 p-4 flex-shrink-0 shadow-lg">
        <Button
          onClick={handleSave}
          disabled={!hasChanges || isSaving}
          className="w-full h-16 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold text-lg rounded-xl flex items-center justify-center gap-3 disabled:opacity-50 shadow-lg transition-all"
        >
          {isSaving ? (
            <>
              <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />💾 Saving
              Schedule...
            </>
          ) : (
            <>
              <Save className="w-6 h-6" />💾 Save Schedule
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
