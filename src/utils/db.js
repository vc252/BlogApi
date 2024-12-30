import mongoose from "mongoose";
const DB_NAME = 'blogApi'

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.DB_URL}/${DB_NAME}`);
    console.log(`MONGODB connected host: ${connectionInstance.connection.host}`);
  } catch (err) {
    console.log(err);
    console.error('MONGODB connection error!!!');
    process.exit(1);
  }
}

export default connectDB;