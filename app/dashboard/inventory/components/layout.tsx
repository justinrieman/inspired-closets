// @ts-nocheck
'use client';

import Topnav from '@/components/dashboard/inventory/Topnav';
import TopnavDropdown from '@/components/dashboard/inventory/TopnavDropdown';

// import useScreenSize from '@/components/useScreenSize';
import { components } from '@/lib/inventory-list';

const ComponentsLayout = ({ children }: { children: React.ReactNode }) => {
  // const screenSize = useScreenSize();

  return (
    <>
      {/* {screenSize.width >= 1020 ? (
        <Topnav />
      ) : (
        <TopnavDropdown items={components} label="Components" />
      )}{' '} */}
      <Topnav />
      <div className="">{children}</div>
    </>
  );
};

export default ComponentsLayout;
