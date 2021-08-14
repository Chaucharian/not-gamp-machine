import React, { useEffect, useState } from 'react';
import { getChartData, getConditions } from '../api';
import DisplayData from '../components/displayData';
import Chart from '../components/chart';
import { subDays } from 'date-fns';
import { Grid } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useAuth } from '../core/auth/context';


const Dashboard = () => {
    const [currentTime, updateTime] = useState(Date.now());
    const [{ humedity, temperature}, setConditions] = useState({ humedity: 0, temperature: 0});
    let [ chartData, setChartData] = useState([]);
    const  { logout } = useAuth();

    const normalizeResponse = ({ data: response }) => {
        const chartData = [['Time', 'Humidity', 'Temp']];
        response.map( data => {
            data.temperature !== 0 && chartData.push([new Date(data.timestamp).getHours()+"", Number(data.temperature.split(".")[0]), Number(data.humedity.split(".")[0])]);
        });
        return chartData;
    }

    useEffect( () => {
        const id = setInterval(() => updateTime(Date.now()), 1000);

        getConditions().then( ({temperature, humedity }) => setConditions({ temperature, humedity }) )
        .catch(error => console.error(error));

        return () => clearInterval(id);
    }, [currentTime]);

    useEffect( () => {
        const yesterday = new Date(subDays(new Date, 1)).getTime();
        const today = new Date().getTime();
        getChartData(yesterday, today).then( response => setChartData(normalizeResponse(response)) );
    }, []);
    
    return (
        <Grid container spacing={1} justify='center'>
            <Grid item>
                <DisplayData temperature={temperature} humedity={humedity}/>
                { chartData.length > 0 && <Chart data={chartData}/> }
            </Grid>
        <IconButton style={{color:'white'}} onClick={(()=>{logout()})}>
            <ExitToAppIcon/>
        </IconButton>
        </Grid>
    );
}
export default Dashboard;