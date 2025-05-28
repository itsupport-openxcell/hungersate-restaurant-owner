"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Layout from "@/components/Layout"
import { Calendar, Clock, Plus, Trash2, AlertCircle } from "lucide-react"

// Mock availability data
const mockAvailability = {
  isOpen: true,
  weeklySchedule: {
    monday: { isOpen: true, openTime: "09:00", closeTime: "22:00" },
    tuesday: { isOpen: true, openTime: "09:00", closeTime: "22:00" },
    wednesday: { isOpen: true, openTime: "09:00", closeTime: "22:00" },
    thursday: { isOpen: true, openTime: "09:00", closeTime: "22:00" },
    friday: { isOpen: true, openTime: "09:00", closeTime: "23:00" },
    saturday: { isOpen: true, openTime: "10:00", closeTime: "23:00" },
    sunday: { isOpen: true, openTime: "10:00", closeTime: "21:00" },
  },
  specialDates: [
    {
      id: "1",
      date: "2024-12-25",
      type: "closed",
      reason: "Christmas Day",
    },
    {
      id: "2",
      date: "2024-12-31",
      type: "special",
      openTime: "18:00",
      closeTime: "02:00",
      reason: "New Year's Eve - Extended Hours",
    },
    {
      id: "3",
      date: "2024-01-26",
      type: "closed",
      reason: "Republic Day",
    },
  ],
  timeSlots: [
    { id: "1", name: "Breakfast", startTime: "09:00", endTime: "11:00", isActive: true },
    { id: "2", name: "Lunch", startTime: "12:00", endTime: "15:00", isActive: true },
    { id: "3", name: "Evening Snacks", startTime: "16:00", endTime: "18:00", isActive: true },
    { id: "4", name: "Dinner", startTime: "19:00", endTime: "22:00", isActive: true },
  ],
}

