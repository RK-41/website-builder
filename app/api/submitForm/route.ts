// Basic api endpoint to test contact us form submission

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	const formData = await req.json(); // Parse the JSON body

	// Here you can process the form data, e.g., save it to a database
	console.log('Received form data:', formData);

	// Send a response back to the client
	return NextResponse.json({
		message: 'Form data received successfully',
		data: formData,
	});
}
