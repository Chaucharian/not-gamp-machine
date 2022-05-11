import {
  Button,
  Content,
  Flex,
  Heading,
  ProgressCircle,
  StatusLight,
  View,
} from "@adobe/react-spectrum";
import TemperatureIcon from "@spectrum-icons/workflow/Temperature";
import HumidityIcon from "@spectrum-icons/workflow/GraphScatter";
import LightIcon from "@spectrum-icons/workflow/Efficient";
import CycleIcon from "@spectrum-icons/workflow/BranchCircle";
import { SPACING } from "app/theme";
import { Chart } from "components";
import { subDays } from "date-fns";
import { normalizeDataToChart } from "components/Chart";
import { Card } from "components/Card/Card";

const Notifications = () => {
  return (
    <Flex>
      <View padding={SPACING.small}>
        <Flex gap={SPACING.small} wrap>
          <Card
            headerProps={{
              heading: "Testing",
              icon: () => (
                <ProgressCircle
                  variant="overBackground"
                  aria-label="Loading…"
                  value={60}
                />
              ),
            }}
            bodyProps={{
              heading: "Testing",
            }}
          />
          <Card
            headerProps={{
              heading: "Testing",
              icon: () => (
                <ProgressCircle
                  variant="overBackground"
                  aria-label="Loading…"
                  value={60}
                />
              ),
            }}
            bodyProps={{
              heading: "Testing",
            }}
          />
        </Flex>
      </View>
    </Flex>
  );
};

export default Notifications;
