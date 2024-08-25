import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('users'); 

  if (req.method === 'POST') {
    const { userName, password } = req.body;

    // Check if the user already exists
    const existingUser = await db.collection('userInfo').findOne({ userName });

    if (existingUser) {
      // User already exists
      res.status(200).json({ message: 'User already exists Please Login' });
    } else {
      // Insert new user data
      const result = await db.collection('userInfo').insertOne({ userName, password });
      res.status(201).json({...result,message: "User created successfully"});
    }
  } else if (req.method === 'GET') {
    // Retrieve user data
    const users = await db.collection('userInfo').find({}).toArray();
    res.status(200).json(users);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
