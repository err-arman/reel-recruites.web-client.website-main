import { Flex, Skeleton, Tabs } from "@mantine/core";
import { useState } from "react";


const CompanyTabSectionSkeleton = () => {
    const [activeTab, setActiveTab] = useState<string | null>("first");
  return (
    <div className="flex gap-4">
      {" "}
      <div className="md:w-8/12">
        <Tabs color="dark:gray" value={activeTab} onChange={setActiveTab}>
          <Tabs.List my={20}>
            <Skeleton h={10} w="15%" mb={8} />
          </Tabs.List>

          <Tabs.Panel className="leading-[25px] text-md" value="first">
            <Skeleton h={200} />
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
        <Skeleton h={10} w="30%" mb={8} />
        <div className="mb-5 mt-7">
          <Skeleton h={10} w="15%" mb={8} />
          <Skeleton h={10} w="30%" mb={8} />
        </div>
        <div className="mb-5">
          <Skeleton h={10} w="25%" mb={8} />
          <Skeleton h={10} w="25%" mb={8} />
        </div>
        <div className="mb-5">
          <Skeleton h={10} w="30%" mb={8} />
          <Skeleton h={10} w="30%" mb={8} />
        </div>

        <Flex gap={"sm"}>
           <Skeleton h={30} w="10%" mb={8} />
           <Skeleton h={30} w="10%" mb={8} />
           <Skeleton h={30} w="10%" mb={8} />
           <Skeleton h={30} w="10%" mb={8} />
           <Skeleton h={30} w="10%" mb={8} /> 
        </Flex>
      </div>
    </div>
  );
}

export default CompanyTabSectionSkeleton