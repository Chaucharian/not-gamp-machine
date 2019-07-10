import React, { Component } from 'react';
import * as d3 from "d3";

class Chart extends Component {

    constructor(...args) {
        super(...args);
        this.state = { };
    }

    initializeChart() {
        const data = [ 
            { timeStamp: 1562731798127, temperature: 12, humidity: 43 },
            { timeStamp: 1562733598127, temperature: 17, humidity: 80 },
            { timeStamp: 1562734498135, temperature: 16, humidity: 70 },
            { timeStamp: 1562737198141, temperature: 19, humidity: 67 },
            { timeStamp: 1562747098165, temperature: 20, humidity: 40 },
            { timeStamp: 1562753398172, temperature: 18, humidity: 88 },
            { timeStamp: 1562756998183, temperature: 28, humidity: 55 },
            { timeStamp: 1562765998188, temperature: 25, humidity: 53 },
            { timeStamp: 1562765098188, temperature: 26, humidity: 50 }
         ];
        const formatDate = date => {
            const monthNames = [
                "January", "February", "March",
                "April", "May", "June", "July",
                "August", "September", "October",
                "November", "December"
            ];
            const day = date.getDate();
            const monthIndex = date.getMonth();
            const hour = date.getHours();
            const minutes = date.getMinutes() > 9 ? date.getMinutes() : '0'+date.getMinutes();   
            
            return day + ' ' + monthNames[monthIndex] + ' ' + hour + ':' + minutes;
        }

        var color = d3.scaleOrdinal(d3.schemeCategory10);
        var lineOpacity = "0.25";

        var margin = {top: 10, right: 30, bottom: 30, left: 60},
        width = window.innerWidth - margin.left,
        height = 400;

        /* Scale */
        var xScale = d3.scaleLinear()
        .range([0, width]);

        var yScale = d3.scaleLinear()
        .domain([0, 100])
        .range([height, 0]);

        /* Add Axis into SVG */
        var xAxis = d3.axisBottom(xScale).ticks(5);
        var yAxis = d3.axisLeft(yScale).ticks(5);

        /* Add line into SVG */
        var lineTemperature = d3.line()
        .x( d => xScale(d.timeStamp))
        .y(d => yScale(d.temperature))
        .curve(d3.curveMonotoneX) // apply smoothing to the line
        
        var lineHumidity = d3.line()
        .x( d => xScale(d.timeStamp))
        .y(d => yScale(d.humidity))
        .curve(d3.curveMonotoneX) 

        var svg = d3.select("#chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
/*
        // X axis line
        svg.append("g")
        .attr("class", "x axis")
        .attr("transform", `translate(0, ${height - 50})`)
        .call(xAxis);
        
        // Y axis line
        svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append('text')
        .attr("y", 15)
        .attr("transform", "rotate(-90)")
        .attr("fill", "#000")
        .text("Max Scale");

        svg.append("path")
        .datum(data)
        .attr("class", "line") // Assign a class for styling 
        .attr("d", lineTemperature) // Calls the line generator 
        .attr("transform", `translate(${margin.right}, -5)`)
        
        svg.append("path")
        .datum(data) 
        .attr("class", "line-humidity") // Assign a class for styling 
        .attr("d", lineHumidity) // Calls the line generator 
        .attr("transform", `translate(${margin.right}, 0)`)
*/
            // format the data
           /* data.forEach(function(d) {
                d.timeStamp = formatDate(new Date(d.timeStamp));
            });*/

            data.forEach(function(d) {
                d.timeStamp = new Date(d.timeStamp);
            })
            // Scale the range of the data
            xScale.domain(d3.extent(data, function(d) { return d.timeStamp; }));

            // Add the valueline path.
            svg.append("path")
                .data([data])
                .attr("class", "line")
                .attr("d", lineTemperature);

            // Add the X Axis
            svg.append("g")
            .attr("transform", `translate(0, ${height - 50})`)
            .call(d3.axisBottom(xScale)
            .tickFormat( d3.timeFormat("%Y-%m-%d %H:%M:%S")).tickValues(data.map(function(d) { return new Date(d.timeStamp)})) )

            // Add the Y Axis
            svg.append("g")
            .call(d3.axisLeft(yScale));

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