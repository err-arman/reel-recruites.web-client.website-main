import { Company } from "@/_app/gql-types/graphql";
import { Flex, Skeleton, Tabs, Text, Title } from "@mantine/core";
import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconBrandYoutube,
} from "@tabler/icons-react";
import { useState } from "react";

interface Props {
  company?: Company;
}

const CompanyTabSection: React.FC<Props> = ({ company }) => {
  const [activeTab, setActiveTab] = useState<string | null>("first");

  //  const { data } = useQuery<{ jobs__public: JobsWithPagination }>(GET_ALL_JOBS, {
  //    variables: {
  //      where: {
  //        filters: {
  //          key: "company",
  //          operator: MatchOperator.Eq,
  //          value: companyId,
  //        },
  //      },
  //    },
  //  });

  return (
    <div className="my-10 lg:flex md:justify-center md:gap-7">
      <div className="md:w-8/12">
        <Tabs color="dark:gray" value={activeTab} onChange={setActiveTab}>
          <Tabs.List my={20}>
            {true && <Skeleton />}
            <Tabs.Tab className="text-lg" value="first">
              Overview
            </Tabs.Tab>
            {/* <Tabs.Tab className="text-lg" value="third">
              Jobs
            </Tabs.Tab>
            <Tabs.Tab className="text-lg" value="second">
              People
            </Tabs.Tab> */}
          </Tabs.List>

          <Tabs.Panel className="leading-[25px] text-md" value="first">
            {company?.longDescription}
          </Tabs.Panel>
          {/* <Tabs.Panel value="second" className="leading-[25px] text-md">
            ricoloured and standpoint mechanic. The presented because and
            breakfasts. All small to contribution the succeeded based of top
            follow seemed and had overgrown people, a to has earnestly
            remodelling scale, into guard to funny up to or ancient never
            outfits ricoloured and standpoint mechanic. The presented because
            and breakfasts. All small to contribution the succeeded based of top
            follow seemed and had overgrown people, a to has earnestly
            remodelling scale, into guard to funny up to or ancient never
            outfits
          </Tabs.Panel>
          <Tabs.Panel value="third" className="leading-[25px] text-md">
            In the to that at plainly bathroom what mouth. Approved prudently,
            world readiness its and that copy doctor legislators, are client a
            the travelling, feedback completely and suppliers, has croissants
            the I hungrier don't reassuring the chance text to there of
            attributing there technology logging a got tones. In the to that at
            plainly bathroom what mouth. Approved prudently, world readiness its
            and that copy doctor legislators, are client a the travelling,
            feedback completely and suppliers, has croissants the I hungrier
            don't reassuring the chance text to there of attributing there
            technology logging a got tones.
          </Tabs.Panel> */}
        </Tabs>
      </div>

      <div className="py-6 pl-6 mt-4 bg-gray-100 rounded md:w-4/12 md:py-12 md:pl-12 dark:bg-night-600">
        <Title className="leading-[26px] text-base">
          About {company?.name}
        </Title>

        {company?.website && (
          <div className="mb-5 mt-7">
            <Text>Website</Text>
            <a href={company?.website} target="_blank" className="no-underline">
              {company?.website}
            </a>
          </div>
        )}

        {/* <div className="mb-5">
          <Text>Location</Text>
          <Text>{company?.location?.address}</Text>
        </div> */}

        {company?.companySize && (
          <div className="mb-5">
            <Text>Company Size</Text>
            <Text>{company?.companySize} people</Text>
          </div>
        )}

        <Flex gap={"sm"}>
          {company?.socialLinks?.facebook && (
            <a
              href={company?.socialLinks?.facebook}
              target="_blank"
              className="flex items-center justify-center w-8 h-8 transition-all duration-300 border border-black border-solid rounded-full group dark:border-gray-200 dark:hover:bg-gray-200 hover:bg-black"
            >
              <IconBrandFacebook
                className="text-center text-black dark:text-white hover:text-gray-200 dark:group-hover:text-black group-hover:text-white"
                size={20}
              />
            </a>
          )}

          {company?.socialLinks?.twitter && (
            <a
              href={company?.socialLinks?.twitter}
              target="_blank"
              className="flex items-center justify-center w-8 h-8 transition-all duration-300 border border-black border-solid rounded-full group dark:border-gray-200 dark:hover:bg-gray-200 hover:bg-black"
            >
              <IconBrandTwitter
                className="text-center text-black dark:text-white hover:text-gray-200 dark:group-hover:text-black group-hover:text-white"
                size={20}
              />
            </a>
          )}
          {company?.socialLinks?.github && (
            <a
              href={company?.socialLinks?.github}
              target="_blank"
              className="flex items-center justify-center w-8 h-8 transition-all duration-300 border border-black border-solid rounded-full group dark:border-gray-200 dark:hover:bg-gray-200 hover:bg-black"
            >
              <IconBrandGithub
                className="text-center text-black dark:text-white hover:text-gray-200 dark:group-hover:text-black group-hover:text-white"
                size={20}
              />
            </a>
          )}
          {company?.socialLinks?.linkedin && (
            <a
              href={company?.socialLinks?.linkedin}
              target="_blank"
              className="flex items-center justify-center w-8 h-8 transition-all duration-300 border border-black border-solid rounded-full group dark:border-gray-200 dark:hover:bg-gray-200 hover:bg-black"
            >
              <IconBrandLinkedin
                className="text-center text-black dark:text-white hover:text-gray-200 dark:group-hover:text-black group-hover:text-white"
                size={20}
              />
            </a>
          )}
          {company?.socialLinks?.youtube && (
            <a
              href={company?.socialLinks?.youtube}
              target="_blank"
              className="flex items-center justify-center w-8 h-8 transition-all duration-300 border border-black border-solid rounded-full dark:border-gray-200 dark:hover:bg-gray-200 hover:bg-black"
            >
              <IconBrandYoutube
                className="text-center text-black dark:text-white hover:text-gray-200 dark:hover:text-black group-hover:text-white"
                size={20}
              />
            </a>
          )}
        </Flex>
      </div>
    </div>
  );
};

export default CompanyTabSection;
