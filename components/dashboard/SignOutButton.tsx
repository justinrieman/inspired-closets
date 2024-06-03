'use client';
import { userSignOut } from '@/lib/actions';
import { Power } from 'lucide-react';

const SignOutButton = () => {
  return (
    <button
      onClick={() => userSignOut()}
      className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-red-200 hover:text-red-800 md:flex-none md:justify-start md:p-2 md:px-3"
    >
      <Power className="w-6" />
      <div className="hidden md:block">Sign Out</div>
    </button>
  );
};

export default SignOutButton;
