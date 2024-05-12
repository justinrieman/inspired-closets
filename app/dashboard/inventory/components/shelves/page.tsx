import { columns } from '@/components/dashboard/inventory/shelves/columns';
import { DataTable } from '@/components/dashboard/DataTable';
import { componentInventory } from '@/lib/placeholder-data';
import ComponentForm from '@/components/dashboard/inventory/ComponentForm';

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

  return (
    <div>
      <DataTable columns={columns} data={components} />
      {/* {components.map((component: any) => (
        <div key={component._id}>
          <h2>{component.name}</h2>
          <p>{component.color}</p>
        </div>
      ))} */}
    </div>
  );
};

export default ShelvesPage;
