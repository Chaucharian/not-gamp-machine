import axios from "axios";
import { useQuery } from "react-query";

export const useChart = ({ from, to }: any) => {
  const data = useQuery<any>(
    [`/enviroment/sensors/range?from=${1649726146940}&to=${1649898946940}`],
    async ({ queryKey: [path] }: any) => {
      const response = await axios.get(path).then(({ data }) => {
        return data.data;
      });
      return response;
    },
    {
      initialData: [],
      keepPreviousData: false,
      enabled: !!(from && to),
    }
  );

  return data;
};
