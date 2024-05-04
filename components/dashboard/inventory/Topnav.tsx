import Link from 'next/link';

const componentsList = [
  { name: 'Shelves', href: '#' },
  { name: 'Verticals', href: '#' },
  { name: 'Fronts', href: '#' },
  { name: 'Tops', href: '#' },
  { name: 'Trim', href: '#' },
  { name: 'Beds', href: '#' },
  { name: 'Boxes', href: '#' },
  { name: 'Glides', href: '#' },
];

const Topnav = () => {
  return (
    <div className="flex w-full gap-2">
      {componentsList.map((component) => {
        return (
          <Link
            key={component.name}
            href="#"
            className="flex justify-center items-center text-sm bg-gray-50 w-full rounded-md h-10 hover:bg-red-200 hover:text-red-800"
          >
            {component.name}
          </Link>
        );
      })}
    </div>
  );
};

export default Topnav;
