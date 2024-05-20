import ComponentForm from '@/components/dashboard/inventory/ComponentForm';
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

const ComponentsPage = async () => {
  const components = await getComponents();

  components.forEach((component: any) => {
    component.lastUpdated = formatDate(component.lastUpdated);
    component.expectedArrival = formatDate(component.expectedArrival);
  });

  return (
    <div>
      <div>
        <DataTable columns={columns} data={components} />
      </div>
      {/* <ComponentForm /> */}
    </div>
  );
};

export default ComponentsPage;
