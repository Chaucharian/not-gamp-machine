import React, { Component } from 'react';
import * as d3 from "d3";

class Chart extends Component {

    constructor(...args) {
        super(...args);
        this.state = { };
    }

    initializeChart() {
        const data = [ 
            { timeStamp: 4, temperature: 12, humidity: 43 },
            { timeStamp: 5, temperature: 17, humidity: 80 },
            { timeStamp: 7, temperature: 16, humidity: 70 },
            { timeStamp: 9, temperature: 19, humidity: 67 },
            { timeStamp: 11, temperature: 20, humidity: 40 },
            { timeStamp: 14, temperature: 18, humidity: 88 },
            { timeStamp: 16, temperature: 28, humidity: 55 },
            { timeStamp: 18, temperature: 25, humidity: 53 },
            { timeStamp: 20, temperature: 26, humidity: 50 }
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


        /* Scale */
        var xScale = d3.scaleLinear()
        .domain([0, 25 ])
        .range([0, width]);

        var yScale = d3.scaleLinear()
        .domain([0, 28])
        .range([height, 0]);

        /* Add Axis into SVG */
        var xAxis = d3.axisBottom(xScale).ticks(5);
        var yAxis = d3.axisLeft(yScale).ticks(5);

        /* Add line into SVG */
        var line = d3.line()
        .x( d => xScale(d.timeStamp))
        .y(d => yScale(d.temperature))
        .curve(d3.curveMonotoneX) // apply smoothing to the line

        var svg = d3.select("#chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

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
        .text("Temperature Average");

        svg.append("path")
        .datum(data) // 10. Binds data to the line 
        .attr("class", "line") // Assign a class for styling 
        .attr("d", line); // 11. Calls the line generator 

  /*      let lines = svg.append('g')
        .attr('class', 'lines')
        .append('g')
        .attr('class', 'line-group')  
        .selectAll('.line-group')
        .append('path')
        .data(data)
        .attr('class', 'line')  
        .attr('d', d => line)//Math.floor(Math.random() * Math.floor(400)))
        .style('stroke', (d, i) => color(i))
        .style('opacity', lineOpacity)
   

        let X = 0;
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