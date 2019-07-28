import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import DisplayData from './list';
import Chart from './chart';

export default class App extends Component {

    constructor(...args) {
        super(...args);
        this.state = {};
    }

    componentDidMount() {
        setInterval(() => this.fetchData(), 1000);
/*
        fetch(`/chartData?from=1561431600000&to=${Date.now()}`)
        .then(response => response.json())
        .then( chartData => this.setState({ chartData }) )
        .catch(error => console.error(error))*/
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
<<<<<<< HEAD
         <div>
            <DisplayData temperature={temperature} humedity={humedity}/>
            <Chart />
        </div>
=======
        <Container maxWidth="sm">
            <div>
                <DisplayData temperature={temperature} humedity={humedity}/>
            </div>
        </Container>
>>>>>>> 2ba323fc00dc1000422b0c229a8c3562bf2692c8
        );
    }
}
