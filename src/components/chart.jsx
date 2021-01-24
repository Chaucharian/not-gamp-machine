import { Chart } from "react-google-charts";
import * as React from "react";

const ChartData = ({ data }) => {

  return (
    <Chart

      width={'400px'}
      height={'300px'}
      chartType="ColumnChart"
      loader={<div>Loading Chart</div>}
      data={data}
      options={{
        backgroundColor: "",
        hAxis: {
          textStyle:{color: '#FFF'}
        },
        vAxis: {
          textStyle:{color: '#FFF'}
        }
      }}
      // For tests
      rootProps={{ 'data-testid': '2' }}
    />
  );
};

export default ChartData;