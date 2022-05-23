import { baseUrl } from "api/services";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";

export const useStreaming = (mode: string, onSuccess: any) => {
  const queryClient = useQueryClient();

  const { mutate: upload } = useMutation(
    (image) =>
      axios
        .post(`${baseUrl}/enviroment/images/streaming`, {
          image,
        })
        .then((data) => console.log(data)),
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries("feed");
      },
    }
  );

  const feed = useQuery(
    "feed",
    () =>
      axios.get(`${baseUrl}/enviroment/images/streaming`).then((data) => data),
    { enabled: mode === "viewer", refetchInterval: 3000, onSuccess }
  );

  return { upload, feed };
};
