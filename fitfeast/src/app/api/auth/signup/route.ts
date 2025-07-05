import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/mongodb';
import User from '@/app/models/User';

export async function POST(req: Request) {
  try {
    console.log('Received signup request');
    const { name, email, password } = await req.json();
    console.log('Signup data:', { name, email, password: '***' });

    console.log('Connecting to database...');
    await connectDB();
    console.log('Database connected');

    // Check if user already exists
    console.log('Checking if user exists...');
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log('User already exists');
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 }
      );
    }

    // Create new user
    console.log('Creating new user...');
    const user = await User.create({
      name,
      email,
      password,
    });
    console.log('User created successfully:', { id: user._id, name: user.name, email: user.email });

    return NextResponse.json(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to create user' },
      { status: 500 }
    );
  }
} 