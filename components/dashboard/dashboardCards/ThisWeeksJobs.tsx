import React from 'react';
import { Drill } from 'lucide-react';
import Link from 'next/link';

const upcomingJobs = [
  { name: 'Justin', date: 'Thursday', status: 'Complete' },
  { name: 'Oprah', date: 'Thursday', status: 'Complete' },
  { name: 'Zuckerberg', date: 'Friday', status: 'Complete' },
  { name: 'Obama', date: 'Monday', status: 'In progress' },
  { name: 'Suzuki', date: 'Monday', status: 'Complete' },
  { name: 'Lee', date: 'Tuesday', status: 'In progress' },
  { name: 'Someone Else', date: 'Tuesday', status: 'Complete' },
];

const ThisWeeksJobs = () => {
  return (
    <>
      <div className="xl:max-w-md">
        <div className="flex justify-between rounded-t-md px-6 py-2 mt-8 bg-red-800 ">
          <h1 className="text-gray-50">Upcoming Jobs</h1>
          <Drill className="text-gray-50" />
        </div>

        <div className="bg-gray-100 p-2 border border-gray-200 rounded-b-lg shadow">
          {upcomingJobs.map((job) => (
            //This key probably needs to change when there are actual jobs
            <div key={job.name}>
              <div className="flex rounded-md p-2 hover:bg-gray-200 w-full items-center justify-between">
                <div className="flex-1 m-1">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    {job.name}
                  </p>
                </div>
                <div className="flex-1 text-center">
                  <p className="text-sm">{job.date}</p>
                </div>
                <div className="flex-1 text-right">
                  {job.status === 'In progress' && (
                    <p className="text-orange-500 text-sm">{job.status}</p>
                  )}
                  {job.status === 'Complete' && (
                    <p className="text-green-700 text-sm">{job.status}</p>
                  )}
                </div>
              </div>
              {job.name !== upcomingJobs[upcomingJobs.length - 1].name && (
                <hr className="m-2"></hr>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ThisWeeksJobs;
