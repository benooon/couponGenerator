'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Copy, RefreshCw } from "lucide-react"
import { Download } from "lucide-react"; // Ensure this import is correct

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
  <Card className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg relative border border-gray-300 bg-white">
      <CardHeader className="text-center">
        <CardTitle>קופון סודי לעוקבים של לופה באינסטגרם</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          onClick={generateCouponCode}
          className="w-full bg_color_green text-black rounded-full py-2 px-4 text-sm"
          disabled={userHasGenerated}
        >
          לקבלת הקופון האישי
          <RefreshCw className="mr-2 h-4 w-4" />{/* Switch ml to mr for RTL */}
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
          <p className="text-sm text-muted-foreground">
          100 ש&quot;ח הנחה על ספרים באפליקציית לופה בטלפון - ממחיר מחירון לופה המלא ברכישת ספר תמונות לא כולל פורמט מיני לופה ופנורמי קטן • 
          ייעודי לעוקבי לופה באינסטגרם • בתוקף למימוש להזמנות שישלחו מ- 12.10.24 עד 20.10.24 • 
          ההטבה למימוש חד פעמי ללקוח אחד ולפריט אחד • משלוח בתשלום בהתאם למחירון המשלוחים באתר •
           יש להקליד את קוד הקופון במקום המיועד בקופה, ההנחה תוצג בעת ההזמנה בשלב התשלום • 
           לא יינתן החזר כספי להזמנות שיישלחו ללא קוד הקופון •
           זמני אספקה בהתאם למפורסם באתר  ובכפוף למצב הביטחוני 
          • אין כפל הטבות/ הנחות/ שוברים/ מבצעים •
        </p>
        </CardContent>
        <CardFooter>
          
        <div className="w-full flex justify-center">
            <a href="https://lupa.onelink.me/Lo3k/SecretInstagramCoupon2024" className="text-sky-500 hover:text-sky-600 flex items-center underline">
            להורדת האפליקציה 
            <Download className="mr-2 h-4 w-4" />
            
            </a>
        </div>

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
