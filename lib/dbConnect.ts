import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

const dbConnect = async () => {
  const connectionState = mongoose.connection.readyState;

  if (connectionState === 1) {
    console.log('Already connected');
  }

  if (connectionState === 2) {
    console.log('Connecting...');
  }

  try {
    await mongoose.connect(MONGODB_URI!, {
      dbName: 'inventory',
      bufferCommands: false,
    });
    console.log('Connected');
  } catch (error) {
    console.log('Error in connecting to database', error);
    throw new Error('Error connecting to database');
  }
};

export default dbConnect;
