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
            to={"/auth/signin"}
            size="compact-md"
            variant="outline"
            color="gray"
            fs={"lg"}
          >
            Login
          </Button>
          <Button
            component={Link}
            to={"/auth/signup"}
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
