import { Chart } from "react-google-charts";
import * as React from "react";


const ChartData = (chartData) => {
      let mock = [
        ['Year', 'Temp', 'Humidity'],
        ['2014', 1000, 400],
        ['2015', 1170, 460],
        ['2016', 660, 1120],
        ['2017', 1030, 540],
      ];
console.log(chartData);

  return (
<Chart
  width={'600px'}
  height={'300px'}
  chartType="ColumnChart"
  loader={<div>Loading Chart</div>}
  data={mock}
  options={{
    backgroundColor: ""
  }}
  // For tests
  rootProps={{ 'data-testid': '2' }}
/>
  );
};

export default ChartData;