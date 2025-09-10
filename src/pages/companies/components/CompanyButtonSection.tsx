import { Company } from "@/_app/gql-types/graphql";
import { getFileUrl } from "@/_app/utils/getFileUrl";
import { Button, Image, Menu, Text } from "@mantine/core";
import { IconShare } from "@tabler/icons-react";
import { FaFacebook, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";

interface Props {
  company?: Company;
}

const CompanyButtonSection: React.FC<Props> = ({ company }) => {
  // make a function to share current page

  const sharePage = (shareOriginUrl: string) => {
    // make a function to share current page
    // for facebook, twitter, linkedin, whatsapp
    // for facebook
    // https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.google.com%2F
    // for twitter
    // https://twitter.com/intent/tweet?text=Hello%20world
    // for linkedin
    // https://www.linkedin.com/shareArticle?mini=true&url=https://www.google.com/&title=Google&summary=Google
    // for whatsapp
    // https://api.whatsapp.com/send?text=The text to share!

    // open popup

    window.open(
      `${shareOriginUrl}=${window.location.href}`,
      "pop",
      "width=600, height=400, scrollbars=no"
    );
  };

  return (
    <div className="flex flex-col justify-between gap-3 md:flex-row mb-14">
      <div>
        <div className="flex items-center gap-4">
          {company?.logo && (
            <Image
              className="w-10 rounded-full"
              src={getFileUrl(company?.logo!)}
            />
          )}

          <Text className="text-2xl leading-[26px] dark:text-white">
            {company?.name}
          </Text>
        </div>
        <Text className="sm:text-xs lg:text-base sm:leading-1">
          {company?.shortDescription}
        </Text>
      </div>
      <div className="flex items-center flex-none gap-3">
        <Menu>
          <Menu.Target>
            <Button
              variant="outline"
              leftSection={<IconShare size={20} />}
              size="md"
            >
              Share{" "}
            </Button>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              fz={"md"}
              leftSection={<FaFacebook />}
              onClick={() =>
                sharePage("https://www.facebook.com/sharer/sharer.php?u")
              }
            >
              Facebook
            </Menu.Item>
            <Menu.Item
              fz={"md"}
              leftSection={<FaTwitter />}
              onClick={() => sharePage("https://twitter.com/intent/tweet?text")}
            >
              Twitter
            </Menu.Item>
            <Menu.Item
              fz={"md"}
              leftSection={<FaLinkedin />}
              onClick={() =>
                sharePage(
                  "https://www.linkedin.com/shareArticle?mini=true&url=https://www.google.com/&title=Google&summary"
                )
              }
            >
              LinkedIn
            </Menu.Item>
            <Menu.Item
              fz={"md"}
              leftSection={<FaWhatsapp />}
              onClick={() => sharePage("https://api.whatsapp.com/send?text")}
            >
              WhatsApp
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </div>
  );
};

export default CompanyButtonSection;
