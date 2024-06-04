'use server';
import Component from '@/lib/models/Component';
import { getSession } from '@/lib/session';
import dbConnect from '@/lib/dbConnect';
import { CRITICALLY_LOW_QUANTITY, LOW_QUANTITY } from '../constants';

export async function getDashboardSnapShot() {}

export async function getLowComponents() {
  const session = await getSession();

  const lowComponents = {
    low: 0,
    criticallyLow: 0,
  };

  dbConnect();
  const components = await Component.find({
    branchLocation: session.location,
    $expr: {
      $lt: ['$quantity', { $multiply: ['$maxQuantity', LOW_QUANTITY] }],
    },
  });

  for (let i = 0; i < components.length; i++) {
    const quantity = components[i].quantity;
    const maxQuantity = components[i].maxQuantity;
    const quantityPercentage = (quantity / maxQuantity) * 100;

    quantityPercentage <= CRITICALLY_LOW_QUANTITY * 100
      ? lowComponents.criticallyLow++
      : lowComponents.low++;
  }
  return lowComponents;
}
