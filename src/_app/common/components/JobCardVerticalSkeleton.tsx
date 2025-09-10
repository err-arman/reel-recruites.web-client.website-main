import { Skeleton } from "@mantine/core";

const JobCardVerticalSkeleton = () => {
  return (
    <div className="flex flex-col bg-white rounded-md shadow-md dark:bg-night-500">
      <Skeleton height={200} />
      <div className="px-4 pb-4">
        <div className="flex mt-5 mb-4 gap-2">
          <div className="flex items-center w-full gap-2">
            <Skeleton height={40} circle />
            <Skeleton height={10} radius="xl" width={"40%"} />
          </div>
          <div className="flex flex-col gap-4">
            <Skeleton height={10} width={"60%"} />
            <Skeleton height={10} radius="xl" width={"80%"} />
            <Skeleton height={35} width={"100%"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobCardVerticalSkeleton