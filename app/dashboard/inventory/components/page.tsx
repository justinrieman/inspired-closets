import ComponentForm from '@/components/dashboard/inventory/ComponentForm';
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

const ComponentsPage = async () => {
  const session = await getSession();
  const components = await getComponents(session.location);

  components.forEach((component: any) => {
    component.lastUpdated = formatDate(component.lastUpdated);
    component.expectedArrival = formatDate(component.expectedArrival);
  });

  return (
    <div>
      <div>
        <DataTable columns={columns} data={components} />
      </div>
      <ComponentForm />
    </div>
  );
};

export default ComponentsPage;
