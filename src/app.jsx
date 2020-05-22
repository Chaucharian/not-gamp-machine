import React, { useEffect, useState } from 'react';
import { getChartData, getConditions } from './api';
import DisplayData from './displayData';

const App = () => {
    const [currentTime, updateTime] = useState(Date.now());
    const [{ humedity, temperature}, setConditions] = useState({ humedity: 0, temperature: 0});

    useEffect( () => {
        const id = setInterval(() => updateTime(Date.now()), 1000);

        getConditions().then( ({temperature, humedity }) => setConditions({ temperature, humedity }) )
        .catch(error => console.error(error));

        return () => clearInterval(id);
    }, [currentTime]);

    useEffect( () => {
        getChartData(1565408398127, 1568086798127).then( ({temperature, humedity }) => setConditions({ temperature, humedity }) )
        .catch(error => console.error(error));
    }, []);

    return (
        <>
            <DisplayData temperature={temperature} humedity={humedity}/>
        </>
    );
}

export default App;
