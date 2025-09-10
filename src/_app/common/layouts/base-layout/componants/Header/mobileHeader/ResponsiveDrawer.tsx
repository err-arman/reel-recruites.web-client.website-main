import { Burger, Drawer, Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import ResponsiveDrawerMenu from "./component/ResponsiveDrawerMenu";
import AuthProfileDropdown from "@/_app/common/components/AuthProfileDropdown";

const ResponsiveDrawer = () => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <div className="lg:hidden">
      <Drawer
        size="sm"
        opened={opened}
        onClose={close}
        className="bg-purple-600"
      >
        <ResponsiveDrawerMenu />
      </Drawer>
      <Flex gap={"sm"}>
        <AuthProfileDropdown />
        <Burger
          size="md"
          opened={opened}
          onClick={open}
          aria-label="Toggle navigation"
        />
      </Flex>
    </div>
  );
};

export default ResponsiveDrawer;
