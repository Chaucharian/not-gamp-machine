import { Chart } from "react-google-charts";
import * as React from "react";
import { getRange } from './api';


const ChartData = (data) => {
    
  return (
<Chart
  width={'600px'}
  height={'300px'}
  chartType="ColumnChart"
  loader={<div>Loading Chart</div>}
  data={[
    ['Year', 'Temp', 'Humidity'],
    ['2014', 1000, 400],
    ['2015', 1170, 460],
    ['2016', 660, 1120],
    ['2017', 1030, 540],
  ]}
  options={{
    backgroundColor: ""
  }}
  // For tests
  rootProps={{ 'data-testid': '2' }}
/>
  );
};

export default ChartData;