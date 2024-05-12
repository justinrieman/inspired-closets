import { columns } from '@/components/dashboard/inventory/shelves/columns';
import { DataTable } from '@/components/dashboard/DataTable';

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

const ShelvesPage = async () => {
  const components = await getComponents();

  const shelves = components.filter((component: any) => {
    return component.type === 'shelf';
  });

  return (
    <div>
      <DataTable columns={columns} data={shelves} />
    </div>
  );
};

export default ShelvesPage;
