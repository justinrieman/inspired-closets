import InventorySnapshot from '@/components/dashboard/dashboardCards/InventorySnapshot';
import React from 'react';

const DashboardPage = () => {
  return (
    <div>
      <h1 className="text-center text-2xl font-semibold text-red-800">
        Inspired Closets Dashboard
      </h1>
      <hr className="my-4"></hr>
      <InventorySnapshot />
    </div>
  );
};

export default DashboardPage;
