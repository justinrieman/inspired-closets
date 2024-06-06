import { columns } from '@/components/dashboard/inventory/shelves/columns';
import { DataTable } from '@/components/dashboard/DataTable';
import { formatDate } from '@/lib/utils';
import { getSession } from '@/lib/session';

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

const ShelvesPage = async () => {
  const session = await getSession();
  const components = await getComponents(session.location);

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
