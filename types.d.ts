type Seat = {
  id: ObjectId | string;
  is_taken: boolean;
  price: number;
  ticket_id:string;
 seat_number:string;
 name?:string;
 paid:boolean;
 uuid?:string;
};
type SeatMongo = {
  _id: ObjectId | string;
  seatNumber: string;
  price: number;
  isTaken: boolean;
  name?: string;
  paid?: boolean;
};
type AvailableFlights = {
  plane: string;
  tickets: string;
};

type Plane = {
  id: number;
  name: string;
  rows: number;
  columns: number;
};
type Flight = {
  id: number;
  tickets_name: string;
  origin: string;
  destination: string;
};
type Airport = {
  airportcode: string;
  airportname: string;
  country: string;
};
type ErrorLabels = {
  origin: boolean;
  destination: boolean;
};

type PassengerData = {
  date: Date | string;
  uuid: string;
  passenger_list: JsonData[];
  ticket_code:string;
};
type PassengerDetails = {
  firstName: string;
  lastName: string;
  seat?: string;
};
