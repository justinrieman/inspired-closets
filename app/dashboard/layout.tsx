import Header from '@/components/dashboard/Header';
import Sidenav from '@/components/dashboard/Sidenav';

import React from 'react';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <Sidenav />
      </div>

      <div className="flex-grow px-4 md:overflow-y-auto md:p-8">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;