import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import DisplayData from './list';

export default class App extends Component {

    constructor(...args) {
        super(...args);
        this.state = {};
    }

    componentDidMount() {
        setInterval(() => this.fetchData(), 1000);
    }

    fetchData() {
        fetch('/data')
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
        <Container maxWidth="sm">
            <div>
                <DisplayData temperature={temperature} humedity={humedity}/>
            </div>
        </Container>
        );
    }
}
