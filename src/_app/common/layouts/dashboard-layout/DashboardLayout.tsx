import { AppNavLink } from "@/_app/models/AppNavLink.model";
import {
  ActionIcon,
  AppShell,
  Burger,
  Flex,
  Image,
  NavLink,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { Link, Outlet, useLocation } from "react-router-dom";
import AuthProfileDropdown from "../../components/AuthProfileDropdown";

interface Prop {
  navlinks: AppNavLink[];
  title?: string;
  path: string;
}

const DashboardLayout: React.FC<Prop> = ({ navlinks, path }) => {
  const { setColorScheme } = useMantineColorScheme();
  const [opened, { toggle }] = useDisclosure();
  const { pathname } = useLocation();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header p="sm">
        <div className=" w-full">
          <Flex justify={"space-between"} align={"center"} px={20}>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
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
            <div className="flex items-center gap-2">
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
              <AuthProfileDropdown />
            </div>
          </Flex>
        </div>
      </AppShell.Header>

      <AppShell.Navbar>
        {/* <div className="py-2 pl-4">
          {title && <Title order={5}>{title}</Title>}
        </div> */}
        {navlinks.map((item, index) => (
          <NavLink
            key={index}
            label={item.label}
            component={Link}
            to={`/${path}/${item?.href}`}
            leftSection={item.icon}
            active={pathname.includes(item?.href as string)}
          >
            {item?.children &&
              item.children.map((_item, key) => (
                <NavLink
                  key={key}
                  label={_item.label}
                  component={Link}
                  px={"xs"}
                  py={2}
                  active={pathname.startsWith(
                    `/${path}/${item?.href}/${_item.href}`
                  )}
                  to={`/${path}/${item?.href}/${_item.href}`}
                />
              ))}
          </NavLink>
        ))}
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default DashboardLayout;
