import { Button, Menu } from "@mantine/core";
import { IconShare } from "@tabler/icons-react";
import { FaFacebook, FaLinkedin, FaTwitter, FaWhatsapp } from "react-icons/fa";

type ServiceType = "facebook" | "twitter" | "linkedin" | "whatsapp";
interface IShare {
  service: ServiceType;
  url?: string;
  text?: string;
}

interface IShareButton {
  url?: string;
  text?: string;
}

const ShareButton: React.FC<IShareButton> = ({ url, text }) => {
  const sharePage = (options: IShare) => {
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

    switch (options.service) {
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${options.url}`,
          "pop",
          "width=600, height=400, scrollbars=no"
        );
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${options.text}&url=${options.url}`,
          "pop",
          "width=600, height=400, scrollbars=no"
        );
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/shareArticle?mini=true&url=${options.url}&title=${options.text}&summary=${options.text}`,
          "pop",
          "width=600, height=400, scrollbars=no"
        );
        break;
      case "whatsapp":
        window.open(
          `https://api.whatsapp.com/send?text=${options.text} ${options.url}`,
          "pop",
          "width=600, height=400, scrollbars=no"
        );
        break;
    }
  };

  return (
    <Menu>
      <Menu.Target>
        <Button
          variant="outline"
          size="md"
          leftSection={<IconShare size={20} />}
        >
          Share{" "}
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          fz={"md"}
          leftSection={<FaFacebook />}
          onClick={() =>
            sharePage({
              service: "facebook",
              url: url ?? window.location.href,
              text: text ?? window.location.href,
            })
          }
        >
          Facebook
        </Menu.Item>
        <Menu.Item
          fz={"md"}
          leftSection={<FaTwitter />}
          onClick={() =>
            sharePage({
              service: "twitter",
              url: url ?? window.location.href,
              text: text ?? window.location.href,
            })
          }
        >
          Twitter
        </Menu.Item>
        <Menu.Item
          fz={"md"}
          leftSection={<FaLinkedin />}
          onClick={() =>
            sharePage({
              service: "linkedin",
              url: url ?? window.location.href,
              text: text ?? window.location.href,
            })
          }
        >
          LinkedIn
        </Menu.Item>
        <Menu.Item
          fz={"md"}
          leftSection={<FaWhatsapp />}
          onClick={() =>
            sharePage({ service: "whatsapp", text: text ?? "", url: url ?? "" })
          }
        >
          WhatsApp
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ShareButton;
