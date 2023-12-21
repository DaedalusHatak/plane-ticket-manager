type Seat = {
    _id: ObjectId | string;
    seatNumber:string;
    price:number;
    isTaken:boolean;
    name?:string;
    paid?:boolean;
}

type AvailableFlights = {
    plane: string;
    tickets: string;
  }

type Plane = {
    id: number;
    name:string;
    rows: number;
    columns: number;
}