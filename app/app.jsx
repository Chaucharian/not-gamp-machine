import React, { Component } from 'react';

export default class App extends Component {

    constructor(...args) {
        super(...args);
        this.state = {};
    }

    componentDidMount() {
        setInterval(() => this.fetchData(), 1000);
    }

    fetchData() {
        fetch('http://localhost:3000/data')
        .then(response => response.json())
        .then(data => {
            const { humedity, temperature } = data;
            this.setState({ temperature, humedity });
        })
        .catch(error => console.error(error))
    }

    render() {
        const { humedity, temperature } = this.state;
        return ( 
        <div>
            <div id="temperature">
                <h2>Temperature C: {temperature}</h2>
            </div>
            <div id="temperature">
                <h2>Humedity %: {humedity}</h2>
            </div>
        </div>
        );
    }
}
