// components/ManageRootToast.tsx
"use client"

import { useEffect } from 'react'
import { useToast } from '../hooks/use-toast'

export function ToastTest({ show, data }: { show: boolean, data: {title: string, description?: string, duration?:number, [key: string]: any} }) {
  const { toast } = useToast()

  useEffect(() => {
    if (show) {
      toast({...data, duration: data.duration || 3000})
    }
  }, [show, toast, data])

  return null
}

