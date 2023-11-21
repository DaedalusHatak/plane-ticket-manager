import Seat from './seat';

export default function Grid({ data }: any) {
	const chunkedArray: any = [];
	function splitData() {
		for (let i = 0; i < data.length; i += 6) {
			const chunk = data.slice(i, i + 6);
			chunkedArray.push(
				...chunk.slice(0, 3),
				Math.floor(i / 6) + 1,
				...chunk.slice(3)
			);
		}
	}
	splitData();
	return (
	<section className='relative  overflow-visible'>
<div className='overflow-y-hidden'>
<div className=" grid grid-cols-[repeat(7,minmax(0,min-content))] gap-3 border-plane ">
			{chunkedArray.map((element: any, index: number) => (
				<div
					className={`relative flex justify-center items-center mx-auto text-center col-span-1 ${
						typeof element !== 'number' &&
						element.seatNumber !== '01D' &&
						element.seatNumber !== '01E' &&
						element.seatNumber !== '01F'
							? 'bg-[#166bc8] h-8 w-8'
							: ''
					} `}
					key={index}
				>
					{typeof element === 'number' && <p>{element}</p>}
					{typeof element !== 'number' &&
						element.seatNumber !== '01D' &&
						element.seatNumber !== '01E' &&
						element.seatNumber !== '01F' && (
							<Seat seat={JSON.parse(JSON.stringify(element))}></Seat>
						)}
				</div>
			))}
		</div>
</div>
  </section>
	);
}
