import { columns } from '@/components/dashboard/inventory/shelves/columnsForBoxes';
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

const BoxesPage = async () => {
  const session = await getSession();

  const components = await getComponents(session.location);

  const boxes = components.filter((component: any) => {
    return component.type === 'box';
  });

  boxes.forEach((box: any) => {
    box.lastUpdated = formatDate(box.lastUpdated);
    box.expectedArrival = formatDate(box.expectedArrival);
  });

  return (
    <div>
      <DataTable columns={columns} data={boxes} />
    </div>
  );
};

export default BoxesPage;
