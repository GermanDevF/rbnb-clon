import { IRoom } from "@/backend/models/room";
import React from "react";

interface Props {
  room: IRoom;
}

const RoomFeatures = ({ room }: Props) => {
  const {
    guestCapacity,
    numOfBeds,
    breakfast,
    internet,
    airConditioned,
    roomCleaning,
    petsAllowed,
  } = room;

  const getCheck = (value: boolean) =>
    value ? "fa fa-check text-success" : "fa fa-times text-danger";

  return (
    <div className="features mt-5">
      <h3 className="mb-4">Features:</h3>
      <div className="room-feature">
        <i className="fa fa-cog fa-fw fa-users" aria-hidden="true"></i>
        <p>{guestCapacity} Guests</p>
      </div>
      <div className="room-feature">
        <i className="fa fa-cog fa-fw fa-bed" aria-hidden="true"></i>
        <p>{numOfBeds} Beds</p>
      </div>
      <div className="room-feature">
        <i className={getCheck(breakfast)} aria-hidden="true"></i>
        <p>Breakfast</p>
      </div>
      <div className="room-feature">
        <i className={getCheck(internet)} aria-hidden="true"></i>
        <p>Internet</p>
      </div>
      <div className="room-feature">
        <i className={getCheck(airConditioned)} aria-hidden="true"></i>
        <p>Air Conditioned</p>
      </div>
      <div className="room-feature">
        <i className={getCheck(petsAllowed)} aria-hidden="true"></i>
        <p>Pets Allowed</p>
      </div>
      <div className="room-feature">
        <i className={getCheck(roomCleaning)} aria-hidden="true"></i>
        <p>Room Cleaning</p>
      </div>
    </div>
  );
};

export default RoomFeatures;
