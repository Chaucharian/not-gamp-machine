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
                    
            // group the data: I want to draw one line per group
            var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
            .key(function(d) { return d;})
            .entries(data);

            // Add X axis --> it is a date format
            var x = d3.scaleLinear()
            .domain(d3.extent(data, function(d) { return d; }))
            .range([ 0, width ]);
            svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).ticks(5));

            // Add Y axis
            var y = d3.scaleLinear()
            .domain([0, d3.max(data, function(d) { return +d.temperature; })])
            .range([ height, 0 ]);
            svg.append("g")
            .call(d3.axisLeft(y));

            // color palette
            var res = sumstat.map(function(d){ return d }) // list of group names
            var color = d3.scaleOrdinal()
            .domain(res)
            .range(['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628','#f781bf','#999999'])

            // Draw the line
            svg.selectAll(".line")
            .data(sumstat)
            .enter()
            .append("path")
                .attr("fill", "none")
                .attr("stroke", function(d){ return color(d) })
                .attr("stroke-width", 1.5)
                .attr("d", function(d){
                return d3.line()
                    .x(function(d) { return x(d); })
                    .y(function(d) { return y(+d.temperature); })
                    
                })

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