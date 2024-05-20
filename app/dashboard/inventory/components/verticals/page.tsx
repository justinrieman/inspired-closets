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

const VerticalsPage = async () => {
  const components = await getComponents();

  const verticals = components.filter((component: any) => {
    return component.type === 'vertical';
  });

  verticals.forEach((vertical: any) => {
    vertical.lastUpdated = formatDate(vertical.lastUpdated);
    vertical.expectedArrival = formatDate(vertical.expectedArrival);
  });

  return (
    <div>
      <DataTable columns={columns} data={verticals} />
    </div>
  );
};

export default VerticalsPage;
