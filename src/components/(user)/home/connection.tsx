'use client';

import { Button, TextField } from '@mui/material';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';

import { useRouter } from 'next/navigation';
import ShowList from '../../showList';

export default function FindConnection({ airports }: { airports: Airport[] }) {
	const destinationRef = useRef<HTMLInputElement>(null);
	const originRef = useRef<HTMLInputElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const [originLabel, setOriginLabel] = useState('Origin');
	const [destinationLabel, setDestinationLabel] = useState('Destination');
	const router = useRouter();
	const [origin, setOrigin] = useState('');
	const [showList, setShowList] = useState(false);
	const [destination, setDestination] = useState('');
	const [error, setError] = useState('');
	const [filterCountries, setFilterCountries] = useState<string>('');
	const [currentTarget, setCurrentTarget] = useState('');

	const handleClickOutside = (e: any) => {
		if (containerRef.current && !containerRef.current.contains(e.target)) {
			setShowList(false);
		}
	};

	const handleTargetChange = (e: any, newTarget: any) => {
		setShowList(true);
		setCurrentTarget(newTarget);
		setFilterCountries(e.target.value);
	};

	const handleSubmit = async (e: FormEvent) => {
		let isError = false;
		e.preventDefault();
		if (!origin && !destination) return;

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
			console.log('err');
			setError('Please select airports');
			setOrigin('');
			setOriginLabel('Please select arrival airport');
			isError = true;
		}

		if (destination !== 'All airports' && checkDestination.length !== 1) {
			setError('Please select airports');
			setDestination('');
			setDestinationLabel('Please select departure airport');
			isError = true;
		}

		if (!isError) {
			router.push(
				`/flights/search?origin=${
					origin === 'All airports' ? 'all-flights' : origin
				}&destination=${
					destination === 'All airports' ? 'all-flights' : destination
				}`
			);
		}
	};

	const handleAirportList = (e: any, setTarget: any) => {
		console.log(setTarget)
		if(setTarget === 'all-flights'){
			currentTarget === 'origin' ? setOrigin("All airports") : setDestination("All airports")
		return;
		}
		if (currentTarget === 'origin') {
			setOrigin(setTarget);
			setFilterCountries(setTarget);
			if (!destination) {
				setCurrentTarget('destination');
				if (destinationRef.current) {
					destinationRef.current.focus();
				}
				setFilterCountries('');
				return;
			}
		} else {
			setDestination(setTarget);
			setFilterCountries(setTarget);
			if (!origin) {
				setCurrentTarget('origin');
				if (originRef.current) {
					originRef.current.focus();
				}

				setFilterCountries('');
				return;
			}
		}
	};

	const handleChangeInput = (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		if (event.target.name === 'origin') setOrigin(event.target.value);
		else if (event.target.name === 'destination')
			setDestination(event.target.value);

		setFilterCountries(event.target.value);
	};

	return (
		<div className=" w-full max-w-4xl " ref={containerRef}>
			{error && <p className="text-center text-xl text-red-500">{error}</p>}
			<form className="grid grid-cols-2" onSubmit={handleSubmit}>
				<TextField
					onChange={(e) => handleChangeInput(e)}
					onFocus={(e) => handleTargetChange(e, 'origin')}
					autoComplete='off'
					value={origin}
					inputRef={originRef}
					id="origin"
					name="origin"
					label={originLabel}
					variant="filled"
				/>
				<TextField
					onChange={(e) => handleChangeInput(e)}
					onFocus={(e) => handleTargetChange(e, 'destination')}
					autoComplete='off'
					value={destination}
					inputRef={destinationRef}
					id="destination"
					name="destination"
					label={destinationLabel}
					variant="filled"
				/>
				<Button
					type="submit"
					className="col-span-2 mt-3 bg-blue-500 hover:bg-blue-900 hover:shadow-[0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)]"
					variant="contained"
					endIcon={<SendIcon />}
				>
					Search
				</Button>
			</form>
			{showList && (
				<ShowList
				allAirports={true}
					setFilterCountries={setFilterCountries}
					filterCountries={filterCountries}
					airports={airports}
					onClick={handleAirportList}
				/>
			)}
		</div>
	);
}
