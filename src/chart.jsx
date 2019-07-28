import React, { Component } from 'react';
import * as d3 from "d3";

class Chart extends Component {

    constructor(...args) {
        super(...args);
        this.state = { };
    }

    initializeChart() {
        const data = [ 
            { timeStamp: 1561431600000, temperature: 12, humidity: 43 },
            { timeStamp: 1561431600000, temperature: 17, humidity: 80 },
            { timeStamp: 1561431600000, temperature: 16, humidity: 70 },
            { timeStamp: 1561431600000, temperature: 19, humidity: 67 },
            { timeStamp: 1561431600000, temperature: 20, humidity: 40 },
            { timeStamp: 1561431600000, temperature: 18, humidity: 88 },
            { timeStamp: 1561431600000, temperature: 28, humidity: 55 },
            { timeStamp: 1561431600000, temperature: 25, humidity: 53 },
            { timeStamp: 1561431600000, temperature: 26, humidity: 50 }
         ];
        function formatDate(date) {
            var monthNames = [
                "January", "February", "March",
                "April", "May", "June", "July",
                "August", "September", "October",
                "November", "December"
            ];
            
            var day = date.getDate();
            var monthIndex = date.getMonth();
            var year = date.getFullYear();
            
            return day + ' ' + monthNames[monthIndex] + ' ' + year;
        }
        var color = d3.scaleOrdinal(d3.schemeCategory10);
        var lineOpacity = "0.25";

        var margin = {top: 10, right: 30, bottom: 30, left: 60},
        width = window.innerWidth - 10,
        height = 400;
        var svg = d3.select("#chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        /* Scale */
        var xScale = d3.scaleTime()
        .domain(d3.extent(data, d => formatDate(new Date(d.timeStamp))))
        .range([0, width]);

        var yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.temperature)])
        .range([height, 0]);
/*
        var x = d3.scaleTime().domain([ new Date(data[0].timeStamp), new Date(data[data.length -1].timeStamp)]).rangeRound([0, width]);
        var y = d3.scaleLinear().range([height, 0]);
        var valueline = d3.line()
        .x(function(d) { return x( d.timeStamp ); })
        .y(function(d) { return y( d.temperature ); });
        */

        /* Add Axis into SVG */
        var xAxis = d3.axisBottom(xScale).ticks(5);
        var yAxis = d3.axisLeft(yScale).ticks(5);

        svg.append("g")
        .attr("class", "x axis")
        .attr("transform", `translate(0, ${height - 50})`)
        .call(xAxis);

        svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append('text')
        .attr("y", 15)
        .attr("transform", "rotate(-90)")
        .attr("fill", "#000")
        .text("Temperature Average");

        /* Add line into SVG */
        var line = d3.line()
        .x(d => xScale(d))
        .y(d => yScale(d));

        let lines = svg.append('g')
        .attr('class', 'lines')
        .selectAll('.line-group')
        .data(data).enter()
        .append('g')
        .attr('class', 'line-group')  
        .append('path')
        .attr('class', 'line')  
        .attr('d', d => line(d))
        .style('stroke', (d, i) => color(i))
        .style('opacity', lineOpacity)
   

       /* let X = 0;
        for(let _data of data) {
            console.log(_data)
            svg.append("text")
            .data(data)
            .attr("dy", ".75em")
            .attr("y", height - 40)
            .attr("x", X += 100)
            .attr("text-anchor", "middle")
            .text( formatDate(new Date(_data.timeStamp)) );
        }
            // Scale the range of the data
            x.domain(d3.extent(data, function(d) { return d.timeStamp }));
            y.domain([0, d3.max(data, function(d) { return d.temperature; })]);

            // Add the valueline path.
            svg.append("path")
                .data([data])
                .attr("class", "line")
                .attr("d", valueline);

            // Add the X Axis
            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));

            // Add the Y Axis
            svg.append("g")
                .call(d3.axisLeft(y));


            gX.call(xAxis);*/

        /*
        fetch(`/chartData?from=1561431600000&to=${Date.now()}`)
        .then(response => response.json())
        .then( chartData => {
            console.log(chartData)

            var chart = d3.select("#chart")
            .line()   
            .attr('x').scaleTime()
            .domain([new Date(1561431600000), Date.now()])
            .range([20, 900]);
            .x(function(d) { return x(d.date)})   
            .y(function(d) { return y(d.value)});   
            x.domain(d3.extent(data, function(d) { return d.date }));   
            y.domain(d3.extent(data, function(d) { return d.value }));
            g.append("path").datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .attr("d", line);
        })
        .catch(error => console.error(error))
        */
    }

    componentDidMount() {
        this.initializeChart();
    }
    render() {
        return (
            <div id="chart"></div>  
        );
    }

}

export default Chart;