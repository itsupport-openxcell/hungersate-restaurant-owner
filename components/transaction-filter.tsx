"use client"

import { useState } from "react"
import { Calendar, Filter, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TransactionFilterProps {
  isOpen: boolean
  onClose: () => void
  onApplyFilter: (filters: FilterOptions) => void
  currentFilters: FilterOptions
}

export interface FilterOptions {
  dateRange: {
    startDate: string
    endDate: string
  }
  amountRange: {
    minAmount: string
    maxAmount: string
  }
  company: string
}

export default function TransactionFilter({ isOpen, onClose, onApplyFilter, currentFilters }: TransactionFilterProps) {
  const [filters, setFilters] = useState<FilterOptions>(currentFilters)

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleDateRangeChange = (key: "startDate" | "endDate", value: string) => {
    setFilters((prev) => ({
      ...prev,
      dateRange: { ...prev.dateRange, [key]: value },
    }))
  }

  const handleAmountRangeChange = (key: "minAmount" | "maxAmount", value: string) => {
    setFilters((prev) => ({
      ...prev,
      amountRange: { ...prev.amountRange, [key]: value },
    }))
  }

  const handleApply = () => {
    onApplyFilter(filters)
    onClose()
  }

  const handleReset = () => {
    const resetFilters: FilterOptions = {
      dateRange: { startDate: "", endDate: "" },
      amountRange: { minAmount: "", maxAmount: "" },
      company: ""
    }
    setFilters(resetFilters)
    onApplyFilter(resetFilters)
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose} />

      {/* Filter Panel */}
      <div className="fixed right-0 top-0 h-full w-80 bg-white z-50 shadow-xl transform transition-transform duration-300 overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <h3 className="font-bold text-lg text-gray-900">Filter Transactions</h3>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="p-1">
              <X className="w-5 h-5 text-gray-600" />
            </Button>
          </div>

          {/* Filter Options */}
          <div className="space-y-6">
            {/* Date Range */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Date Range
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label htmlFor="startDate" className="text-xs text-gray-500">
                    From Date
                  </Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={filters.dateRange.startDate}
                    onChange={(e) => handleDateRangeChange("startDate", e.target.value)}
                    className="mt-1 h-10"
                  />
                </div>
                <div>
                  <Label htmlFor="endDate" className="text-xs text-gray-500">
                    To Date
                  </Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={filters.dateRange.endDate}
                    onChange={(e) => handleDateRangeChange("endDate", e.target.value)}
                    className="mt-1 h-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Amount Range */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-700">Amount Range</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label htmlFor="minAmount" className="text-xs text-gray-500">
                    Minimum Amount (₹)
                  </Label>
                  <Input
                    id="minAmount"
                    type="number"
                    placeholder="0"
                    value={filters.amountRange.minAmount}
                    onChange={(e) => handleAmountRangeChange("minAmount", e.target.value)}
                    className="mt-1 h-10"
                  />
                </div>
                <div>
                  <Label htmlFor="maxAmount" className="text-xs text-gray-500">
                    Maximum Amount (₹)
                  </Label>
                  <Input
                    id="maxAmount"
                    type="number"
                    placeholder="999999"
                    value={filters.amountRange.maxAmount}
                    onChange={(e) => handleAmountRangeChange("maxAmount", e.target.value)}
                    className="mt-1 h-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Company */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-700">Company</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <select
                    value={filters.company}
                    onChange={(e) => handleFilterChange("company", e.target.value)}
                    className="w-full h-10 px-3 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 appearance-none"
                  >
                    <option value="">All Companies</option>
                    <option value="Hungersate Pvt Ltd">Hungersate Pvt Ltd</option>
                    <option value="Spice Garden">Spice Garden</option>
                    <option value="Food Delivery Co">Food Delivery Co</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-8">
            <Button
              onClick={handleReset}
              variant="outline"
              className="flex-1 h-12 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Reset
            </Button>
            <Button onClick={handleApply} className="flex-1 h-12 bg-red-500 hover:bg-red-600 text-white">
              Apply Filter
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
