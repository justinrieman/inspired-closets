// @ts-nocheck
'use client';

import Topnav from '@/components/dashboard/inventory/Topnav';
import TopnavDropdown from '@/components/dashboard/inventory/TopnavDropdown';

import useScreenSize from '@/components/useScreenSize';

const ComponentsPage = () => {
  const screenSize = useScreenSize();

  return <>{screenSize.width >= 1020 ? <Topnav /> : <TopnavDropdown />}</>;
};

export default ComponentsPage;
