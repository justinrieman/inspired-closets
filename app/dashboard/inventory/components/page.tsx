import ComponentForm from '@/components/dashboard/inventory/ComponentForm';
import { columns } from '@/components/dashboard/inventory/shelves/columns';
import { DataTable } from '@/components/dashboard/DataTable';
import { formatDate } from '@/lib/utils';
import { getSession } from '@/lib/session';
import { Button } from '@/components/ui/button';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const getComponents = async (location: string) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/componentInventory?location=${location}`,
      {
        cache: 'no-store',
      }
    );

    return response.json();
  } catch (error) {
    console.log('Failed to fetch components', error);
  }
};

const ComponentsPage = async () => {
  const session = await getSession();
  const components = await getComponents(session.location);

  components.forEach((component: any) => {
    component.lastUpdated = formatDate(component.lastUpdated);
    component.expectedArrival = formatDate(component.expectedArrival);
  });

  return (
    <div>
      <div>
        <DataTable columns={columns} data={components} />
      </div>

      <Dialog>
        <DialogTrigger className="bg-gray-50 py-2 rounded-md  px-4 text-sm absolute bottom-0 right-0 mr-8 mb-8 text-black hover:bg-red-200 hover:text-red-800">
          New Component
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Component</DialogTitle>
          </DialogHeader>
          <ComponentForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ComponentsPage;
