type Seat = {
  _id: ObjectId | string;
  seat_number: string;
  price: number;
  is_taken: boolean;
  name?: string;
  paid?: boolean;
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
  airportcode:string;
  airportname:string;
  country:string;
  
}
type ErrorLabels = {
  origin:boolean; 
  destination:boolean
}