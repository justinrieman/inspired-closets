import User from '@/lib/models/User';
import dbConnect from '@/lib/dbConnect';
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log(body);

  return new NextResponse(JSON.stringify('hello'), { status: 200 });
}
