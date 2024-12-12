import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import Papa from 'papaparse';

const Chart = () => {
  const [chartData, setChartData] = useState([]);
  const [chartOptions, setChartOptions] = useState({});

  // Fetch data and update chart options on component mount
  useEffect(() => {
    Papa.parse("1112.csv", {
      download: true,
      header: true,
      complete: function (result) {
        console.log("Parsed CSV Data:", result.data);

        const csvData = result.data;

        // Transform CSV Data into Heatmap Structure
        const series = csvData.map((row) => {
          const year = row["Year"];
          if (!year) return null; // Skip invalid rows
          return {
            name: year,
            data: [
              { x: "Jan", y: parseFloat(row["Jan"]) || null },
              { x: "Feb", y: parseFloat(row["Feb"]) || null },
              { x: "Mar", y: parseFloat(row["Mar"]) || null },
              { x: "Apr", y: parseFloat(row["Apr"]) || null },
              { x: "May", y: parseFloat(row["May"]) || null },
              { x: "Jun", y: parseFloat(row["Jun"]) || null },
              { x: "Jul", y: parseFloat(row["Jul"]) || null },
              { x: "Aug", y: parseFloat(row["Aug"]) || null },
              { x: "Sep", y: parseFloat(row["Sep"]) || null },
              { x: "Oct", y: parseFloat(row["Oct"]) || null },
              { x: "Nov", y: parseFloat(row["Nov"]) || null },
              { x: "Dec", y: parseFloat(row["Dec"]) || null },
              { x: "Annual", y: parseFloat(row["Annual"]) || null },
            ].filter((month) => month.y !== null), // Remove invalid months
          };
        }).filter((row) => row !== null); // Remove invalid years

        console.log("Formatted Series Data:", series);

        // Chart options
        const options = {
          series: series,
          chart: {
            width: "100%",
            height:"100%",
            type: "heatmap",
            toolbar: { show: false },
          },
          xaxis: {
            position: "top",
            labels: {
              style: {
                fontSize: "20px",
                fontFamily: "Bebas Neue,sans-serif",
                fontWeight: 600,
              },
              offsetY: 8,
            },
          },
          yaxis: {
            labels: {
              style: {
                fontFamily: "Bebas Neue,sans-serif",
                fontSize: "20px",
              },
            },
          },
          plotOptions: {
            heatmap: {
              shadeIntensity: 0.5,
              radius: 0,
              useFillColorAsStroke: true,
              reverseNegativeShade: true,
              colorScale: {
                ranges: [
                  { from: -100, to: -18, name: "Very Low", color: "#660708" },
                  { from: -18, to: -12, name: "-18 to -12", color: "#a4161a" },
                  { from: -12, to: -6, name: "-12 to -6", color: "#ba181b" },
                  { from: -6, to: 0, name: "-6 to 0", color: "#e5383b" },
                  { from: 0, to: 6, name: "0 to 6", color: "#38b000" },
                  { from: 6, to: 12, name: "6 to 12", color: "#008000" },
                  { from: 12, to: 18, name: "12 to 18", color: "#007200" },
                  { from: 18, to: 100, name: "Very High", color: "#059212" },
                ],
              },
            },
          },
          dataLabels: {
            enabled: true,
            style: {
              fontFamily: "Bebas Neue,sans-serif",
              fontSize: "18px",
            },
          },
          stroke: { width: 1 },
          legend: {
            position: "bottom",
            horizontalAlign: "center",
          },
          title: {
            text: "Nifty 50 Returns - Last 20 years",
            align: "center",
            style: {
              fontSize: "40px",
              fontFamily: "Bebas Neue,sans-serif",
            },
          },
        };

        // Update the state with the chart options and data
        setChartData(series);
        setChartOptions(options);
      },
    });
  }, []); // Empty dependency array to run this effect only once

  return (
    <div className="chart-container">
      <ReactApexChart
        options={chartOptions}
        series={chartData}
        type="heatmap"
        height="840" // Ensures the chart takes the full height of the parent container
         // Ensures the chart takes the full width of the parent container
      />
    </div>
  );
};

export default Chart;
