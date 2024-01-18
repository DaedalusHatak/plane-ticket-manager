import mongoose from "mongoose";

const flightSchema = new mongoose.Schema<AvailableFlights>({
  plane: { type: String, required: true },
  tickets: { type: String, required: true },
});

const FlightModel: mongoose.Model<AvailableFlights> = mongoose.models.AvailableFlights || mongoose.model('AvailableFlights', flightSchema,"AvailableFlights");

  
async function getFlights() {
    try {

        await mongoose.connect(process.env.DB, { dbName: "Flights" });
    const data = await FlightModel.find();
   
     await mongoose.disconnect();
      return { data};
    } catch (e) {
      console.log(e);
      throw new Error("Connection failed");
    }
  }

export default async function Home() {
const {data }= await getFlights();
console.log(data)
  return (
    <main className="flex text-black min-h-screen flex-col items-center  px-3">
      <h1 className="text-black pb-12 text-4xl">Select flight</h1>
 {data.map((el,index)=> (
<div  key={index}>{el.tickets}</div>
 ))}
    </main>
  );
}
