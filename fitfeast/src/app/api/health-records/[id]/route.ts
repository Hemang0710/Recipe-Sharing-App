import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/mongodb';
import HealthRecord from '@/app/models/HealthRecord';

// GET single health record
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Get user from the request headers
    const userData = req.headers.get('user-data');
    if (!userData) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const user = JSON.parse(userData);
    await connectDB();
    
    const record = await HealthRecord.findOne({
      _id: params.id,
      userId: user._id
    });

    if (!record) {
      return NextResponse.json(
        { message: 'Record not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(record);
  } catch (error: any) {
    console.error('Error fetching health record:', error);
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}

// PUT update health record
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Get user from the request headers
    const userData = req.headers.get('user-data');
    if (!userData) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const user = JSON.parse(userData);
    const data = await req.json();
    await connectDB();

    const record = await HealthRecord.findOneAndUpdate(
      { _id: params.id, userId: user._id },
      data,
      { new: true }
    );

    if (!record) {
      return NextResponse.json(
        { message: 'Record not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(record);
  } catch (error: any) {
    console.error('Error updating health record:', error);
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}

// DELETE health record
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Get user from the request headers
    const userData = req.headers.get('user-data');
    if (!userData) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const user = JSON.parse(userData);
    await connectDB();

    const record = await HealthRecord.findOneAndDelete({
      _id: params.id,
      userId: user._id
    });

    if (!record) {
      return NextResponse.json(
        { message: 'Record not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Record deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting health record:', error);
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
} 