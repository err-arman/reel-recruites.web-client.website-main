import { Divider, Flex, Image, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import Facebook from "../../../../Icons/Facebook";
import LinkedIn from "../../../../Icons/LinkedIn";

const AppFooter = () => {
  return (
    <div className="relative py-2 text-white md:py-6 footer-bg-one bg-dark footer-wrapper">
      <div className="wrapper">
        <Link to={"/"} className="inline-block mt-3 ">
          <Image
            w={179}
            h={30}
            fit="fill"
            src={"/images/white-logo.svg"}
            alt="brand_logo"
          />
        </Link>
        {/* <div className="grid gap-4 pl-4 my-6 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 md:py-6">
          <div>
            <Title order={4}>Company</Title>
            <div className="flex flex-col md:gap-2 md:mt-5 ">
              <Anchor
                href="/"
                underline="never"
                className="leading-7 text-link"
                target="_blank"
              >
                Careers
              </Anchor>
              <Anchor
                href="/"
                underline="never"
                className="leading-7 text-link"
                target="_blank"
              >
                Find category
              </Anchor>
              <Anchor
                href="/"
                underline="never"
                className="leading-7 text-link"
                target="_blank"
              >
                Contact
              </Anchor>
              <Anchor
                href="/"
                underline="never"
                className="leading-7 text-link"
                target="_blank"
              >
                Blog
              </Anchor>
              <Anchor
                href="/"
                underline="never"
                className="leading-7 text-link"
                target="_blank"
              >
                Press
              </Anchor>
              <Anchor
                href="/"
                underline="never"
                className="leading-7 text-link"
                target="_blank"
              >
                Privacy
              </Anchor>
              <Anchor
                href="/"
                underline="never"
                className="leading-7 text-link"
                target="_blank"
              >
                Terms of use
              </Anchor>
            </div>
          </div>
          <div>
            <Title order={4}>Resources</Title>
            <div className="flex flex-col md:gap-2 md:mt-5">
              <Anchor
                href="/"
                underline="never"
                className="leading-7 text-link"
                target="_blank"
              >
                Job description
              </Anchor>
              <Anchor
                href="/"
                underline="never"
                className="leading-7 text-link"
                target="_blank"
              >
                Interview questions
              </Anchor>
              <Anchor
                href="/"
                underline="never"
                className="leading-7 text-link"
                target="_blank"
              >
                Hiring resources
              </Anchor>
              <Anchor
                href="/"
                underline="never"
                className="leading-7 text-link"
                target="_blank"
              >
                Hiring templates
              </Anchor>
              <Anchor
                href="/"
                underline="never"
                className="leading-7 text-link"
                target="_blank"
              >
                Hiring tutorials
              </Anchor>
              <Anchor
                href="/"
                underline="never"
                className="leading-7 text-link"
                target="_blank"
              >
                Applicant tracking
              </Anchor>
            </div>
          </div>
          <div>
            <Title order={4}>Find a job</Title>
            <div className="flex flex-col md:gap-2 md:mt-5 ">
              <Anchor
                href="/"
                underline="never"
                className="leading-7 text-link"
                target="_blank"
              >
                Jobs in the USA
              </Anchor>
              <Anchor
                href="/"
                underline="never"
                className="leading-7 text-link"
                target="_blank"
              >
                Jobs in the France
              </Anchor>
              <Anchor
                href="/"
                underline="never"
                className="leading-7 text-link"
                target="_blank"
              >
                Contact
              </Anchor>
              <Anchor
                href="/"
                underline="never"
                className="leading-7 text-link"
                target="_blank"
              >
                Jobs in the Germany
              </Anchor>
              <Anchor
                href="/"
                underline="never"
                className="leading-7 text-link"
                target="_blank"
              >
                Jobs in worldwide
              </Anchor>
              <Anchor
                href="/"
                underline="never"
                className="leading-7 text-link"
                target="_blank"
              >
                Jobs in the Italy
              </Anchor>
              <Anchor
                href="/"
                underline="never"
                className="leading-7 text-link"
                target="_blank"
              >
                Jobs in the UK
              </Anchor>
            </div>
          </div>
          <div>
            <Title order={4}>Platform</Title>
            <div className="flex flex-col md:gap-2 md:mt-5 ">
              <Anchor
                href="/"
                underline="never"
                className="leading-7 text-link"
                target="_blank"
              >
                Pricing
              </Anchor>
              <Anchor
                href="/"
                underline="never"
                className="leading-7 text-link"
                target="_blank"
              >
                Post a job for free
              </Anchor>
              <Anchor
                href="/"
                underline="never"
                className="leading-7 text-link"
                target="_blank"
              >
                Help center
              </Anchor>
              <Anchor
                href="/"
                underline="never"
                className="leading-7 text-link"
                target="_blank"
              >
                Blog
              </Anchor>
              <Anchor
                href="/"
                underline="never"
                className="leading-7 text-link"
                target="_blank"
              >
                Security
              </Anchor>
              <Anchor
                href="/"
                underline="never"
                className="leading-7 text-link"
                target="_blank"
              >
                Partners
              </Anchor>
            </div>
          </div>
        </div> */}

        {/*  */}
        <Divider color="gray" my="sm" />
        <Flex justify={"space-between"}>
          <Text className="text-baspne leading-[26px]">
            {" "}
            {new Date().getFullYear()}&copy; reelrecruits. All Rights Reserved
          </Text>
          <Flex gap={"sm"}>
            <a
              target="_blank"
              href="https://www.facebook.com/profile.php?id=61566895664354"
            >
              <Facebook />
            </a>
            {/* <Twitter /> */}
            {/* <GooglePlus /> */}
            <a
              target="_blank"
              href="https://www.linkedin.com/company/reel-recruits-bd"
            >
              <LinkedIn />
            </a>
          </Flex>
        </Flex>
      </div>
    </div>
  );
};

export default AppFooter;
