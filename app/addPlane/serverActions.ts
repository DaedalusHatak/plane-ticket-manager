'use server';

import mongoose from 'mongoose';

function generateSeatNumber(col: number, row: number) {
	const colLabel = String.fromCharCode('A'.charCodeAt(0) + col);
	const rowLabel = row.toString().padStart(2, '0'); // Ensure col does not exceed 6
	return `${rowLabel}${colLabel}`;
}
const prices = [93, 61, 44, 67, 35];
function generatePrice(row: number) {
	switch (row) {
		case 1:
			return prices[0];
		case 2:
		case 3:
		case 4:
		case 5:
			return prices[1];
		case 6:
		case 7:
		case 8:
		case 9:
			return prices[2];
		case 12:
		case 13:
			return prices[3];

		default:
			return prices[4];
	}
}

export async function handleSubmit(
	name: string,
	seatNumber: number,
	rowSeats: number
) {
	const db = await mongoose.connect(process.env.DB, { dbName: 'Tickets' });
	const collection = db.connection.db;
	const newCollection = await collection.createCollection(name);

	// 1st row XL / fast exit / best price front / mid XL / best price back

	const documents = [];

	for (let i = 0; i < seatNumber; i++) {
		const currentRow = Math.floor(i / rowSeats) + 1;
		const currentCol = i + (1 % rowSeats) === 0 ? rowSeats : i % rowSeats;
		console.log(currentRow);
		documents.push({
			seatNumber: generateSeatNumber(currentCol, currentRow),
			isTaken: false,
			price: generatePrice(currentRow),
			// other seat information
		});
	}

	await newCollection.insertMany(documents);
	await mongoose.connection.close();
}
