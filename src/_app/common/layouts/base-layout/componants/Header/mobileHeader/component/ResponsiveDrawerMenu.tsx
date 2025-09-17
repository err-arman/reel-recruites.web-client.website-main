import { Anchor, Button } from "@mantine/core";
import { Link } from "react-router-dom";
import { navlinks } from "../../menu.config";
import { useAtom } from "jotai";
import { userAtom } from "@/_app/store/user.store";

const ResponsiveDrawerMenu = () => {
  const [_user] = useAtom(userAtom);

  return (
    <div className="flex flex-col content-between justify-between max-h-full gap-6">
      <div className="flex flex-col gap-4">
        {navlinks.map((link, idx: number) => (
          <Anchor
            key={idx}
            underline="never"
            className="text-dark dark:text-white"
            component={Link}
            to={link?.href}
          >
            {link?.label}
          </Anchor>
        ))}
      </div>

      {!_user && (
        <div className="flex flex-col gap-4">
          <Button
            component={Link}
            to={`${import.meta.env.VITE_SSO_SERVER_URL}/login?token=${import.meta.env.VITE_SSO_TOKEN}&redirect_url=${import.meta.env.VITE_SSO_REDIRECT_URL}`}
            size="compact-md"
            variant="outline"
            color="gray"
            fs={"lg"}
          >
            Login
          </Button>
          <Button
            component={Link}
            to={`${import.meta.env.VITE_SSO_SERVER_URL}/register?token=${import.meta.env.VITE_SSO_TOKEN}&redirect_url=${import.meta.env.VITE_SSO_REDIRECT_URL}`}
            size="compact-sm"
            variant="white"
            color="dark"
          >
            Register Now
          </Button>
        </div>
      )}
    </div>
  );
};

export default ResponsiveDrawerMenu;
