import mongoose, { Document, Schema } from "mongoose";

export interface IImage extends Document {
  public_id: string;
  url: string;
}

export interface ILocation extends Document {
  type: string;
  coordinates: number[];
  formattedAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface IReview extends Document {
  user: mongoose.Schema.Types.ObjectId;
  rating: number;
  comment: string;
}

export interface IRoom extends Document {
  name: string;
  description: string;
  pricePerNight: number;
  address: string;
  location: ILocation;
  guestCapacity: number;
  numOfBeds: number;
  internet: boolean;
  breakfast: boolean;
  airConditioned: boolean;
  petsAllowed: boolean;
  roomCleaning: boolean;
  ratings: number;
  numOfReviews: number;
  images: IImage[];
  category: string;
  reviews: IReview[];
  user: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
}

const roomSchema: Schema<IRoom> = new Schema({
  name: {
    type: String,
    required: [true, "Please enter room name"],
    trim: true,
    maxLength: [200, "Room name cannot exceed 200 characters"],
  },
  description: {
    type: String,
    required: [true, "Please enter room name"],
  },
  pricePerNight: {
    type: Number,
    required: [true, "Please enter room price"],
    default: 0.0,
  },
  address: {
    type: String,
    required: [true, "Please enter room address"],
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },
    formattedAddress: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  guestCapacity: {
    type: Number,
    required: [true, "Please enter guest capacity"],
  },
  numOfBeds: {
    type: Number,
    required: [true, "Please enter number of beds"],
  },
  internet: {
    type: Boolean,
    default: false,
  },
  breakfast: {
    type: Boolean,
    default: false,
  },
  airConditioned: {
    type: Boolean,
    default: false,
  },
  petsAllowed: {
    type: Boolean,
    default: false,
  },
  roomCleaning: {
    type: Boolean,
    default: false,
  },
  ratings: {
    type: Number,
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please enter room category"],
    enum: {
      values: ["King", "Single", "Twins"],
      message: "Please select correct category for room",
    },
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Room ||
  mongoose.model<IRoom>("Room", roomSchema);
