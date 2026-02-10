import mongoose from "mongoose";

const url = process.env.DB_URL;
const db_name = process.env.DB_NAME;

const connectDb = async () => {
  try{
    await mongoose.connect(String(url), { dbName: db_name })
    .then(() => { console.log(`MONGODB CONNECTED`) })
    .catch((e) => { console.error(`Mongo db connection error`, e) });
  }
  catch(error) {
    console.error('Error in connecting mongo db connection', error);
    return null;
  }
}

export default connectDb;