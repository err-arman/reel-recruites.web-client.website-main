import { Skeleton } from '@mantine/core';


const CompanyProfileSkeleton = () => {
  return (
    <div className="flex flex-col bg-white rounded-md  dark:bg-night-500 gap-4">
      <Skeleton height={8} mt={6} width="10%" radius="xl"/>
      <Skeleton height={542} />
    </div>
  );
}

export default CompanyProfileSkeleton