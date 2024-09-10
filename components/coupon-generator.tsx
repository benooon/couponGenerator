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
      showNotification('קוד הקופון הועתק ללוח!')
    }
  }

  const showNotification = (message: string) => {
    setNotification({ message, visible: true })
    setTimeout(() => {
      setNotification({ message: '', visible: false })
    }, 3000)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-light_gray dark:bg-gray-900">
      <Card className="w-full max-w-md relative border border-gray-300">
        <CardHeader>
          <CardTitle>מחולל קופונים</CardTitle>
          <CardDescription>לחץ על הכפתור כדי לייצר קוד קופון.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={generateCouponCode} 
            className="w-full bg_color_green text-white"
          >
            ייצר קוד קופון
            <RefreshCw className="ml-2 h-4 w-4" />
          </Button>
          {couponCode && (
            <div className="flex space-x-2">
              <Input 
                value={couponCode} 
                readOnly 
                className="font-mono bg-gray-200 text-gray-800"
              />
              <Button 
                onClick={copyCouponCode} 
                variant="outline"
                size="icon"
                className="border-gray-300 text-gray-800 hover:bg-gray-100"
              >
                <Copy className="h-4 w-4" />
                <span className="sr-only">העתק קוד קופון</span>
              </Button>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            השתמש בקוד זה בקופה לקבלת הנחה מיוחדת!
          </p>
        </CardFooter>
        {notification.visible && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg_color_green text-white px-4 py-2 rounded shadow-lg transition-opacity duration-300">
            {notification.message}
          </div>
        )}
      </Card>
    </div>
  )
}
