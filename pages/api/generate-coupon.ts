import { MongoClient } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'

let cachedClient: MongoClient | null = null;

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  const client = new MongoClient(process.env.MONGO_URL || "");
  await client.connect();  
  cachedClient = client;
  return client;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    try {
      const client = await connectToDatabase();
      const db = client.db('test');
      const coupons = db.collection('coupons');

      // Check if an unused coupon is available and update it
      const availableCoupon = await coupons.findOneAndUpdate(
        { is_used: false },
        { $set: { is_used: true } },
        { returnDocument: 'after' }
      );

      if (!availableCoupon?.value) {
        return res.status(400).json({ message: 'No coupons available' });
      }

      res.json({ coupon: availableCoupon?.value.code });
    } catch (error) {
      console.error('Error generating coupon:', error);
      res.status(500).json({ error: 'Failed to generate coupon' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
