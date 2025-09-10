import CategoryCard from "@/_app/common/components/CategoryCard";
import { useQuery } from "@apollo/client";
import { Skeleton, Text, Title } from "@mantine/core";
import { GET_CATEGORIES } from "./utils/query.gql";
import { JobCategoryWithPagination } from "@/_app/gql-types/graphql";

const CategoriesPage = () => {
  const { data, loading } = useQuery<{
    jobCategories: JobCategoryWithPagination;
  }>(GET_CATEGORIES, {
    variables: {
      input: {
        limit: -1,
      },
    },
  });

  return (
    <div className="mt-6 text-center">
      <div className="my-20">
        <Title
          className="font-title dark:text-white text-[56px] leading-[61px]"
          order={1}
        >
          Explore by Category
        </Title>
        <Text className="leading-[26px] mt-7">
          Find internships across various fields. Whether it's design,
          marketing, or tech, choose the category that matches your career goals
          and start applying.
        </Text>
      </div>

      <div className="py-[72px]  dark:bg-[#0E141B] bg-gray-50">
        <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-2 wrapper">
          {data?.jobCategories.nodes?.map((category) => (
            <CategoryCard category={category} />
          ))}

          {loading &&
            [1, 2, 3, 4, 5, 6, 7, 8].map(() => <Skeleton height={100} />)}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
