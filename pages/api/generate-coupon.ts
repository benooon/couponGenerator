import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

let cachedClient: MongoClient | null = null;

async function connectToDatabase() {
  if (cachedClient) {
    console.log("Using cached MongoDB client");
    return cachedClient;
  }

  console.log("Creating a new MongoDB client...");
  const client = new MongoClient(process.env.MONGO_URL || "");
  
  try {
    await client.connect();
    console.log("MongoDB connected successfully");
    cachedClient = client;
    return client;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Failed to connect to MongoDB");
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    console.log("Received GET request");

    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    const { userId } = req.query;
    if (!userId) {
      console.warn("User ID not provided");
      return res.status(400).json({ message: 'User ID is required' });
    }

    try {
      console.log("Connecting to database...");
      const client = await connectToDatabase();
      const db = client.db('test');
      const coupons = db.collection('coupons');

      console.log(`Looking for available coupons for userId: ${userId}`);
      
      // Check if an unused coupon is available and update it
      const availableCoupon = await coupons.findOneAndUpdate(
        { is_used: false },
        { $set: { is_used: true } },
        { returnDocument: 'after' }
      );

      if (!availableCoupon?.value) {
        console.log("No available coupons found");
        return res.status(400).json({ message: 'No coupons available' });
      }

      console.log("Coupon found and marked as used:", availableCoupon.value.code);
      res.json({ coupon: availableCoupon?.value.code });
    } catch (error) {
      console.error("Error generating coupon:", error);
      res.status(500).json({ error: 'Failed to generate coupon' });
    }
  } else {
    console.warn("Invalid request method:", req.method);
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
