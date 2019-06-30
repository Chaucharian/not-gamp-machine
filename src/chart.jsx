import React, { Component } from 'react';
import * as d3 from "d3";

class Chart extends Component {

    constructor(...args) {
        super(...args);
        this.state = { wasCalled: false };
    }

    initializeChart(_data) {
        console.log(_data);

        var margin = {top: 10, right: 30, bottom: 30, left: 60},
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;
        var svg = d3.select("#chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")")
        .data(_data.data, (data) => { 
                    
            // TODO create chart :)
        });
    }

    render() {
        const { data } = this.props;

        if(data !== undefined && !this.state.wasCalled) {
            this.initializeChart(data);
            this.state.wasCalled = true;
        }
        return (
            <div id="chart"></div>  
        );
    }

}

export default Chart;