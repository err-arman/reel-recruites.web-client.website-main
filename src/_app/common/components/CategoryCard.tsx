import { JobCategory } from "@/_app/gql-types/graphql";
import { getFileUrl } from "@/_app/utils/getFileUrl";
import { Image, Text } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";

interface Prop {
  // category?: JobCategory;
  category?: JobCategory;
}

const CategoryCard: React.FC<Prop> = ({ category }) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-md shadow-md dark:bg-night-500">
      {/* <pre>{JSON.stringify(categoriesFilterData, null, 2)}</pre> */}

      <Image
        h={40}
        w={40}
        src={getFileUrl(category?.logo!)}
        alt="category-image"
      />
      <div className="flex flex-col text-left">
        <Text className="dark:text-white line-clamp-1">
          <Link to={`/jobs?categories=${category?._id}`}>{category?.name}</Link>
        </Text>
        <Text className="text-sm dark:text-link line-clamp-2">
          {category?.shortDescription}
        </Text>
      </div>
    </div>
  );
};

export default CategoryCard;