export default function AvailabilityManagement() {
  const [availability, setAvailability] = useState(mockAvailability)
  const [newSpecialDate, setNewSpecialDate] = useState({
    date: "",
    type: "closed",
    openTime: "",
    closeTime: "",
    reason: "",
  })
  const [newTimeSlot, setNewTimeSlot] = useState({
    name: "",
    startTime: "",
    endTime: "",
  })

  const days = [
    { key: "monday", label: "Monday" },
    { key: "tuesday", label: "Tuesday" },
    { key: "wednesday", label: "Wednesday" },
    { key: "thursday", label: "Thursday" },
    { key: "friday", label: "Friday" },
    { key: "saturday", label: "Saturday" },
    { key: "sunday", label: "Sunday" },
  ]

  const toggleRestaurantStatus = () => {
    setAvailability((prev) => ({
      ...prev,
      isOpen: !prev.isOpen,
    }))
  }

  const updateDaySchedule = (day: string, field: string, value: any) => {
    setAvailability((prev) => ({
      ...prev,
      weeklySchedule: {
        ...prev.weeklySchedule,
        [day]: {
          ...prev.weeklySchedule[day as keyof typeof prev.weeklySchedule],
          [field]: value,
        },
      },
    }))
  }

  const addSpecialDate = () => {
    if (!newSpecialDate.date || !newSpecialDate.reason) return

    const specialDate = {
      id: Date.now().toString(),
      ...newSpecialDate,
    }

    setAvailability((prev) => ({
      ...prev,
      specialDates: [...prev.specialDates, specialDate],
    }))

    setNewSpecialDate({
      date: "",
      type: "closed",
      openTime: "",
      closeTime: "",
      reason: "",
    })
  }

  const removeSpecialDate = (id: string) => {
    setAvailability((prev) => ({
      ...prev,
      specialDates: prev.specialDates.filter((date) => date.id !== id),
    }))
  }

  const addTimeSlot = () => {
    if (!newTimeSlot.name || !newTimeSlot.startTime || !newTimeSlot.endTime) return

    const timeSlot = {
      id: Date.now().toString(),
      ...newTimeSlot,
      isActive: true,
    }

    setAvailability((prev) => ({
      ...prev,
      timeSlots: [...prev.timeSlots, timeSlot],
    }))

    setNewTimeSlot({
      name: "",
      startTime: "",
      endTime: "",
    })
  }

  const toggleTimeSlot = (id: string) => {
    setAvailability((prev) => ({
      ...prev,
      timeSlots: prev.timeSlots.map((slot) => (slot.id === id ? { ...slot, isActive: !slot.isActive } : slot)),
    }))
  }

  const removeTimeSlot = (id: string) => {
    setAvailability((prev) => ({
      ...prev,
      timeSlots: prev.timeSlots.filter((slot) => slot.id !== id),
    }))
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Availability Management</h1>
          <div className="flex items-center space-x-4">
            <Badge variant={availability.isOpen ? "default" : "destructive"} className="text-lg px-3 py-1">
              {availability.isOpen ? "Open" : "Closed"}
            </Badge>
            <Button onClick={toggleRestaurantStatus} variant={availability.isOpen ? "destructive" : "default"}>
              {availability.isOpen ? "Close Restaurant" : "Open Restaurant"}
            </Button>
          </div>
        </div>

        {/* Restaurant Status Alert */}
        {!availability.isOpen && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 text-red-800">
                <AlertCircle className="w-5 h-5" />
                <p className="font-semibold">Restaurant is currently closed for orders</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Weekly Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Weekly Schedule</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {days.map((day) => {
                const schedule = availability.weeklySchedule[day.key as keyof typeof availability.weeklySchedule]
                return (
                  <div key={day.key} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-20">
                        <Label className="font-semibold">{day.label}</Label>
                      </div>
                      <Switch
                        checked={schedule.isOpen}
                        onCheckedChange={(checked) => updateDaySchedule(day.key, "isOpen", checked)}
                      />
                    </div>
                    {schedule.isOpen && (
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Label className="text-sm">Open:</Label>
                          <Input
                            type="time"
                            value={schedule.openTime}
                            onChange={(e) => updateDaySchedule(day.key, "openTime", e.target.value)}
                            className="w-32"
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Label className="text-sm">Close:</Label>
                          <Input
                            type="time"
                            value={schedule.closeTime}
                            onChange={(e) => updateDaySchedule(day.key, "closeTime", e.target.value)}
                            className="w-32"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Time Slots */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>Available Time Slots</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Add New Time Slot */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Add New Time Slot</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Input
                    placeholder="Slot name (e.g., Breakfast)"
                    value={newTimeSlot.name}
                    onChange={(e) => setNewTimeSlot((prev) => ({ ...prev, name: e.target.value }))}
                  />
                  <Input
                    type="time"
                    placeholder="Start time"
                    value={newTimeSlot.startTime}
                    onChange={(e) => setNewTimeSlot((prev) => ({ ...prev, startTime: e.target.value }))}
                  />
                  <Input
                    type="time"
                    placeholder="End time"
                    value={newTimeSlot.endTime}
                    onChange={(e) => setNewTimeSlot((prev) => ({ ...prev, endTime: e.target.value }))}
                  />
                  <Button onClick={addTimeSlot}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Slot
                  </Button>
                </div>
              </div>

              {/* Existing Time Slots */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availability.timeSlots.map((slot) => (
                  <div key={slot.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Switch checked={slot.isActive} onCheckedChange={() => toggleTimeSlot(slot.id)} />
                      <div>
                        <p className="font-semibold">{slot.name}</p>
                        <p className="text-sm text-gray-600">
                          {slot.startTime} - {slot.endTime}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => removeTimeSlot(slot.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Special Dates */}
        <Card>
          <CardHeader>
            <CardTitle>Special Dates & Holidays</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Add Special Date */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Add Special Date</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="specialDate">Date</Label>
                    <Input
                      id="specialDate"
                      type="date"
                      value={newSpecialDate.date}
                      onChange={(e) => setNewSpecialDate((prev) => ({ ...prev, date: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="specialType">Type</Label>
                    <Select
                      value={newSpecialDate.type}
                      onValueChange={(value) => setNewSpecialDate((prev) => ({ ...prev, type: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="closed">Closed</SelectItem>
                        <SelectItem value="special">Special Hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {newSpecialDate.type === "special" && (
                    <>
                      <div>
                        <Label htmlFor="specialOpenTime">Open Time</Label>
                        <Input
                          id="specialOpenTime"
                          type="time"
                          value={newSpecialDate.openTime}
                          onChange={(e) => setNewSpecialDate((prev) => ({ ...prev, openTime: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="specialCloseTime">Close Time</Label>
                        <Input
                          id="specialCloseTime"
                          type="time"
                          value={newSpecialDate.closeTime}
                          onChange={(e) => setNewSpecialDate((prev) => ({ ...prev, closeTime: e.target.value }))}
                        />
                      </div>
                    </>
                  )}
                  <div className="md:col-span-2">
                    <Label htmlFor="specialReason">Reason</Label>
                    <Textarea
                      id="specialReason"
                      placeholder="Reason for special date (e.g., Holiday, Event)"
                      value={newSpecialDate.reason}
                      onChange={(e) => setNewSpecialDate((prev) => ({ ...prev, reason: e.target.value }))}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Button onClick={addSpecialDate}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Special Date
                    </Button>
                  </div>
                </div>
              </div>

              {/* Existing Special Dates */}
              <div className="space-y-3">
                {availability.specialDates.map((specialDate) => (
                  <div key={specialDate.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <p className="font-semibold">{new Date(specialDate.date).toLocaleDateString()}</p>
                        <Badge variant={specialDate.type === "closed" ? "destructive" : "secondary"}>
                          {specialDate.type === "closed" ? "Closed" : "Special Hours"}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{specialDate.reason}</p>
                      {specialDate.type === "special" && (
                        <p className="text-sm text-blue-600">
                          Hours: {specialDate.openTime} - {specialDate.closeTime}
                        </p>
                      )}
                    </div>
                    <Button variant="outline" size="sm" onClick={() => removeSpecialDate(specialDate.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
