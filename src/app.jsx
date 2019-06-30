import React, { Component } from 'react';
import DisplayData from './list';
import Chart from './chart';

export default class App extends Component {

    constructor(...args) {
        super(...args);
        this.state = {};
    }

    componentDidMount() {
        setInterval(() => this.fetchData(), 1000);

        fetch(`/chartData?from=1561431600000&to=${Date.now()}`)
        .then(response => response.json())
        .then( chartData => this.setState({ chartData }) )
        .catch(error => console.error(error))
    }

    fetchData() {
        fetch('/data')
        .then(response => response.json())
        .then(data => {
            const { humedity, temperature } = data;
            this.setState({ temperature, humedity });
        })
        .catch(error => console.error(error));
    }

    render() {
        const { humedity, temperature, chartData } = this.state;
        return (
         <div>
            <DisplayData temperature={temperature} humedity={humedity}/>
            <Chart data={chartData} />
        </div>
        );
    }
}
