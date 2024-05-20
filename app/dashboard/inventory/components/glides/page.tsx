import { columns } from '@/components/dashboard/inventory/shelves/columnsForBoxes';
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

const GlidesPage = async () => {
  const components = await getComponents();

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
