import Link from 'next/link';
import React from 'react';
import { getLowComponents } from '@/lib/inventory/actions';

const InventorySnapshot = async () => {
  const components = await getLowComponents();

  return (
    <>
      <div className="xl:max-w-md">
        <div className="rounded-t-md px-4 py-2 mt-4 bg-red-800 ">
          <h1 className="text-gray-50">Inventory Snapshot</h1>
        </div>

        <div className="bg-gray-50 border border-gray-200 shadow rounded-b-lg py-4">
          <div className="mx-auto max-w-sm bg-gray-100 border border-gray-200 rounded-lg shadow">
            <div className="pl-4 pr-8 lg:pl-2 lg:pr-4 mx-auto pb-4 flow-root">
              <ul role="list" className="divide-y divide-gray-200">
                <li className="py-2">
                  <div className="flex items-center">
                    <div className="flex-shrink-0"></div>
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        Components
                      </p>
                      <div className="mt-1">
                        {components.low === 0 &&
                          components.criticallyLow === 0 && (
                            <p className="text-xs text-green-800">
                              Components are fully stocked.
                            </p>
                          )}
                        {components.low === 1 && (
                          <p className="text-xs text-orange-500">
                            1 component is low.
                          </p>
                        )}
                        {components.low > 1 && (
                          <p className="text-xs text-orange-500">
                            {components.low} components are low.
                          </p>
                        )}
                        {components.criticallyLow === 1 && (
                          <p className="text-xs text-red-500">
                            1 component is critically low.
                          </p>
                        )}
                        {components.criticallyLow > 1 && (
                          <p className="text-xs text-red-500">
                            {components.criticallyLow} components are low.
                          </p>
                        )}
                      </div>
                    </div>
                    <Link
                      href="/dashboard/inventory/components"
                      className="text-sm hover:text-red-800"
                    >
                      View All
                    </Link>
                  </div>
                </li>
                <li className="pt-2">
                  <div className="flex items-center ">
                    <div className="flex-shrink-0"></div>
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        Hardware
                      </p>
                      <div className="mt-1">
                        <p className="text-xs text-blue-800">Coming soon ...</p>
                      </div>
                    </div>
                    <Link
                      href="/dashboard/inventory/hardware"
                      className="text-sm hover:text-red-800"
                    >
                      View All
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InventorySnapshot;
