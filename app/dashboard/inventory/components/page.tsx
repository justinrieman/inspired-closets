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
import { PlusCircle } from 'lucide-react';

const getComponents = async (location: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/componentInventory?location=${location}`,
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
      <DataTable columns={columns} data={components} />

      <Dialog>
        <DialogTrigger className="flex items-center gap-2 bg-red-800 text-stone-50 py-2 border rounded-md  px-4 text-xs absolute bottom-0 right-0  mr-2 mb-2 md:mr-16 md:mb-8 2xl:right-[10%]  hover:bg-red-200 hover:text-red-800">
          <PlusCircle className="w-4" />
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
