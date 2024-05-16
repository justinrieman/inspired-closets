import { columns } from '@/components/dashboard/inventory/shelves/columns';
import { DataTable } from '@/components/dashboard/DataTable';
import { formatDate } from '@/lib/utils';

const getComponents = async () => {
  try {
    const response = await fetch(
      'http://localhost:3000/api/componentInventory',
      {
        cache: 'no-store',
      }
    );

    return response.json();
  } catch (error) {
    console.log('Failed to fetch components', error);
  }
};

const ShelvesPage = async () => {
  const components = await getComponents();

  const shelves = components.filter((component: any) => {
    return component.type === 'shelf';
  });

  shelves.forEach((shelf: any) => {
    shelf.lastUpdated = formatDate(shelf.lastUpdated);
    shelf.expectedArrival = formatDate(shelf.expectedArrival);
  });

  return (
    <div>
      <DataTable columns={columns} data={shelves} />
    </div>
  );
};

export default ShelvesPage;
