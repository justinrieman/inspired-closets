import {
  Bell,
  ChevronDown,
  Grid,
  History,
  LayoutGrid,
  PlusSquare,
  Settings,
} from 'lucide-react';
import React from 'react';
import SearchInput from './SearchInput';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getSession } from '@/lib/session';

const Header = async () => {
  const session = await getSession();
  return (
    <div className="hidden md:flex top-0 sticky items-center justify-between bg-gray-50 rounded-md mb-2 p-2">
      {/* Left Side */}

      <div className="flex flex-grow">
        <button>
          <div className="p-1 rounded-md">
            <History className="w-5 hover:text-red-800" />
          </div>
        </button>

        <SearchInput />
      </div>
      {/* Right Side  */}
      <div className="flex gap-2">
        <button>
          <div className="p-1 rounded-md">
            <PlusSquare className="w-5 hover:text-red-800" />
          </div>
        </button>

        <div className="border-r border-gray-300"></div>
        <button>
          <div className="p-1 rounded-md">
            <Bell className="w-5 hover:text-red-800" />
          </div>
        </button>

        <button>
          <div className="p-1 rounded-md">
            <Settings className="w-5 hover:text-red-800" />
          </div>
        </button>
        <div className="border-r border-gray-300"></div>
        <button>
          <div className="flex gap-1 items-center p-1 rounded-md hover:text-red-800">
            <span className="text-sm">{session.username}</span>
            <ChevronDown className="w-3"></ChevronDown>
          </div>
        </button>
        <Avatar className="w-8 h-8">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <button>
        <div className="p-1 rounded-md">
          <LayoutGrid className="w-5 ml-2 hover:text-red-800 hover:cursor-pointer " />
        </div>
      </button>
    </div>
  );
};

export default Header;
