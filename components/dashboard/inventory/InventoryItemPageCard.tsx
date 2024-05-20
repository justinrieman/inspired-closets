import InventoryHistoryChart from '@/app/dashboard/charts/inventoryHistoryChart';
import { formatDate } from '@/lib/utils';

type InventoryItemPageCardProps = {
  type: string;
  color: string;
  name: string;
  quantity: number;
  maxQuantity: number;
  lastUpdated: string;
  expectedArrival: string;
  quantityHistory: {
    prevQuantity: number;
    prevDate: string;
  }[];
};

const InventoryItemPageCard = (props: InventoryItemPageCardProps) => {
  let capitalizedType =
    props.type[0].toUpperCase() + props.type.substring(1, props.type.length);

  let progress = (props.quantity / props.maxQuantity) * 100;

  if (progress > 100) {
    progress = 100;
  }

  // Add current quantity and lastUpdated date to the bar chart
  props.quantityHistory.push({
    prevQuantity: props.quantity,
    prevDate: props.lastUpdated,
  });

  return (
    <>
      <div className="flex justify-between items-center rounded-t-md px-4 py-2 mt-4 bg-red-800 ">
        <h1 className="text-gray-50 text-center pr-3">{props.color}</h1>
        <h1 className=" text-gray-50 text-center  px-3">{props.name}</h1>

        <h1 className=" text-gray-50 text-center px-3 ">{capitalizedType}</h1>
      </div>

      <div className="bg-gray-50 border border-gray-200 shadow rounded-b-lg px-4 pt-4 pb-8">
        {/* <div className="flex justify-center lg:justify-start lg:pl-20 items-center gap-20 rounded-lg bg-red-800 "> */}

        <hr className="my-2"></hr>
        <h1>Quantity</h1>
        <div className="w-full mt-2 h-6 bg-gray-100 border border-gray-200 shadow rounded-full dark:bg-gray-500">
          <div
            style={{ ['width' as any]: `${progress}%` }}
            className="flex justify-center items-center bg-red-800 hover:bg-red-700 h-6 text-xs font-medium text-stone-50 p-0.5 leading-none rounded-full"
          >
            {props.quantity} / {props.maxQuantity}
          </div>
        </div>
        <hr className="mt-8 mb-4"></hr>

        {/* Cards Section */}
        <h1 className="m-2">History</h1>

        <div className="flex flex-col items-center lg:flex-row md:justify-between gap-10 px-2">
          <div className="w-full mx-auto md:mx-0 max-w-sm bg-gray-100 border border-gray-200 rounded-lg shadow">
            <div className="pl-4 pr-8 lg:pl-2 lg:pr-4 mx-auto pb-4 flow-root">
              <ul
                role="list"
                className="divide-y divide-gray-200 dark:divide-gray-700"
              >
                <li className="py-3 sm:py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0"></div>
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        Quantity
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      {props.quantity}
                    </div>
                  </div>
                </li>
                <li className="py-3 sm:py-4">
                  <div className="flex items-center ">
                    <div className="flex-shrink-0"></div>
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        Max Quantity
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      {props.maxQuantity}
                    </div>
                  </div>
                </li>
                <li className="py-3 sm:py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0"></div>
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        Last Updated
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      {formatDate(props.lastUpdated)}
                    </div>
                  </div>
                </li>
                <li className="pt-3 pb-0 sm:pt-4">
                  <div className="flex items-center ">
                    <div className="flex-shrink-0"></div>
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        Expected Arrival
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      {props.expectedArrival
                        ? formatDate(props.expectedArrival)
                        : 'N/A'}
                    </div>
                  </div>
                </li>
              </ul>
              {/* <div className="flex justify-center mt-4">
              <Button variant="outline" className="">
                Edit
              </Button>
            </div> */}
            </div>
          </div>
          <div className="w-full max-w-sm lg:max-w-none mx-auto bg-gray-100 border border-gray-200 rounded-lg shadow">
            <InventoryHistoryChart
              history={props.quantityHistory}
            ></InventoryHistoryChart>
          </div>
        </div>
        <hr className="mt-8 mb-4"></hr>

        {/* <div className="flex justify-center gap-20 mt-8">
        <Button variant="outline">Edit {capitalizedType}</Button>
        <Button variant="outline">Edit History</Button>
      </div> */}
      </div>
    </>
  );
};

export default InventoryItemPageCard;
