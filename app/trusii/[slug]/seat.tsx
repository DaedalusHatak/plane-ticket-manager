
import { useState } from 'react';

export default function Seat({ seat,setNewSeat }: {seat:SeatMongo,setNewSeat:Function}) {
	const [showSeat, setShowSeat] = useState<SeatMongo | null>();
	const name = seat.name ? seat.name : '';
	
	const initials = name.split(" ").map(e => e.charAt(0)).join("")
	return (
		<div className="relative flex origin-center text-white font-semibold">
			{ showSeat && showSeat.seatNumber !=="01D" && showSeat.seatNumber !=="01E" && showSeat.seatNumber !=="01F" ?   (
				<div className="absolute flex flex-row  rounded  bg-gradient-to-r from-[#073590] px-3 py-2 gap-5 items-center to-[#0d49c0] -translate-y-[120%]  left-1/2 transform  -translate-x-1/2 ">
					<div className="absolute inset-x-1/2 -bottom-[10px] -translate-x-1/2 border-x-[0.7rem] border-x-transparent border-t-[0.7rem] border-t-[#073590]"></div>
					<p className="text-[1.75rem] text-[#f1c933] font-bold leading-9">
						{ showSeat.seatNumber}
					</p>
					<p>{showSeat.price},00zł</p>
				</div>
			) : (
				''
			)}

			<button
				onMouseEnter={(e) => setShowSeat(seat)}
				onMouseLeave={(e) => setShowSeat(null)}
				onClick={(e) => setNewSeat(seat)}
				className={`h-8 w-8  ${seat.isTaken ? "bg-red-400" : ""}`}
			>{initials}</button>
		</div>
	);
}
