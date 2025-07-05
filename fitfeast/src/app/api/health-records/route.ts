import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/mongodb';
import HealthRecord from '@/app/models/HealthRecord';

// GET all health records for the authenticated user
export async function GET(req: Request) {
  try {
    // Get user from the request headers
    const userData = req.headers.get('user-data');
    if (!userData) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const user = JSON.parse(userData);
    await connectDB();
    
    const records = await HealthRecord.find({ userId: user._id })
      .sort({ date: -1 })
      .limit(30); // Get last 30 records

    return NextResponse.json(records);
  } catch (error: any) {
    console.error('Error fetching health records:', error);
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}

// POST new health record
export async function POST(req: Request) {
  try {
    // Get user from the request headers
    const userData = req.headers.get('user-data');
    if (!userData) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const user = JSON.parse(userData);
    const data = await req.json();
    await connectDB();

    const record = await HealthRecord.create({
      ...data,
      userId: user._id
    });

    return NextResponse.json(record, { status: 201 });
  } catch (error: any) {
    console.error('Error creating health record:', error);
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
} 