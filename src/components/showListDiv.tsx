"use client"
import { Box, Button, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import ShowList from "./showList";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
export default function ShowListDiv({airports,onSubmit,showAll}:any){
	const destinationRef = useRef<HTMLInputElement>(null);
	const originRef = useRef<HTMLInputElement>(null);
	const [originLabel, setOriginLabel] = useState('Origin');
	const [destinationLabel, setDestinationLabel] = useState('Destination');
	const containerRef = useRef<HTMLDivElement>(null);


    const [filterCountries, setFilterCountries] = useState<string>('');
	const [origin, setOrigin] = useState<string>('');
	const [showList, setShowList] = useState<boolean>(false);
	const [destination, setDestination] = useState<string>('');
	const [currentTarget,setCurrentTarget] = useState('')
	const [errorMessage, setErrorMessage] = useState<string>('');



	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);


	const handleClickOutside = (e: any) => {
		if (containerRef.current && !containerRef.current.contains(e.target)) {
		
			setShowList(false);
		}
	};

    const handleTargetChange = (e: any, newTarget: any) => {
		setShowList(true);
		setCurrentTarget(newTarget);
		
		setFilterCountries(e.target.value);
		newTarget === 'origin' ? setOriginLabel('Origin') : setDestinationLabel("Destination");
	};


	const handleAirportList = (e: any, setTarget: any) => {
		if (currentTarget === 'origin') {
			setOrigin(setTarget === 'all-flights' ? "All airports" : setTarget);
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
			setDestination(setTarget === 'all-flights' ? "All airports" : setTarget);
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
		
			if (event.target.id === 'origin') setOrigin(event.target.value);
			else if (event.target.id === 'destination') 	setDestination(event.target.value);

        setFilterCountries(event.target.value)
	
	};

const handleSubmit =  async (e:FormEvent)=>{

	setShowList(false);
	const isInvalid = await onSubmit(origin,destination);

	if(isInvalid){
		setOriginLabel(isInvalid.origin ? "Please select departure airport" :"Origin");
		setDestinationLabel(isInvalid.destination ? "Please select arrival airport" : "Destination");
		setOrigin(isInvalid.origin ? "" : origin);
		setDestination(isInvalid.destination ? "" : destination);
	}
}

    return(
        <Box sx={{width:'100%',display:'flex',flexDirection:'column'}} ref={containerRef}>
        <Box
		
						sx={{
							display: 'flex',
						}}
					>
						<TextField

							fullWidth
							inputRef={originRef}
							value={origin}
							onChange={(e) => handleChangeInput(e)}
							autoComplete='off'
							onFocus={(e) => handleTargetChange(e,"origin")}
							id="origin"
							name="origin"
							label={originLabel}
							variant="filled"
						/>
						<TextField

							fullWidth
							inputRef={destinationRef}
							value={destination}
							tabIndex={2}
							autoComplete='off'
							onChange={(e) => handleChangeInput(e)}
							onFocus={(e) => handleTargetChange(e,"destination")}
							id="destination"
							name="destination"
							label={destinationLabel}
							variant="filled"
						/>
					</Box>
				

					<Button
						type="submit"
						className=" bg-blue-500 hover:bg-blue-900 hover:shadow-[0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)]"
						variant="contained"
						tabIndex={3}
						onClick={handleSubmit}
						endIcon={<SendIcon />}
					>
						Send
					</Button>
					{showList &&  <ShowList allAirports={showAll} setFilterCountries={setFilterCountries} filterCountries={filterCountries}  airports={airports} onClick={handleAirportList}/>}
        </Box>
    )
}