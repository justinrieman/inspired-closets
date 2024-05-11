import { columns } from '@/components/dashboard/inventory/shelves/columns';
import { DataTable } from '@/components/dashboard/DataTable';
import { componentInventory } from '@/lib/placeholder-data';

const ShelvesPage = async () => {
  const fetchComponents = async () => {
    const res = await fetch('http://localhost:3000/api/something');
    const something = await res.json();
    return something;
  };

  const blah = await fetchComponents();

  return (
    <div>
      <DataTable columns={columns} data={componentInventory} />
      <h1>Components</h1>
      {blah.map((component: any) => (
        <div key={component._id}>
          <h2>{component.name}</h2>
          <p>{component.color}</p>
        </div>
      ))}
    </div>
  );
};

export default ShelvesPage;
