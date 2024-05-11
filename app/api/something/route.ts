import dbConnect from '@/lib/dbConnect';
import Component from '@/lib/models/Component';
import { User } from 'lucide-react';
import { Types } from 'mongoose';
import { NextResponse } from 'next/server';

const ObjectId = require('mongoose').Types.ObjectId;

export async function GET() {
  try {
    await dbConnect();
    const components = await Component.find();
    return new NextResponse(JSON.stringify(components), { status: 200 });
  } catch (error) {
    return new NextResponse('Error in fetching components ' + error, {
      status: 500,
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    await dbConnect();
    const newComponent = new Component(body);

    await newComponent.save();

    return new NextResponse(
      JSON.stringify({
        message: 'New component created',
        component: newComponent,
      }),
      { status: 201 }
    );
  } catch (error) {
    return new NextResponse('Error in creating component ' + error, {
      status: 500,
    });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { componentId, newCount } = body;
    await dbConnect();

    if (!componentId || !newCount) {
      return new NextResponse(
        JSON.stringify({ message: 'ID or new count are required' }),
        { status: 400 }
      );
    }

    if (!Types.ObjectId.isValid(componentId)) {
      return new NextResponse(
        JSON.stringify({ message: 'Invalid component ID' }),
        { status: 400 }
      );
    }

    const updatedComponent = await Component.findOneAndUpdate(
      { _id: new ObjectId(componentId) },
      { quantity: newCount },
      { new: true }
    );

    if (!updatedComponent) {
      return new NextResponse(
        JSON.stringify({ message: "Component wasn't updated successfully" }),
        { status: 400 }
      );
    }

    return new NextResponse(
      JSON.stringify({
        message: 'Component updated successfully',
        component: updatedComponent,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse('Error in updating component ' + error, {
      status: 500,
    });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const componentId = searchParams.get('componentId');

    if (!componentId) {
      return new NextResponse(
        JSON.stringify({ message: 'ComponentId required' }),
        { status: 400 }
      );
    }

    if (!Types.ObjectId.isValid(componentId)) {
      return new NextResponse(
        JSON.stringify({ message: 'Invalid componentID' }),
        { status: 400 }
      );
    }

    await dbConnect();

    //

    const deletedComponent = await Component.findByIdAndDelete(
      new Types.ObjectId(componentId)
    );
  } catch (error) {}
}
