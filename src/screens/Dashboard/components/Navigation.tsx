import {
  Button,
  Flex,
  Item,
  TabList,
  TabPanels,
  Tabs,
  View,
} from "@adobe/react-spectrum";
import { SPACING } from "app/theme";
import { useTheme } from "app/theme/Theme";
import { useAuth } from "context/auth";
import { useMemo } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const Navigation = () => {
  const { removeSession } = useAuth();
  const navigate = useNavigate();
  const { changeTheme } = useTheme();
  const location = useLocation();

  const currentRoute: any = useMemo(
    () => location?.pathname.split("/")[2],
    [location]
  );

  const onSelect = (key: any) => {
    if (key === "logout") {
      return removeSession();
    } else if (key === "changeTheme") {
      return changeTheme();
    }
    navigate(String(key));
  };

  return (
    <Tabs onSelectionChange={onSelect} defaultSelectedKey={currentRoute}>
      <Flex justifyContent="center">
        <TabList>
          <Item key=".">Stats</Item>
          <Item key="live">Live</Item>
          <Item key="notifications">Notifications</Item>
          <Item key="changeTheme">theme</Item>
          <Item key="logout">Logout</Item>
        </TabList>
      </Flex>
    </Tabs>
  );
};
export default Navigation;
