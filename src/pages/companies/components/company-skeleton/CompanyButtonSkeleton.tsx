import { Skeleton } from '@mantine/core';


const CompanyButtonSkeleton = () => {
  return (
    <div className="flex justify-between w-full items-center">
      <div className="flex flex-col bg-white rounded-md  dark:bg-night-500 gap-4 p-6 w-6/12">
        <div className="flex item-center gap-2">
          <Skeleton height={40} width="30%" radius="xl" circle />
          <Skeleton height={8} mt={12} width="10%" radius="xl" />
        </div>
        <Skeleton height={8} width="40%" radius="xl" />
      </div>
      <Skeleton height={46} width="10%" radius="sm" />
    </div>
  );
}

export default CompanyButtonSkeleton