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

const TopsPage = async () => {
  const session = await getSession();
  const components = await getComponents(session.location);

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
