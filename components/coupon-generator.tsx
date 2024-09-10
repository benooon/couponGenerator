'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Copy, RefreshCw } from "lucide-react"

export default function CouponGenerator() {
  const [couponCode, setCouponCode] = useState('')
  const [notification, setNotification] = useState({ message: '', visible: false })

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
      showNotification('Coupon code copied to clipboard!')
    }
  }

  const showNotification = (message: string) => {
    setNotification({ message, visible: true })
    setTimeout(() => {
      setNotification({ message: '', visible: false })
    }, 3000)
  }

  return (
    <Card className="w-full max-w-md mx-auto relative">
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
      {notification.visible && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-300">
          {notification.message}
        </div>
      )}
    </Card>
  )
}