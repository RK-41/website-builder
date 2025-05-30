// API endpoint to trigger build process for the page built with puck editor and send the built script to another api to be hosted and used through CDN

import { exec } from 'child_process';
import { readFile } from 'fs/promises';
// import fetch from 'node-fetch'; // Or use native fetch if on Node 18+
import { join } from 'path';

export async function POST() {
	try {
		// 1. Run Webpack build
		const output = await new Promise((resolve, reject) => {
			exec('npm run build:webpack', (error, stdout, stderr) => {
				if (error) reject(stderr);
				else resolve(stdout);
			});
		});

		// 2. Read the generated file
		const filePath = join(process.cwd(), 'pageBuild', 'render-bundle.js');
		const fileBuffer = await readFile(filePath);

		console.log('🍀🍀🍀 buffer length', fileBuffer.length);

		// 3. Send the file to another API (example: as a file upload)
		//    Have to ZIP it!

		// Note: In Node.js, FormData is not available natively. Use 'form-data' package:
		// npm install form-data
		// const FormData = require('form-data');
		// const form = new FormData();
		// form.append('file', fileBuffer, { filename: 'render-bundle.js' });

		// const uploadResponse = await fetch('https://your-api.com/upload', {
		//   method: 'POST',
		//   body: form,
		//   headers: form.getHeaders()
		// });
		// const uploadResult = await uploadResponse.json();

		return new Response(
			JSON.stringify({
				success: true,
				output,
				// uploadResult
			}),
			{
				status: 200,
				headers: { 'Content-Type': 'application/json' },
			}
		);
	} catch (error: any) {
		console.log('💥💥💥', error);
		return new Response(
			JSON.stringify({
				success: false,
				error: error.message,
			}),
			{
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			}
		);
	}
}
