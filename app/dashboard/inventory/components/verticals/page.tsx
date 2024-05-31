import { columns } from '@/components/dashboard/inventory/shelves/columns';
import { DataTable } from '@/components/dashboard/DataTable';
import { formatDate } from '@/lib/utils';
import { getSession } from '@/lib/session';

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

const VerticalsPage = async () => {
  const session = await getSession();
  const components = await getComponents(session.location);

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
