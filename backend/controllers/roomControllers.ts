import { NextRequest, NextResponse } from "next/server";
import Room from "@/backend/models/room";
import ErrorHandler from "../utils/errorHandler";
import { catchAsyncErrors } from "@/backend/middlewares/catchAsyncErrors";

// Get all rooms => /api/rooms
export const allRooms = async (req: NextRequest) => {
  const resPerPage = 8;
  const rooms = await Room.find();
  return NextResponse.json({
    success: true,
    rooms,
    resPerPage,
  });
};

// Create new room => /api/admin/rooms
export const newRoom = catchAsyncErrors(async (req: NextRequest) => {
  const body = await req.json();
  const room = await Room.create(body);
  return NextResponse.json({ success: true, room }, { status: 201 });
});

// Get room details => /api/rooms/:id
export const getRoomDetails = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    if (params.id.length !== 24) {
      throw new ErrorHandler("Room ID must be 24 characters long", 400);
    }

    const room = await Room.findById(params.id);
    if (!room) {
      throw new ErrorHandler("Room not found with this ID", 404);
    }
    return NextResponse.json({ success: true, room });
  }
);

// Update room details => /api/admin/rooms/:id
export const updateRoom = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    let room = await Room.findById(params.id);
    const body = await req.json();
    if (!room) {
      throw new ErrorHandler("Room not found with this ID", 404);
    }

    room = await Room.findByIdAndUpdate(params.id, body, { new: true });

    return NextResponse.json({ success: true, room });
  }
);

// Delete room => /api/admin/rooms/:id
export const deleteRoom = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const room = await Room.findById(params.id);
    if (!room) {
      throw new ErrorHandler("Room not found with this ID", 404);
    }

    // TODO - delete images associated with the room

    await room.deleteOne();

    return NextResponse.json({ success: true, message: "Room is deleted." });
  }
);
