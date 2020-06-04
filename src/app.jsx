import React, { useEffect, useState } from 'react';
import { getChartData, getConditions } from './api';
import DisplayData from './displayData';
import ChartData from './chart';
import "@babel/polyfill";

const App = () => {
    const [currentTime, updateTime] = useState(Date.now());
    const [{ humedity, temperature}, setConditions] = useState({ humedity: 0, temperature: 0});
    let [ chartData, setChartData] = useState([chartData]);
    useEffect( () => {
        const id = setInterval(() => updateTime(Date.now()), 1000);

        getConditions().then( ({temperature, humedity }) => setConditions({ temperature, humedity }) )
        .catch(error => console.error(error));

        return () => clearInterval(id);
    }, [currentTime]);

    useEffect( () => {
        async function fetchData() {
            return await getChartData(0, 1591206699963).then( res => {
                let chartData = []; 
                res.data.forEach(value => {
                    var arr = Object.keys(value).map(function(k) { return value[k] });
                    chartData.push(arr);
                });
                setChartData(chartData);
            })
            .catch(error => console.error(error));
        }
        fetchData();          
    }, []);
    
    
    return (
        <>
            <DisplayData temperature={temperature} humedity={humedity}/>
            <ChartData data={chartData}/>
        </>
    );
}

export default App;
