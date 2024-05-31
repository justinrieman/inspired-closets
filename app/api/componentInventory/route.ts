import dbConnect from '@/lib/dbConnect';
import Component from '@/lib/models/Component';
import { getSession } from '@/lib/session';
import { Types } from 'mongoose';
import { revalidatePath } from 'next/cache';
import { NextResponse, NextRequest } from 'next/server';

const ObjectId = require('mongoose').Types.ObjectId;

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const branchLocation = searchParams.get('location');

    const filter = branchLocation ? { branchLocation: branchLocation } : {};
    const components = await Component.find(filter);

    return new NextResponse(JSON.stringify(components), { status: 200 });
  } catch (error) {
    return new NextResponse('Error in fetching components ' + error, {
      status: 500,
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const path = request.nextUrl.searchParams.get('path') || '/';
    const date = new Date().toISOString();

    const session = await getSession();

    body.values.lastUpdated = date;
    body.values.expectedArrival = '';
    body.values.quantityHistory = [];
    body.values.branchLocation = session.location;

    await dbConnect();

    await Component.create(body.values);

    revalidatePath(path);

    return new NextResponse(
      JSON.stringify({
        message: 'Component Created',
        component: body.values,
      }),
      { status: 201 }
    );
  } catch (error) {
    return new NextResponse('Error in creating component ' + error, {
      status: 500,
    });
  }
}

export async function PATCH(request: NextRequest) {
  // TODO Update lastUpdated section when putting into database
  try {
    const body = await request.json();

    // If we are updating the quantity, maxQuantity or if we are updating expected arrival
    if (body.updatedComponent.newQuantity) {
      const { _id, newQuantity, prevQuantity } = body.updatedComponent;

      await dbConnect();

      if (!_id || !newQuantity) {
        return new NextResponse(
          JSON.stringify({ message: 'ID or new count are required' }),
          { status: 400 }
        );
      }

      if (!Types.ObjectId.isValid(_id)) {
        return new NextResponse(
          JSON.stringify({ message: 'Invalid component ID' }),
          { status: 400 }
        );
      }

      // Retrieve the current lastUpdated date from the component document
      const component = await Component.findOne({ _id });
      const lastUpdated = component.lastUpdated;
      const currentDate = new Date();

      // Prepare the object to push to the quantityHistory array
      const quantityHistoryItem = {
        prevQuantity: prevQuantity,
        prevDate: lastUpdated,
      };

      const updatedComponent = await Component.findOneAndUpdate(
        { _id: new ObjectId(_id) },
        {
          $set: { quantity: newQuantity, lastUpdated: currentDate },
          $push: {
            quantityHistory: quantityHistoryItem,
          },
        },
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
    } else if (body.updatedComponent.newMaxQuantity) {
      const { _id, newMaxQuantity } = body.updatedComponent;

      await dbConnect();

      if (!_id || !newMaxQuantity) {
        return new NextResponse(
          JSON.stringify({ message: 'ID or new count are required' }),
          { status: 400 }
        );
      }

      if (!Types.ObjectId.isValid(_id)) {
        return new NextResponse(
          JSON.stringify({ message: 'Invalid component ID' }),
          { status: 400 }
        );
      }
      const updatedComponent = await Component.findOneAndUpdate(
        { _id: new ObjectId(_id) },
        {
          $set: { maxQuantity: newMaxQuantity },
        },
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
    } else if (
      body.updatedComponent.expectedArrival ||
      body.updatedComponent.expectedArrival === null
    ) {
      const { _id, expectedArrival } = body.updatedComponent;

      await dbConnect();

      if (!_id) {
        return new NextResponse(JSON.stringify({ message: 'ID is required' }), {
          status: 400,
        });
      }

      if (!Types.ObjectId.isValid(_id)) {
        return new NextResponse(
          JSON.stringify({ message: 'Invalid component ID' }),
          { status: 400 }
        );
      }

      const updatedComponent = await Component.findOneAndUpdate(
        { _id: new ObjectId(_id) },
        {
          $set: { expectedArrival: expectedArrival },
        },
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
    } else {
      return new NextResponse(
        JSON.stringify({
          message: 'Something Probabaly went wrong',
        }),
        { status: 500 }
      );
    }
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

    // Check if component was found and deleted

    const deletedComponent = await Component.findByIdAndDelete(
      new Types.ObjectId(componentId)
    );

    if (!deletedComponent) {
      return new NextResponse(
        JSON.stringify({ message: 'Invalid componentID' }),
        { status: 400 }
      );
    }
  } catch (error) {}
}
