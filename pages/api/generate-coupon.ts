import { MongoClient } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'




export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { userId } = req.query

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' })
    }

    try {
      const client = new MongoClient(process.env.MONGO_URL  || "")
      const db = client.db('test')
      const coupons = db.collection('coupons')

      // Check if the user already has a coupon
      const existingCoupon = await coupons.findOne({ user_id: userId })
      if (existingCoupon) {
        return res.json({ coupon: existingCoupon.code }) // User already has a coupon
      }

      // Find an available (unused) coupon
      const availableCoupon = await coupons.findOneAndUpdate(
        { is_used: false },
        { $set: { is_used: true, user_id: userId } },
        { returnDocument: 'after' }
      )
      console.log(availableCoupon)
      if (!availableCoupon?.value) {
        return res.status(400).json({ message: 'No coupons available' })
      }

      res.json({ coupon: availableCoupon.value.code })
    } catch (error) {
      console.error('Error generating coupon:', error)
      res.status(500).json({ error: 'Failed to generate coupon' })
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' })
  }
}