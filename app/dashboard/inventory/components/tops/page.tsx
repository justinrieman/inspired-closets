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

const TopsPage = async () => {
  const components = await getComponents();

  const tops = components.filter((component: any) => {
    return component.type === 'top';
  });

  tops.forEach((top: any) => {
    top.lastUpdated = formatDate(top.lastUpdated);
    top.expectedArrival = formatDate(top.expectedArrival);
  });

  return (
    <div>
      <DataTable columns={columns} data={tops} />
    </div>
  );
};

export default TopsPage;
