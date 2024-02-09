'use client';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React, {
	ChangeEvent,
	FormEvent,
	useEffect,
	useRef,
	useState,
} from 'react';
import { Button, TextField, styled } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import {
	Unstable_NumberInput as BaseNumberInput,
	numberInputClasses,
} from '@mui/base/Unstable_NumberInput';
import ShowList from '../../(global)/showList';
import { handleInsertFlights } from '@/src/server-actions/sql/serverActions';
import ShowListDiv from '../../(global)/showListDiv';

const priceTags: string[] = [
	'XL Front',
	'Fast Exit',
	'Front',
	'XL Back',
	'Cheap',
];

function PriceComponent({
	price,
	idx,
	setArrOfPrices,
}: {
	idx: number;
	setArrOfPrices: Function;
	price: number | undefined;
}) {

	const [focus, setFocus] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null)
	const handlePrices = (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number
	) => {
		if (e.target.value !== '') setFocus(true);
		
		const regex = /^[0-9\b]+$/;
		if (e.target.value === '' || regex.test(e.target.value)) {
			setArrOfPrices((prev: number[]) => {
				const newArr = [...prev];
				newArr[index] = parseInt(e.target.value) ? parseInt(e.target.value) : 0;
				return newArr;
			});
		}
	};

	useEffect(()=>{
		if (price === 0) setFocus(false);
	},[price])

	return (
		<Box
			sx={{
				position: 'relative',
				background: 'rgba(0,0,0,0.06)',
				borderRadius: '8px',
				maxWidth:'100px',
				height: '45px',
			}}
		>
			<BaseNumberInput
				required
				min={0}
				onFocus={(e) => setFocus(true)}
				onBlur={(e) => (price === 0 ? setFocus(false) : setFocus(true))}
				onChange={(e) =>
					handlePrices(e as React.ChangeEvent<HTMLInputElement>, idx)
				}
				inputRef={inputRef}
				value={price}
				endAdornment={"zł"} 
				className={`${'Mui-error' ? 'border-red-600' : ''}`}
				onInputChange={(e) => handlePrices(e, idx)}
				slots={{
					root: StyledInputRoot,
					input: StyledInputElement,
				}}
				slotProps={{ input: { className: 'placeholder-opacity-100',value:price ? price : "" } }}
			></BaseNumberInput>
			<label
				className={`text-gray-600 absolute pl-2 z-1 transition-all peer-focus:top-0 ${
					focus === true
						? 'top-0 text-[10px] md:text-[12px]'
						: 'top-[50%] translate-y-[-50%] text-[10px] md:text-[15px]'
				}`}
			>
				{priceTags[idx]} *
			</label>
		</Box>
	);
}

export default function BasicSelect({
	airports,
	allPlanes,
}: {
	airports: Airport[];
	allPlanes: Plane[];
}) {
//Refs

//States

	const [plane, setPlane] = useState<Plane | null>();
	const [arrOfPrices, setArrOfPrices] = useState(Array(5).fill(0));
	const [tickets, setTickets] = useState<string>('');
	const [open, setOpen] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [error, setError] = useState('');

//Custom variables	
	const style = {
		position: 'absolute' as 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 400,
		bgcolor: 'background.paper',
		border: '2px solid #3043f8',
		borderRadius: '15px',
		boxShadow: 24,
		p: 4,
	};


//Functions
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleChange = (event: SelectChangeEvent<string>) => {
		const selectedPlane = allPlanes.find((e) => e.name === event.target.value);
		setPlane(selectedPlane);
	};
	const handleChangeInput = (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
	 setTickets(event.target.value);
	
	};

	const handleSubmit = async (origin:string,destination:string) => {
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
			const insertFlight = await handleInsertFlights(
				plane!,
				tickets,
				arrOfPrices,
				origin,
				destination
			);
	
			if (typeof insertFlight === 'string') {
				setOpen(true);
	
				setErrorMessage(insertFlight);
				throw new Error(insertFlight);
			}
	
			setArrOfPrices(Array(5).fill(0))
			setPlane(null);
			setTickets('')
		}
		}
	




//HTML
	return (
		<Box className='w-full max-w-5xl' color="primary" sx={{ minWidth: 120 }}>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={open}
				onClose={handleClose}
				closeAfterTransition
				slots={{ backdrop: Backdrop }}
				slotProps={{
					backdrop: {
						timeout: 500,
					},
				}}
			>
				<Fade in={open}>
					<Box sx={style}>
						<Typography
							id="transition-modal-title"
							variant="h6"
							color="red"
							component="h2"
						>
							Error
						</Typography>
						<Typography
							id="transition-modal-description"
							color="black"
							sx={{ mt: 2 }}
						>
							{errorMessage}
						</Typography>
					</Box>
				</Fade>
			</Modal>
			<form onSubmit={(e) => e.preventDefault()}>
				<FormControl required={true} fullWidth>
					<InputLabel id="select-plane-id">Plane</InputLabel>
					<Select
						required
						labelId="select-plane-label"
						id="select-plane"
						value={plane ? plane.name : ''}
						label="Plane"
						onChange={handleChange}
					>
						{allPlanes.map((plane: Plane, index: number) => (
							<MenuItem key={index} value={plane.name}>
								{plane.name}
							</MenuItem>
						))}
					</Select>

					<TextField
						required
						value={tickets}
						onChange={(e) => handleChangeInput(e)}
						id="ticket"
						label="Flight Code"
						variant="filled"
					/>
					<Typography className="text-center" variant="h6" component="h2">
						Set prices
					</Typography>
					<Box
						color="primary"
						sx={{
							display: 'flex',
							flexWrap:"wrap",
							fontSize: 12,
							justifyContent:"center",
							gap: 1,
							marginTop: 1,
							marginBottom: 2,
						}}
					>
						{arrOfPrices.map((price, idx) => (
							<PriceComponent
								key={idx}
								price={price}
								idx={idx}
								setArrOfPrices={setArrOfPrices}
							></PriceComponent>
						))}
					</Box>
					<ShowListDiv onSubmit={handleSubmit} airports={airports}></ShowListDiv>
					
				</FormControl>
			</form>
		</Box>
	);
}

//CSS variables
const StyledInputRoot = styled('div')(
	({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 400;
  border-radius: 8px;
  color: #000;
  height:100%;
  display: grid;
  grid-template-columns: 90% 10%;
  overflow: hidden;
  column-gap: 3px;
  align-items: baseline;
  padding-right:8px;

  &.${numberInputClasses.focused} {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${
			theme.palette.mode === 'dark' ? blue[600] : blue[200]
		};
  }

  &:hover {
    border-color: ${blue[400]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);

const StyledInputElement = styled('input')(
	({ theme }) => `
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.5;
  width: 100%;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: inherit;
  border: none;
  border-radius: inherit;
  padding: 8px 12px;
  outline: 0;
  z-index:5;
`
);

const blue = {
	100: '#DAECFF',
	200: '#80BFFF',
	400: '#3399FF',
	500: '#007FFF',
	600: '#0072E5',
};

const grey = {
	50: '#F3F6F9',
	100: '#E5EAF2',
	200: '#DAE2ED',
	300: '#C7D0DD',
	400: '#B0B8C4',
	500: '#9DA8B7',
	600: '#6B7A90',
	700: '#434D5B',
	800: '#303740',
	900: '#1C2025',
};
