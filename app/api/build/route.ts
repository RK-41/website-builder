// API endpoint to trigger build process for the page built with puck editor and send the built script to another API to be hosted and used through CDN

import { exec } from 'child_process';
import FormData from 'form-data';
import { readFile, rm } from 'fs/promises';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { join } from 'path';
import { authOptions } from '../../../lib/auth';

export async function POST(req: Request) {
  try {
    // 1. Authenticate user
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // const { domain } = await req.json();
    const domain = 'zzzz';
    if (!domain) {
      return NextResponse.json(
        { success: false, error: 'Domain is required' },
        { status: 400 }
      );
    }

    // 2. Run Webpack build
    const output = await new Promise<string>((resolve, reject) => {
      exec(
        `cross-env DOMAIN=${domain} npm run build:webpack`,
        (error, stdout, stderr) => {
          if (error) reject(new Error(stderr));
          else resolve(stdout);
        }
      );
    });

    // 3. Read the generated file
    const filePath = join(
      process.cwd(),
      'pageBuild',
      domain,
      'render-bundle.js'
    );
    const fileBuffer = await readFile(filePath);

    // 4. Create FormData and append file + domain
    const form = new FormData();
    form.append('file', fileBuffer, {
      filename: 'render-bundle.js',
      contentType: 'application/javascript',
    });
    form.append('domain', domain);

    // 5. Optional: Upload to CDN / External server
    const uploadResponse = await fetch(
      'https://0nfhvzwq-8080.inc1.devtunnels.ms/upload',
      {
        method: 'POST',
        body: form.getBuffer(),
        headers: form.getHeaders(),
      }
    );

    const uploadResult = await uploadResponse.json();

    // Remove the build files
    if (uploadResult.message.startsWith('File uploaded successfully')) {
      const buildDir = join(process.cwd(), 'pageBuild', domain);
      await rm(buildDir, { recursive: true, force: true });
    }

    return NextResponse.json({
      success: true,
      output,
      uploadResult,
    });
  } catch (error: any) {
    console.error('💥 Error in build-upload API:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
