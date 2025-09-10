import { userAtom } from "@/_app/store/user.store";
import { confirmModal } from "@/_app/utils/confirm";
import { getFileUrl } from "@/_app/utils/getFileUrl";
import { Avatar, Menu } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { MdDashboardCustomize, MdSave, MdSettings } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaUserCheck } from "react-icons/fa";

const AuthProfileDropdown = () => {
  const [currentUser] = useAtom(userAtom);

  const handleLogout = () => {
    confirmModal({
      title: "Sure to logout?",
      isDangerous: true,
      confirmLabel: "Logout",
      cancelLabel: "Stay logged in",
      onConfirm() {
        localStorage.removeItem("accessToken");
        window.location.href = "/auth/signin";
      },
    });
  };

  return (
    <Menu shadow="md" width={150} data-testid="user-avatar-dropdown">
      {currentUser && (
        <Menu.Target>
          <Avatar
            color="gray"
            radius="xl"
            src={getFileUrl(currentUser?.avatar!)}
            className="cursor-pointer"
          >
            {currentUser?.name?.slice(0, 1)}
          </Avatar>
        </Menu.Target>
      )}

      <Menu.Dropdown>
        <Menu.Item
          leftSection={<FaUserCheck />}
          component={Link}
          to={`/profile/${currentUser?._id}`}
        >
          My Profile
        </Menu.Item>
        <Menu.Item
          leftSection={<MdDashboardCustomize />}
          component={Link}
          to={"/dashboard"}
        >
          Dashboard
        </Menu.Item>
        <Menu.Item
          leftSection={<MdSave />}
          component={Link}
          to={"/dashboard/saved"}
        >
          Saved
        </Menu.Item>
        <Menu.Item
          leftSection={<MdSettings />}
          component={Link}
          to={"/dashboard/profile-settings"}
        >
          Settings
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          onClick={handleLogout}
          leftSection={<IconLogout size={16} />}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default AuthProfileDropdown;
