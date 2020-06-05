import { Chart } from "react-google-charts";
import * as React from "react";


const ChartData = ({ data }) => {
  return (
<Chart
  width={'600px'}
  height={'300px'}
  chartType="ColumnChart"
  loader={<div>Loading Chart</div>}
  data={data}
  options={{
    backgroundColor: ""
  }}
  // For tests
  rootProps={{ 'data-testid': '2' }}
/>
  );
};

export default ChartData;