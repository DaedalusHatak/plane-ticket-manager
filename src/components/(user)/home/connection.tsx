'use client';

import { Button, TextField } from '@mui/material';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';

import { useRouter } from 'next/navigation';
import ShowListDiv from '../../showListDiv';

export default function FindConnection({ airports }: { airports: Airport[] }) {


	const [error, setError] = useState('');
	const router = useRouter();





	const handleParentSubmit = async (origin:string,destination:string) => {
		let isError = {origin:false,destination:false};
		if (!origin && !destination) return {origin:true,destination:true};

		const checkOrigin =
			origin === 'All airports'
				? airports
				: airports.filter(
						(airport: Airport) =>
							airport.airportname.toLowerCase() === origin.toLowerCase()
				  );
		const checkDestination =
			destination === 'All airports'
				? airports
				: airports.filter(
						(airport: Airport) =>
							airport.airportname.toLowerCase() === destination.toLowerCase()
				  );

		if (origin !== 'All airports' && checkOrigin.length !== 1) {
			setError('Please select airports');
			isError.origin = true;
		}

		if (destination !== 'All airports' && checkDestination.length !== 1) {
			setError('Please select airports');
			isError.destination = true;
		}
		if(isError.origin || isError.destination) return isError;
		else  {
			router.push(
				`/flights/search?origin=${
					origin === 'All airports' ? 'all-flights' : origin
				}&destination=${
					destination === 'All airports' ? 'all-flights' : destination
				}`
			);
		}
	};

	

	return (
		<div className=" w-full max-w-6xl " >
			{error && <p className="text-center text-xl text-red-500">{error}</p>}
			<form className="flex" onSubmit={e=>e.preventDefault()}>
			<ShowListDiv showAll={true} onSubmit={handleParentSubmit} airports={airports}></ShowListDiv>
			</form>
		
		</div>
	);
}
