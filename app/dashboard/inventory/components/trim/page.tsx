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

const TrimsPage = async () => {
  const components = await getComponents();

  const trims = components.filter((component: any) => {
    return component.type === 'trim';
  });

  trims.forEach((trim: any) => {
    trim.lastUpdated = formatDate(trim.lastUpdated);
    trim.expectedArrival = formatDate(trim.expectedArrival);
  });

  return (
    <div>
      <DataTable columns={columns} data={trims} />
    </div>
  );
};

export default TrimsPage;
