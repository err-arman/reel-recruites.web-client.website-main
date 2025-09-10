import EmptyState from "@/_app/common/components/EmptyState";
import JobCardHorizontalSkeleton from "@/_app/common/components/JobCardHorizontalSkeleton";
import { PromotionalVideosWithPagination } from "@/_app/gql-types/graphql";
import useQueryParams from "@/_app/hooks/use-query-state";
import { useQuery } from "@apollo/client";
import { Pagination, Text, Title } from "@mantine/core";
import PromotionalVideoCard from "../home/components/PromotionalVideoCard";
import { PROMOTIONAL_VIDEOS_QUERY } from "../home/utils/query.gql";

const PromotionalVideosPage = () => {
  const [queryString, setQueryString] = useQueryParams({
    page: "1",
    limit: "9",
  });

  const { data: promotionalData, loading } = useQuery<{
    promotionalVideos__public: PromotionalVideosWithPagination;
  }>(PROMOTIONAL_VIDEOS_QUERY, {
    variables: {
      input: {
        limit: parseInt(queryString.limit),
        page: parseInt(queryString.page),
      },
    },
  });

  return (
    <div>
      {/* Hero */}
      <div className="wrapper">
        <div className="my-20 text-center">
          <Title className="text-[56px] dark:text-white mb-7">
            Promotional Videos
          </Title>
          <Text className=" dark:text-link">
            At OpportunityHub, we understand the power of meaningful work
            meticulously designed.
          </Text>
        </div>
      </div>

      <div className="dark:bg-[#0E141B] bg-gray-50 rounded-md ">
        <div className="wrapper">
          <section className="grid md:grid-cols-3 grid-cols-1 rounded gap-[30px] pb-10">
            {loading && (
              <>
                <JobCardHorizontalSkeleton />
                <JobCardHorizontalSkeleton />
                <JobCardHorizontalSkeleton />
                <JobCardHorizontalSkeleton />
                <JobCardHorizontalSkeleton />
                <JobCardHorizontalSkeleton />
                <JobCardHorizontalSkeleton />
              </>
            )}

            {promotionalData?.promotionalVideos__public?.nodes?.map((video) => (
              <PromotionalVideoCard video={video} isDetailsShow={true} />
            ))}
          </section>

          {!promotionalData?.promotionalVideos__public?.nodes?.length &&
          !loading ? (
            <EmptyState label={"No promotional videos found!"} />
          ) : null}

          {!loading &&
            promotionalData?.promotionalVideos__public?.nodes?.length &&
            promotionalData?.promotionalVideos__public?.nodes?.length > 0 && (
              <Pagination
                className="pb-10 my-20"
                value={parseInt(queryString.page)}
                onChange={(page) => setQueryString({ page: page.toString() })}
                total={
                  promotionalData?.promotionalVideos__public?.meta
                    ?.totalPages ?? 0
                }
              />
            )}
        </div>
      </div>
    </div>
  );
};

export default PromotionalVideosPage;
