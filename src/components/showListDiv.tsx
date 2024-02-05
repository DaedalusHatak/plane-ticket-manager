"use client"
import { Box, Button, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import ShowList from "./showList";
import { ChangeEvent, useRef, useState } from "react";
export default function ShowListDiv({setTickets,airports}:any){
	const destinationRef = useRef<HTMLInputElement>(null);
	const originRef = useRef<HTMLInputElement>(null);

    const [filterCountries, setFilterCountries] = useState<string>('');
	const [origin, setOrigin] = useState<string>('');
	const [showList, setShowList] = useState<boolean>(false);
	const [destination, setDestination] = useState<string>('');
	const [currentTarget,setCurrentTarget] = useState('')
	const [errorMessage, setErrorMessage] = useState<string>('');

    const handleTargetChange = (e: any, newTarget: any) => {
		setShowList(true);
		setCurrentTarget(newTarget);
		setFilterCountries(e.target.value);
	};


	const handleAirportList = (e: any, setTarget: any) => {
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
		
			if (event.target.id === 'origin') setOrigin(event.target.value);
			else if (event.target.id === 'destination') 	setDestination(event.target.value);

        setFilterCountries(event.target.value)
	
	};



    return(
        <>
        <Box
						sx={{
							display: 'flex',
						}}
					>
						<TextField
							required
							fullWidth
							inputRef={originRef}
							value={origin}
							onChange={(e) => handleChangeInput(e)}
							autoComplete='off'
							onFocus={(e) => handleTargetChange(e,"origin")}
							id="origin"
							name="origin"
							label="Origin"
							variant="filled"
						/>
						<TextField
							required
							fullWidth
							inputRef={destinationRef}
							value={destination}
							tabIndex={2}
							autoComplete='off'
							onChange={(e) => handleChangeInput(e)}
							onFocus={(e) => handleTargetChange(e,"destination")}
							id="destination"
							name="destination"
							label="Destination"
							variant="filled"
						/>
					</Box>
					{showList &&  <ShowList setFilterCountries={setFilterCountries} filterCountries={filterCountries}  airports={airports} onClick={handleAirportList}/>}

					<Button
						type="submit"
						className=" bg-blue-500 hover:bg-blue-900 hover:shadow-[0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)]"
						variant="contained"
						tabIndex={3}
						onClick={e => setShowList(false)}
						endIcon={<SendIcon />}
					>
						Send
					</Button>
        </>
    )
}