"use client"

import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { FilterOptions } from "./transaction-filter"

interface FilterSummaryProps {
  filters: FilterOptions
  onRemoveFilter: (filterKey: string, subKey?: string) => void
  onClearAll: () => void
}

export default function FilterSummary({ filters, onRemoveFilter, onClearAll }: FilterSummaryProps) {
  const getActiveFilters = () => {
    const active = []

    if (filters.dateRange.startDate || filters.dateRange.endDate) {
      const dateText =
        filters.dateRange.startDate && filters.dateRange.endDate
          ? `${filters.dateRange.startDate} to ${filters.dateRange.endDate}`
          : filters.dateRange.startDate
            ? `From ${filters.dateRange.startDate}`
            : `Until ${filters.dateRange.endDate}`
      active.push({ key: "dateRange", label: `Date: ${dateText}` })
    }

    if (filters.amountRange.minAmount || filters.amountRange.maxAmount) {
      const amountText =
        filters.amountRange.minAmount && filters.amountRange.maxAmount
          ? `₹${filters.amountRange.minAmount} - ₹${filters.amountRange.maxAmount}`
          : filters.amountRange.minAmount
            ? `Min ₹${filters.amountRange.minAmount}`
            : `Max ₹${filters.amountRange.maxAmount}`
      active.push({ key: "amountRange", label: `Amount: ${amountText}` })
    }

    if (filters.company) {
      active.push({ key: "company", label: `Company: ${filters.company}` })
    }

    if (filters.status) {
      active.push({ key: "status", label: `Status: ${filters.status}` })
    }

    if (filters.transactionType) {
      active.push({ key: "transactionType", label: `Type: ${filters.transactionType}` })
    }

    return active
  }

  const activeFilters = getActiveFilters()

  if (activeFilters.length === 0) return null

  return (
    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">Active Filters:</span>
        <button onClick={onClearAll} className="text-xs text-red-500 hover:text-red-700 font-medium">
          Clear All
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {activeFilters.map((filter, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="flex items-center gap-1 bg-red-100 text-red-700 hover:bg-red-200"
          >
            <span className="text-xs">{filter.label}</span>
            <button onClick={() => onRemoveFilter(filter.key)} className="ml-1 hover:bg-red-300 rounded-full p-0.5">
              <X className="w-3 h-3" />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  )
}
