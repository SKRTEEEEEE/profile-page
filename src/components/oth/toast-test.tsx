"use client"

import { useToast } from "../hooks/use-toast"
import { Button } from "../ui/button"

export const ToastTest = () => {
  const { toast } = useToast()

  return (
    <Button
      onClick={() => {
        toast({
          title: "Scheduled: Catch up",
          description: "Friday, February 10, 2023 at 5:57 PM",
          duration: 5000,
          onSwipeEnd(event) {},
          className: "",
       
        })
      }}
    >
      Show Toast
    </Button>
  )
}
