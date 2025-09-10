import { Skeleton } from "@mantine/core";


const RecentJobSkeleton = () => {
  return (
    <div className="my-10 md:w-9/12">
      <div className="flex justify-between wrapper">
        <Skeleton h={10} w="15%" mb={8} />
        <Skeleton h={40} w="15%" mb={8} />
      </div>

      <div className="flex  gap-6 p-5 my-10 bg-gray-100 rounded dark:bg-night-600 justify-center items-center">
       
          <Skeleton h={50} w="10%" />

          <Skeleton h={10} w="20%" />
          <Skeleton h={10} w="30%" />
     
        
        <Skeleton h={10} w="30%" />
      </div>
    </div>
  );
}

export default RecentJobSkeleton