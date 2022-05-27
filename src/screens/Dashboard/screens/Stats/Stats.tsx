import {
  Button,
  Content,
  Flex,
  Heading,
  ProgressCircle,
  StatusLight,
  View,
} from "@adobe/react-spectrum";

import { SPACING } from "app/theme";
import { StatusCard } from "./components";
import { Chart } from "components";
import { useChart } from "./hooks/useChart";
import { subDays } from "date-fns";
import { normalizeDataToChart } from "components/Chart";
import { useCards } from "./hooks/useCards";

const Stats = () => {
  const yesterday = new Date(subDays(new Date(), 2)).getTime();
  const today = new Date().getTime();
  const { data } = useChart({ from: yesterday, to: today });
  const { cardsEnabled } = useCards();

  return (
    <Flex>
      <View padding={SPACING.small}>
        <Flex gap={SPACING.small} wrap>
          {cardsEnabled.map((card, i) => (
            <StatusCard {...card.props} key={i} />
          ))}
          {data?.length && <Chart data={normalizeDataToChart(data)} />}
        </Flex>
      </View>
    </Flex>
  );
};

export default Stats;
