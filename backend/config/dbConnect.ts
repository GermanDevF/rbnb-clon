import mongoose from "mongoose";

const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) return;

  let DB_URI: string = "";

  if (process.env.NODE_ENV === "development")
    DB_URI = process.env.DB_LOCAL_URI!;
  if (process.env.NODE_ENV === "production") DB_URI = process.env.DB_URI!;

  try {
    await mongoose.connect(DB_URI);

    console.log("MongoDB Connection Successful");
  } catch (error) {
    console.log("MongoDB Connection Failed");
    process.exit(1);
  }
};

export default dbConnect;
