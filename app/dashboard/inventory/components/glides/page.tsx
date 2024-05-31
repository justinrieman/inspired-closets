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

const GlidesPage = async () => {
  const session = await getSession();
  const components = await getComponents(session.location);

  const glides = components.filter((component: any) => {
    return component.type === 'glide';
  });

  glides.forEach((glide: any) => {
    glide.lastUpdated = formatDate(glide.lastUpdated);
    glide.expectedArrival = formatDate(glide.expectedArrival);
  });

  return (
    <div>
      <DataTable columns={columns} data={glides} />
    </div>
  );
};

export default GlidesPage;
