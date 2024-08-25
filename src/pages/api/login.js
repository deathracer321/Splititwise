import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('users'); 

  if (req.method === 'POST') {
    const { userName, password } = req.body;

    // Check if the user already exists
    const existingUser = await db.collection('userInfo').findOne({ userName });

    if (!existingUser) {
      // User does not exist
      res.status(200).json({ message: 'Please Sign Up first or Check user name' });
    } else {
      // user exist and so validate the password
      if(existingUser.password === password){
        res.status(201).json({message : "loggedin",userInfo: existingUser});
      }else{
        res.status(201).json({message : "Incorrect username or password"});
      }
    }
  }else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
