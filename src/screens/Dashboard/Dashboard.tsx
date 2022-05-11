import { Flex, View } from "@adobe/react-spectrum";
import { Button } from "@react-spectrum/button";
import { useAuth } from "context/auth";
import { Route, Routes } from "react-router-dom";
import { Navigation } from "./components";
import { Live, Stats } from "./screens";
import { Notifications } from "./screens/Notifications";

function Dashboard() {
  const { removeSession } = useAuth();
  return (
    <Flex direction="column" gap={"size-10"} height="100%">
      <Navigation />
      <Routes>
        <Route element={<Stats />} index />
        <Route element={<Live />} path="live" />
        <Route element={<Notifications />} path="notifications" />
      </Routes>
    </Flex>
  );
}

export default Dashboard;
