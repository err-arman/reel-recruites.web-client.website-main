import EmptyState from "@/_app/common/components/EmptyState";
import { User } from "@/_app/gql-types/graphql";
import RecentJobCard from "@/pages/companies/components/RecentJobCard";
import { useQuery } from "@apollo/client";
import { Button, Space, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import { MY_LIKED__JOBS__QUERY } from "./utils/query";

const SavedPage = () => {
  const { data, loading } = useQuery<{
    me: User;
  }>(MY_LIKED__JOBS__QUERY);

  return (
    <div>
      <div>
        <Title order={3} fw={700}>
          Saved Jobs
        </Title>
        <Space h={20} />

        <div className="grid gap-5">
          {data?.me?.likedJobs?.map((job, idx) => (
            <RecentJobCard job={job} key={idx} />
          ))}
        </div>
      </div>
      {/*  */}

      {!data?.me?.likedJobs?.length && !loading ? (
        <div className="place-content-center">
          <EmptyState
            label="You didn't saved any job yet"
            Actions={
              <Button component={Link} to={"/jobs"}>
                Explore jobs
              </Button>
            }
          />
        </div>
      ) : null}
    </div>
  );
};

export default SavedPage;
