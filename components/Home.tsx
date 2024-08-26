"use client";
import RoomItem from "./room/RoomItem";
import Link from "next/link";
import CustomPagination from "./layout/CustomPagination";
import { useSearchParams } from "next/navigation";

interface Props {
  data: {
    resPerPage: number;
    roomsCount: number;
    rooms: [];
    success: boolean;
    filteredRoomsCount: number;
  };
}

const Home = ({ data }: Props) => {
  const seartchParams = useSearchParams();
  const location = seartchParams.get("location");
  const { rooms, resPerPage, filteredRoomsCount } = data;

  return (
    <div>
      <section id="rooms" className="container mt-5">
        <h2 className="mb-3 ml-2 stays-heading">
          {location
            ? `${filteredRoomsCount} Room${
                filteredRoomsCount > 1 ? "s" : ""
              } found in ${location}`
            : "All Rooms"}
        </h2>
        <Link href="/search" className="ml-2 back-to-search">
          <i className="fa fa-arrow-left"></i> Back to Search
        </Link>
        <div className="row mt-4">
          {rooms.length === 0 ? (
            <div className="alert alert-danger mt-5 w-100 text-center">
              No Rooms
            </div>
          ) : (
            rooms.map((room: any) => <RoomItem key={room._id} room={room} />)
          )}
        </div>
      </section>
      <CustomPagination
        resPerPage={resPerPage}
        filteredRoomsCount={filteredRoomsCount}
      />
    </div>
  );
};

export default Home;
