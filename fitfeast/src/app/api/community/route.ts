import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Community from '@/models/Community';
import { upload } from '@/lib/upload';
import { NextRequest } from 'next/server';
import fs from 'fs';

export async function GET() {
  try {
    await dbConnect();
    const posts = await Community.find({}).sort({ createdAt: -1 });
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const author = formData.get('author') as string;
    const imageFile = formData.get('image') as File | null;

    let imageUrl = null;
    if (imageFile) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      // Generate unique filename
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const filename = uniqueSuffix + '.' + imageFile.name.split('.').pop();
      
      // Save file to public/uploads directory
      const uploadsDir = process.cwd() + '/public/uploads';
      const filepath = `${uploadsDir}/${filename}`;
      await fs.promises.writeFile(filepath, buffer);
      
      // Set image URL
      imageUrl = `/uploads/${filename}`;
    }

    const post = await Community.create({
      title,
      content,
      author,
      image: imageUrl
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
} 