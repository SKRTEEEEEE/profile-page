"use client"

import { testPopulateUC } from "@/core/application/usecases/entities/project"
import { Button } from "../ui/button"

export function TestAction () {
  return (
    <div>
      <h1>Test Action</h1>
      <Button onClick={async() => {
        console.log("Test Action")
        await testPopulateUC() 
        }}>Test Action</Button>
    </div>
  )
}