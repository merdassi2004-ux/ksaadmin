import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const getDataFilePath = () => {
  return path.join(process.cwd(), 'reservations.json');
};

const readData = () => {
  const filePath = getDataFilePath();
  if (!fs.existsSync(filePath)) {
    return [];
  }
  try {
    const fileData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileData);
  } catch (error) {
    return [];
  }
};

const writeData = (data: unknown) => {
  const filePath = getDataFilePath();
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return true;
  } catch {
    return false;
  }
};

export async function GET() {
  const reservations = readData();
  reservations.sort((a: { createdAt: string }, b: { createdAt: string }) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  
  return NextResponse.json(reservations);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.name || !body.phone || !body.date || !body.time) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const newReservation = {
      id: crypto.randomUUID(),
      ...body,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    
    const reservations = readData();
    reservations.push(newReservation);
    
    if (writeData(reservations)) {
      return NextResponse.json({ success: true, reservation: newReservation }, { status: 201 });
    } else {
      return NextResponse.json(
        { error: 'Failed to save reservation' },
        { status: 500 }
      );
    }
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
