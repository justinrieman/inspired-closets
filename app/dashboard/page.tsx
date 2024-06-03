import InventorySnapshot from '@/components/dashboard/dashboardCards/InventorySnapshot';
import ThisWeeksJobs from '@/components/dashboard/dashboardCards/ThisWeeksJobs';
import React from 'react';

const DashboardPage = () => {
  return (
    <div className="bg-gray-50 p-4 rounded-md mt-8">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <hr className="my-2"></hr>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 lg:gap-3 xl:gap-8">
        <div className="">
          <ThisWeeksJobs />
        </div>
        <div className="">
          <InventorySnapshot />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
