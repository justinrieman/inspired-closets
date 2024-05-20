import InventoryItemPageCard from '@/components/dashboard/inventory/InventoryItemPageCard';

const getComponentById = async (id: any) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/componentInventory/${id}`,
      {
        cache: 'no-store',
      }
    );

    return response.json();
  } catch (error) {
    console.log('Failed to fetch component', error);
  }
};

const Page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  let component = await getComponentById(id);
  component = component.foundComponent;

  return (
    <>
      <InventoryItemPageCard
        type={component.type}
        color={component.color}
        name={component.name}
        quantity={component.quantity}
        maxQuantity={component.maxQuantity}
        lastUpdated={component.lastUpdated}
        expectedArrival={component.expectedArrival}
        quantityHistory={component.quantityHistory}
      ></InventoryItemPageCard>
    </>
  );
};

export default Page;
