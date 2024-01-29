'use client';

import { Button, TextField} from '@mui/material';
import { ChangeEvent, FormEvent,useRef,useState } from 'react';
import SendIcon from '@mui/icons-material/Send';




import { useRouter } from 'next/navigation';
import ShowList from './showList';

export default function FindConnection({airports}:{airports:Airport[]}) {
	const destinationRef = useRef<HTMLInputElement>(null);
	const originRef = useRef<HTMLInputElement>(null);

	const [originLabel, setOriginLabel] = useState('Origin');
	const [destinationLabel, setDestinationLabel] = useState('Destination');

  const router = useRouter();
	const [origin, setOrigin] = useState("");
	const [showList, setShowList] = useState("")
	const [destination, setDestination] = useState("");
	const [error, setError] = useState('');
	const [filterCountries,setFilterCountries] = useState<string>("")

	const handleSubmit = async (e: FormEvent) => {
	e.preventDefault();
	if(origin && destination){

		const checkOrigin = airports.filter((airport:Airport) =>
		airport.airportname.toLowerCase() === origin.toLowerCase());
	  const checkDestination = airports.filter((airport:Airport) =>
		airport.airportname.toLowerCase() === destination.toLowerCase());

		if(checkOrigin.length === 1 && checkDestination.length === 1){
			router.push(`/flights/search?origin=${origin}&destination=${destination}`)
		}
		else{
setError("Please select airports")
if(checkDestination.length !== 1 && destinationRef.current){
	setDestination("")
	setDestinationLabel("Please select arrival airport")
}
else if(checkOrigin.length !== 1 && originRef.current){
	setOrigin("")
	setOriginLabel("Please select departure airport")
		}
	}

	};}
	

	const handleChangeInput = (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		if (event.target.id === 'origin') {
			setOrigin(event.target.value);
			setOriginLabel("Origin")
		}
		else if (event.target.id === 'destination') {
			setDestination(event.target.value);
			setDestinationLabel("Destination")}
		setFilterCountries(event.target.value)
	};

	const handleClick = (e:any,set?:string) =>{

		if(set){
			if (showList === 'origin') {
				setOrigin(set);
				if(!destination){
					setShowList("destination")
					if(destinationRef.current){ destinationRef.current.focus();}
				}

				
				setFilterCountries("")
				return;
			}
			else if (showList === 'destination'){
				setDestination(set);
				if(!origin){
					setShowList("origin")
				if(originRef.current){ originRef.current.focus();}
				}
				setFilterCountries("")
				return;
			}
		}
		else{
			if(e.target.id === 'origin'){
				setFilterCountries(origin)
			}
			else if(e.target.id === 'destination'){
				setFilterCountries(destination)
			}
		}
setShowList(e.target.id)
	}



	return (
		<div className=" w-full max-w-4xl ">
				{error && <p className='text-center text-xl text-red-500'>{error}</p> }
			<form className="grid grid-cols-2" onSubmit={handleSubmit}>
				<TextField
					onChange={(e) => handleChangeInput(e)}
					onClick={(e) => handleClick(e)}
					value={origin}
					inputRef={originRef}
					id="origin"
					label={originLabel}
					variant="filled"
				/>
				<TextField
					onChange={(e) => handleChangeInput(e)}
					onClick={(e) => handleClick(e)}
					value={destination}
					inputRef={destinationRef}
					id="destination"
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
			{showList &&  <ShowList  setFilterCountries={setFilterCountries} filterCountries={filterCountries}  airports={airports} onClick={handleClick}/>}
		
			
		</div>
	);
}
