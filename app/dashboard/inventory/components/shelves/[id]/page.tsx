// Fetch the component by id and dispay everything

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

  console.log('YESSAH');

  console.log(component);
  return (
    <div>
      <h1>Name : {component.name}</h1>
      <h1>Color : {component.color}</h1>
      <h1>Quantity : {component.quantity}</h1>
      <h1>Max Quantity : {component.maxQuantity}</h1>
      <h1>Last Updated : {component.lastUpdated}</h1>
    </div>
  );
};

export default Page;
