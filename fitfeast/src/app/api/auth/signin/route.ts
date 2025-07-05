import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '@/app/lib/mongodb';
import User from '@/app/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(req: Request) {
  try {
    console.log('Received signin request');
    const { email, password } = await req.json();
    console.log('Signin attempt for email:', email);

    await connectDB();
    console.log('Database connected');

    // Find user and include password
    const user = await User.findOne({ email }).select('+password');
    console.log('User found:', user ? 'Yes' : 'No');

    if (!user) {
      console.log('User not found');
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    console.log('Password match:', isMatch ? 'Yes' : 'No');
    
    if (!isMatch) {
      console.log('Password does not match');
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Create token
    const token = jwt.sign(
      { id: user._id },
      JWT_SECRET,
      { expiresIn: '30d' }
    );
    console.log('JWT token created successfully');

    // Set HTTP-only cookie
    const response = NextResponse.json(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      { status: 200 }
    );

    // Set cookie with more permissive settings for development
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const, // Changed from 'strict' to 'lax' for development
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/', // Explicitly set path
    };

    console.log('Setting cookie with options:', cookieOptions);
    response.cookies.set('token', token, cookieOptions);
    console.log('Cookie set successfully');

    // Verify cookie was set
    const setCookieHeader = response.headers.get('set-cookie');
    console.log('Set-Cookie header:', setCookieHeader);

    console.log('Signin successful, returning response');
    return response;
  } catch (error: any) {
    console.error('Signin error:', error);
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
} 