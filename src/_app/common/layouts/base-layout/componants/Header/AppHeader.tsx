import {
  ActionIcon,
  Anchor,
  Divider,
  Image,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";

import AuthProfileDropdown from "@/_app/common/components/AuthProfileDropdown";
import { userAtom } from "@/_app/store/user.store";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { Link } from "react-router-dom";
import ResponsiveDrawer from "./mobileHeader/ResponsiveDrawer";
import { navlinks } from "./menu.config";

const AppHeader = () => {
  const [currentUer] = useAtom(userAtom);
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  return (
    <div className="flex items-center">
      <div className="flex items-center justify-between w-full gap-6 px-3 py-4 lg:px-7 md:gap-6 ">
        <Link to={"/"}>
          <Image
            fit="fill"
            className="w-32 h-10"
            src={
              computedColorScheme === "dark"
                ? "/images/white-logo.svg"
                : "/images/dark-logo.svg"
            }
            alt="brand_logo"
          />
        </Link>

        <div className="justify-between hidden w-10/12 gap-4 lg:flex">
          <div className="flex items-center justify-center w-6/12 gap-4">
            {navlinks.map((link, idx: number) => (
              <Anchor
                key={idx}
                component={Link}
                to={link.href}
                underline="never"
                className="text-dark dark:text-white"
              >
                {link.label}
              </Anchor>
            ))}
          </div>

          <div className="flex items-center justify-end w-4/12 gap-3">
            <ActionIcon
              onClick={() =>
                setColorScheme(
                  computedColorScheme === "light" ? "dark" : "light"
                )
              }
              variant="default"
              className="w-[32px] h-[32px] rounded-full"
              aria-label="Toggle color scheme"
            >
              {computedColorScheme === "light" ? (
                <IconMoon stroke={1.5} />
              ) : (
                <IconSun stroke={1.5} />
              )}
            </ActionIcon>
            {currentUer ? (
              <AuthProfileDropdown />
            ) : (
              <div className="flex items-center gap-3">
                <Link className="block outline-button" to={"/auth/signin"}>
                  Login
                </Link>
                <Link to={"/auth/signup"} className="block outline-button">
                  Register Now
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <Divider color={computedColorScheme === "dark" ? "gray.9" : "gray.4"} />
      <ResponsiveDrawer />
    </div>
  );
};

export default AppHeader;
