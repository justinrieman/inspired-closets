import { columns } from '@/components/dashboard/inventory/shelves/columns';
import { DataTable } from '@/components/dashboard/DataTable';
import { componentInventory } from '@/lib/placeholder-data';

const ShelvesPage = () => {
  return (
    <div>
      <DataTable columns={columns} data={componentInventory} />
    </div>
  );
};

export default ShelvesPage;
