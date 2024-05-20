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

const BedsPage = async () => {
  const components = await getComponents();

  const beds = components.filter((component: any) => {
    return component.type === 'bed';
  });

  beds.forEach((bed: any) => {
    bed.lastUpdated = formatDate(bed.lastUpdated);
    bed.expectedArrival = formatDate(bed.expectedArrival);
  });

  return (
    <div>
      <DataTable columns={columns} data={beds} />
    </div>
  );
};

export default BedsPage;
