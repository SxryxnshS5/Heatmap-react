import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

// Main App Component
function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const svgRef = useRef();
  const [timeRange, setTimeRange] = useState('1d'); // Time range state (e.g., 1d, 5d, 1m)

  // Time range options
  const timeRanges = ['1d', '5d', '1m', '6m', '1y'];

  // Load CSV data
  useEffect(() => {
    d3.csv('/index.csv').then((data) => {
      // Parse data
      data.forEach(d => {
        d.Date = new Date(d.Date);
        d.Close = parseFloat(d.Close.replace(/,/g, ''));
      });
      setData(data);
      setFilteredData(data); // Initially, display all data
    });
  }, []);

  // Handle time range change
  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    filterData(range);
  };

  // Filter data based on selected time range
  const filterData = (range) => {
    let startDate = new Date();
    if (range === '1d') {
      startDate.setDate(startDate.getDate() - 1); // Last 1 day
    } else if (range === '5d') {
      startDate.setDate(startDate.getDate() - 5); // Last 5 days
    } else if (range === '1m') {
      startDate.setMonth(startDate.getMonth() - 1); // Last 1 month
    } else if (range === '6m') {
      startDate.setMonth(startDate.getMonth() - 6); // Last 6 months
    } else if (range === '1y') {
      startDate.setFullYear(startDate.getFullYear() - 1); // Last 1 year
    }
    const filtered = data.filter(d => d.Date >= startDate);
    setFilteredData(filtered);
  };

  // Draw the chart with zoom and pan
  useEffect(() => {
    if (filteredData.length === 0) return;

    const width = 800;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 50, left: 40 };

    // Clear previous chart
    d3.select(svgRef.current).selectAll('*').remove();

    // Create the SVG container
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Set scales
    const xScale = d3.scaleTime()
      .domain(d3.extent(filteredData, d => d.Date))
      .range([0, width - margin.left - margin.right]);

    const yScale = d3.scaleLinear()
      .domain([d3.min(filteredData, d => d.Close), d3.max(filteredData, d => d.Close)])
      .range([height - margin.top - margin.bottom, 0]);

    // Add the X axis
    svg.append('g')
      .attr('transform', `translate(0,${height - margin.top - margin.bottom})`)
      .call(d3.axisBottom(xScale));

    // Add the Y axis
    svg.append('g')
      .call(d3.axisLeft(yScale));

    // Create the line for the stock data
    const line = d3.line()
      .x(d => xScale(d.Date))
      .y(d => yScale(d.Close));

    // Append the line to the SVG
    svg.append('path')
      .data([filteredData])
      .attr('fill', 'none')
      .attr('stroke', '#007bff')
      .attr('stroke-width', 2)
      .attr('d', line);

    // Add the chart title
    svg.append('text')
      .attr('x', (width - margin.left - margin.right) / 2)
      .attr('y', -10)
      .attr('text-anchor', 'middle')
      .text(`Stock Price Trends - Last ${timeRange.toUpperCase()}`);

    // Add zoom and pan
    const zoom = d3.zoom()
      .scaleExtent([1, 8])
      .translateExtent([[0, 0], [width, height]])
      .on('zoom', (event) => handleZoom(event, xScale, yScale, svg, filteredData));

    svg.call(zoom);
  }, [filteredData, timeRange]);

  // Handle zoom event
  const handleZoom = (event, xScale, yScale, svg, data) => {
    const transform = event.transform;
    const zoomedXScale = transform.rescaleX(xScale);
    const zoomedYScale = transform.rescaleY(yScale);

    // Update the X and Y axes
    svg.selectAll('g.x-axis').call(d3.axisBottom(zoomedXScale));
    svg.selectAll('g.y-axis').call(d3.axisLeft(zoomedYScale));

    // Update the line chart
    svg.select('path')
      .attr('d', d3.line()
        .x(d => zoomedXScale(d.Date))
        .y(d => zoomedYScale(d.Close))
      );
  };

  return (
    <div className="App">
      <h1>Stock Market Index Chart</h1>
      <div className="controls">
        <span>Time Range: </span>
        {timeRanges.map((range) => (
          <button key={range} onClick={() => handleTimeRangeChange(range)}>{range}</button>
        ))}
      </div>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default App;

