'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Copy, RefreshCw } from "lucide-react"

export default function CouponGenerator() {
  const [couponCode, setCouponCode] = useState('')
  const [notification, setNotification] = useState({ message: '', visible: false })
  const [userHasGenerated, setUserHasGenerated] = useState(false)

  const generateCouponCode = async () => {
    try {
      const userId = 123 // Replace with actual user ID (from auth or session)
      const response = await fetch(`/api/generate-coupon?userId=${userId}`)
      const data = await response.json()
      if (response.ok) {
        setCouponCode(data.coupon)
        localStorage.setItem('generatedCoupon', data.coupon) // Optionally save locally
        setUserHasGenerated(true)
      } else {
        showNotification(data.message || 'שגיאה ביצירת הקופון.')
      }
    } catch (error) {
      showNotification('שגיאה ביצירת הקופון.')
    }
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
    <div dir="rtl" className="flex items-center justify-center min-h-screen bg-light_gray dark:bg-gray-900">
      <Card className="w-full max-w-md relative border border-gray-300">
        <CardHeader>
          <CardTitle>מחולל קופונים</CardTitle>
          <CardDescription>לחץ על הכפתור כדי לייצר קוד קופון.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={generateCouponCode}
            className="w-full bg_color_green text-white"
            disabled={userHasGenerated}
          >
            ייצר קוד קופון
            <RefreshCw className="mr-2 h-4 w-4" /> {/* Switch ml to mr for RTL */}
          </Button>
          {couponCode && (
            <div className="flex space-x-reverse space-x-2">
              <Input value={couponCode} readOnly className="font-mono bg-gray-200 text-gray-800" />
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
            100 ש&quot;ח הנחה - ממחיר מחירון לופה המלא ברכישת ספר תמונות לא כולל פורמט מיני לופה ופנורמי קטן • ייעודי לעוקבי לופה באינסטגרם • בתוקף למימוש להזמנות שישלחו מ- 13.10.24 עד 20.10.24 • ההטבה למימוש חד פעמי • דמי טיפול ומשלוח בהתאם למחירון המשלוחים באתר • לא יינתן החזר כספי להזמנות שיישלחו ללא קוד הקופון • יש להקליד את קוד הקופון במקום המיועד בקופה, ההנחה תוצג בעת ההזמנה בשלב התשלום • ללא כפל הטבות / הנחות / קופונים / מבצעים •
          </p>
        </CardFooter>
        {notification.visible && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg_color_green px-4 py-2 rounded shadow-lg duration-300">
            {notification.message}
          </div>
        )}
      </Card>
    </div>
  )
}
