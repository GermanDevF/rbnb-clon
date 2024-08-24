import { rooms } from "./data";
import room from "../backend/models/room";
import mongoose from "mongoose";

const seedRooms = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/rbnb");

    await room.deleteMany();
    console.log("Rooms are deleted");

    await room.insertMany(rooms);
    console.log("All Rooms are added");

    console.log("Data Import Success");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit();
  }
};

seedRooms();
