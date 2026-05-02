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

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    if (!body.status) {
      return NextResponse.json({ error: 'Status is required' }, { status: 400 });
    }

    const reservations = readData();
    const index = reservations.findIndex((r: { id: string }) => r.id === id);
    
    if (index === -1) {
      return NextResponse.json({ error: 'Reservation not found' }, { status: 404 });
    }
    
    reservations[index].status = body.status;
    
    if (writeData(reservations)) {
      return NextResponse.json({ success: true, reservation: reservations[index] });
    } else {
      return NextResponse.json({ error: 'Failed to update reservation' }, { status: 500 });
    }
  } catch {
    return NextResponse.json(
      { error: 'Failed to update reservation' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const reservations = readData();
    const filteredReservations = reservations.filter((r: { id: string }) => r.id !== id);
    
    if (filteredReservations.length === reservations.length) {
      return NextResponse.json({ error: 'Reservation not found' }, { status: 404 });
    }
    
    if (writeData(filteredReservations)) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Failed to delete reservation' }, { status: 500 });
    }
  } catch {
    return NextResponse.json(
      { error: 'Failed to delete reservation' },
      { status: 500 }
    );
  }
}
