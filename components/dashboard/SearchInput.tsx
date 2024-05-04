'use client';

import { log } from 'console';
import { Search } from 'lucide-react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

const SearchInput = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="ml-2 h-8 flex-grow relative flex">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 transition-width duration-500 w-1/2 hover:w-4/6 focus:border-blue-200 focus:outline-none focus:ring-sky-200 focus:ring-1"
        placeholder="Search..."
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <Search className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
};

export default SearchInput;
