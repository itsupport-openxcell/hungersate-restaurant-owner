"use client"

import { AlertTriangle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DeleteConfirmationDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  bankName: string
}

export default function DeleteConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  bankName,
}: DeleteConfirmationDialogProps) {
  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose} />

      {/* Dialog */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md bg-white">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-red-500" />
                Delete Bank Account
              </CardTitle>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-gray-600">
              <p className="mb-2">Are you sure you want to delete this bank account?</p>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="font-semibold text-gray-900">{bankName}</p>
              </div>
              <p className="mt-2 text-sm text-red-600">
                This action cannot be undone. All associated payment information will be permanently removed.
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                onClick={onClose}
                variant="outline"
                className="flex-1 h-12 border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button onClick={onConfirm} className="flex-1 h-12 bg-red-500 hover:bg-red-600 text-white">
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
