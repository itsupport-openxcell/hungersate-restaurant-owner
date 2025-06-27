import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Button from './Button'

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  totalItems,
  itemsPerPage
}) => {
  if (totalPages <= 1) return null

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems)

  return (
    <div className="flex items-center justify-between mt-6">
      <div className="text-sm text-gray-600">
        Showing {startIndex + 1}-{endIndex} of {totalItems} items
      </div>
      <div className="flex items-center gap-2">
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          variant="outline"
          size="sm"
          className="h-9 w-9 p-0"
          title="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <span className="text-sm font-medium px-3 py-1 bg-gray-100 rounded">
          {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          variant="outline"
          size="sm"
          className="h-9 w-9 p-0"
          title="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}

export default Pagination