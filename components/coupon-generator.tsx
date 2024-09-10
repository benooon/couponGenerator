'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Copy, RefreshCw } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function CouponGenerator() {
  const [couponCode, setCouponCode] = useState('')
  const { toast } = useToast()

  const generateCouponCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let result = ''
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    setCouponCode(result)
  }

  const copyCouponCode = async () => {
    if (couponCode) {
      await navigator.clipboard.writeText(couponCode)
      toast({
        title: "Copied!",
        description: "Coupon code copied to clipboard.",
      })
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Coupon Generator</CardTitle>
        <CardDescription>Click the button to generate a coupon code.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={generateCouponCode} 
          className="w-full"
        >
          Generate Coupon Code
          <RefreshCw className="ml-2 h-4 w-4" />
        </Button>
        {couponCode && (
          <div className="flex space-x-2">
            <Input 
              value={couponCode} 
              readOnly 
              className="font-mono"
            />
            <Button 
              onClick={copyCouponCode} 
              variant="outline"
              size="icon"
            >
              <Copy className="h-4 w-4" />
              <span className="sr-only">Copy coupon code</span>
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          Use this code at checkout for a special discount!
        </p>
      </CardFooter>
    </Card>
  )
}