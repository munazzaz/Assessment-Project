import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { DataItem } from './types'; 

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'src', 'app', 'data', 'data.json');
    const file = await fs.readFile(filePath, 'utf8');
    const data: DataItem[] = JSON.parse(file); 

    const players = data.flatMap((item) => item.dfsSlatePlayers);

    return NextResponse.json({ players });
  } catch (error) {
    console.error("Error reading file:", error);
    return NextResponse.json({ error: "Failed to read data" }, { status: 500 });
  }
}

