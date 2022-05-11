import { Chart as NativeChart } from "react-google-charts";

export const normalizeDataToChart = (response: any) =>
  response.map((data: any) => {
    const chartData: any = [["Time", "Humidity", "Temp"]];
    data.temperature !== 0 &&
      chartData.push([
        new Date(data.timestamp).getHours() + "",
        Number(data.temperature.split(".")[0]),
        Number(data.humedity.split(".")[0]),
      ]); // normalize data
    return chartData;
  });

const Chart = ({ data }: any) => {
  return (
    <NativeChart
      width={"400px"}
      height={"300px"}
      chartType="ColumnChart"
      loader={<div>Loading Chart</div>}
      data={data}
      options={{
        backgroundColor: "",
        hAxis: {
          textStyle: { color: "#FFF" },
        },
        vAxis: {
          textStyle: { color: "#FFF" },
        },
      }}
      // For tests
      rootProps={{ "data-testid": "2" }}
    />
  );
};

export default Chart;
