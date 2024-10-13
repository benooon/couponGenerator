import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../api/db';
import mongoose from 'mongoose';

// Define the schema for the coupon (optional, but recommended)
const CouponSchema = new mongoose.Schema({
  code: String,
  is_used: { type: Boolean, default: false },
  user_id: { type: String, default: null }
});

const Coupon = mongoose.models.Coupon || mongoose.model('Coupon', CouponSchema);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*'); // Set to '*' or your specific domain(s)
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    try {
      // Connect to MongoDB
      await connectToDatabase();

      // Find an available (unused) coupon and mark it as used
      const availableCoupon = await Coupon.findOneAndUpdate(
        { is_used: false },
        { is_used: true },
        { new: true } // Return the updated document
      );

      if (!availableCoupon) {
        return res.status(400).json({ message: 'No coupons available' });
      }

      res.json({ coupon: availableCoupon.code });
    } catch (error) {
      console.error('Error generating coupon:', error);
      res.status(500).json({ error: 'Failed to generate coupon' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
