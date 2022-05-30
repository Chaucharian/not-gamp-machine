import axios from "axios";
import { useQuery } from "react-query";
import TemperatureIcon from "@spectrum-icons/workflow/Temperature";
import HumidityIcon from "@spectrum-icons/workflow/GraphScatter";
import LightIcon from "@spectrum-icons/workflow/Efficient";
import CycleIcon from "@spectrum-icons/workflow/BranchCircle";
import { ProgressCircle, StatusLight } from "@adobe/react-spectrum";
import { useMemo } from "react";
import { baseUrl } from "api/services";

const REFETCH_INTERVAL = 5000;

export const useCards = () => {
  const {
    data: { conditions, irrigation },
  } = useQuery<any>(
    [`${baseUrl}/enviroment/sensors/`],
    async ({ queryKey: [path] }: any) => {
      const response = await axios.get(path).then(({ data }) => {
        return data;
      });
      return response;
    },
    {
      initialData: {
        conditions: { temperature: 0, humidity: 0 },
        irrigation: { distance: 0 },
      },
      refetchInterval: REFETCH_INTERVAL,
      keepPreviousData: false,
    }
  );

  const cardsEnabled = useMemo(
    () => [
      {
        props: {
          heading: "Temperature",
          status: `${conditions?.temperature}º`,
          icon: () => {
            return <TemperatureIcon />;
          },
        },
      },
      {
        props: {
          heading: "Humidity",
          status: `${conditions?.humidity}º`,
          icon: () => {
            return <HumidityIcon />;
          },
        },
      },
      {
        props: {
          heading: "Water level",
          status: `${irrigation?.distance}cm`,
          icon: () => {
            return <ProgressCircle />;
          },
        },
      },
    ],
    [conditions]
  );

  return {
    cardsEnabled,
  };
};

// <StatusCard
// heading="Harvest"
// status="120 days"
// icon={() => (
//   <ProgressCircle
//     variant="overBackground"
//     aria-label="Loading…"
//     value={60}
//   />
// )}
// />
// <StatusCard
// heading="System status"
// status="running"
// icon={() => <StatusLight variant="positive" />}
// />
// <StatusCard
// heading="Lights"
// status="12/12"
// icon={() => <LightIcon color={"notice"} />}
// // icon={() => <LightIcon color={true ? "notice" : "negative"} />}
// />
// <StatusCard
// heading="Cycle"
// status="vegetative"
// icon={() => <CycleIcon />}
// />
