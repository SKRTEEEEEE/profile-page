"use client"

import { Button } from "@/components/ui/button"
import { testPopulateUC } from "@/core/application/usecases/entities/project"

export function TestAction () {
  return (
    <div>
      <h1>Test Action</h1>
      <Button onClick={async() => {
        console.info("Test Action")
        await testPopulateUC() 
        }}>Test Action</Button>
    </div>
  )
}