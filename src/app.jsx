import React, { useEffect, useState } from 'react';
import { getChartData, getConditions } from './api';
import DisplayData from './displayData';
import ChartData from './chart';

const App = () => {
    const [currentTime, updateTime] = useState(Date.now());
    const [{ humedity, temperature}, setConditions] = useState({ humedity: 0, temperature: 0});
    const chartData = new Array;
    useEffect( () => {
        const id = setInterval(() => updateTime(Date.now()), 1000);

        getConditions().then( ({temperature, humedity }) => setConditions({ temperature, humedity }) )
        .catch(error => console.error(error));

        return () => clearInterval(id);
    }, [currentTime]);

    useEffect( () => {
        getChartData(0, 1591206699963).then( ({temperature, humedity }) => {chartData.push([a])
         } )
        .catch(error => console.error(error));
    }, []);

    console.log(chartData);
    
    return (
        <>
            <DisplayData temperature={temperature} humedity={humedity}/>
            <ChartData data={chartData}/>
        </>
    );
}

export default App;
