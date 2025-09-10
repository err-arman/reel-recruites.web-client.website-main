import { User } from "@/_app/gql-types/graphql";
import { userAtom } from "@/_app/store/user.store";
import { useQuery } from "@apollo/client";
import { Paper, Text, Title } from "@mantine/core";
import axios from "axios";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { MY_LIKED__JOBS__QUERY } from "../saved/utils/query";

const DashboardPage = () => {
  const [data, setData] = useState<any>([]);
  const [_user] = useAtom(userAtom);

  const totalApplications = data?.reduce(
    (application: number, currentValue: number) => application + currentValue,
    0
  );

    const { data: likeJobs } = useQuery<{
      me: User;
    }>(MY_LIKED__JOBS__QUERY);

  useEffect(() => {
    const months = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    if (!_user) {
      return;
    }

    axios
      .get(
        "https://api.reel-recruits.com/dashboard/application-summary?userId=" +
          _user?._id
      )
      .then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          months[res.data[i]?._id?.month - 1] = res.data[i]?.applicants;
        }
        setData(months);
      });
  }, [_user]);

  const [options] = useState({
    chart: {
      id: "apexchart-example",
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
  });

  return (
    <div>
      <div className="flex justify-between gap-2">
        <div className="flex gap-3">
          <Paper shadow="md" p={"md"}>
            <Title order={4}>Number of Applications</Title>
            <Text>{totalApplications}</Text>
          </Paper>
          <Paper shadow="md" p={"md"}>
            <Title order={4}>Saved jobs</Title>
            <Text>{likeJobs?.me?.likedJobs?.length}</Text>
          </Paper>
        </div>
       
      </div>
      <div className="w-full">
        <Chart
          options={options}
          series={[
            {
              name: "Number of Applications",
              data,
            },
          ]}
          type="area"
          width="100%"
          height={420}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
