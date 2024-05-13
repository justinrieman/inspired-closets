import dbConnect from '@/lib/dbConnect';
import Component from '@/lib/models/Component';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest, { params }: any) {
  try {
    const { id } = params;

    const foundComponent = await Component.findOne({ _id: id });

    return new NextResponse(JSON.stringify({ foundComponent }), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: 'Error fetching component' }),
      { status: 500 }
    );
  }
}
