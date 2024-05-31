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

const FrontsPage = async () => {
  const session = await getSession();
  const components = await getComponents(session.location);

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
