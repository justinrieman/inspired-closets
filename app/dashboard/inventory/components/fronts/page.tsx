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

const FrontsPage = async () => {
  const components = await getComponents();

  const fronts = components.filter((component: any) => {
    return component.type === 'front';
  });

  fronts.forEach((front: any) => {
    front.lastUpdated = formatDate(front.lastUpdated);
    front.expectedArrival = formatDate(front.expectedArrival);
  });

  return (
    <div>
      <DataTable columns={columns} data={fronts} />
    </div>
  );
};

export default FrontsPage;
