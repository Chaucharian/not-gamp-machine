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
import { StatusCard } from "./components";
import { Chart } from "components";
import { useChart } from "./hooks/useChart";
import { subDays } from "date-fns";
import { normalizeDataToChart } from "components/Chart";

const Stats = () => {
  const yesterday = new Date(subDays(new Date(), 2)).getTime();
  const today = new Date().getTime();
  const { data } = useChart({ from: yesterday, to: today });
  return (
    <Flex>
      <View padding={SPACING.small}>
        <Flex gap={SPACING.small} wrap>
          <StatusCard
            heading="Temperature"
            status="50%"
            icon={() => <TemperatureIcon />}
          />
          <StatusCard
            heading="Humidity"
            status="50%"
            icon={() => <HumidityIcon />}
          />
          <StatusCard
            heading="Harvest"
            status="120 days"
            icon={() => (
              <ProgressCircle
                variant="overBackground"
                aria-label="Loading…"
                value={60}
              />
            )}
          />
          <StatusCard
            heading="System status"
            status="running"
            icon={() => <StatusLight variant="positive" />}
          />
          <StatusCard
            heading="Lights"
            status="12/12"
            icon={() => <LightIcon color={true ? "notice" : "negative"} />}
          />
          <StatusCard
            heading="Cycle"
            status="vegetative"
            icon={() => <CycleIcon />}
          />
          {data?.length && <Chart data={normalizeDataToChart(data)} />}
        </Flex>
      </View>
    </Flex>
  );
};

export default Stats;
