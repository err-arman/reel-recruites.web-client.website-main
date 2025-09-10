import { Skeleton } from "@mantine/core";

const JobDetailsSkeleton = () => {
  return (
    <div className="py-6 wrapper">
      <Skeleton height={8} mb={40} width="12%" radius="md" />
      <Skeleton height={8} mt={6} width="16%" radius="md" />
      <Skeleton height={8} mt={6} width="20%" radius="md" />
      <div className="flex  justify-between gap-8 my-6">
        <div>
          <div className="">
            <Skeleton
              height="450px"
              width="770px"
              radius="sm"
              className="max-w-3xl"
            />
          </div>
        </div>
        <div className="py-6 pl-6  bg-gray-100 rounded md:w-4/12 md:p-8 dark:bg-night-600">
          <div className="flex items-center gap-2 mb-4">
            <Skeleton height={20} mt={6} width={20} radius="100%" />
            <Skeleton height={8} mt={6} width="40%" radius="sm" />
          </div>
          <Skeleton height={8} mt={6} width="40%" radius="sm" />
          <Skeleton height={40} mt={6} width="100%" radius="sm" />

          <div className="job-details-mini-bg mt-6 ">
            <div className="">
              <Skeleton height={8} mt={8} width="40%" radius="sm" />
              <Skeleton height={8} mt={8} width="40%" radius="sm" />
            </div>
            <div className="my-4">
              <Skeleton height={8} mt={8} width="40%" radius="sm" />
              <Skeleton height={8} mt={8} width="40%" radius="sm" />
            </div>
            <div>
              <Skeleton height={8} mt={8} width="40%" radius="sm" />
              <Skeleton height={8} mt={8} width="40%" radius="sm" />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="max-w-3xl dark:primary-bg shadow-md rounded mb-[30px] dark:bg-night-600 p-6">
          <Skeleton height={12} mt={6} mb={30} width="20%" radius="xl" />
          <Skeleton height={8} mt={6} width="80%" radius="xl" />
          <Skeleton height={8} mt={6} width="80%" radius="xl" />
          <Skeleton height={8} mt={6} width="80%" radius="xl" />
          <Skeleton height={8} mt={6} width="80%" radius="xl" />
          <Skeleton height={8} mt={6} width="70%" radius="xl" />
          <Skeleton height={8} mt={6} width="70%" radius="xl" />
        </div>
        <div className="max-w-3xl dark:primary-bg shadow-md rounded mb-[30px] dark:bg-night-600 p-6">
          <Skeleton height={12} mt={6} mb={30} width="20%" radius="xl" />
          <Skeleton height={8} mt={6} width="80%" radius="xl" />
          <Skeleton height={8} mt={6} width="80%" radius="xl" />
          <Skeleton height={8} mt={6} width="80%" radius="xl" />
          <Skeleton height={8} mt={6} width="80%" radius="xl" />
          <Skeleton height={8} mt={6} width="70%" radius="xl" />
          <Skeleton height={8} mt={6} width="70%" radius="xl" />
        </div>

       

        <div className="flex mt-6 mb-8">
          <Skeleton height={40} mt={6} width="12%" radius="sm" />
        </div>
      </div>
    </div>
  );
};

export default JobDetailsSkeleton;
