import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import Papa from "papaparse";

const Chart = () => {
  const [chartData, setChartData] = useState([]);
  const [chartOptions, setChartOptions] = useState({});

  // Fetch data and update chart options on component mount
  useEffect(() => {
    Papa.parse("peratio.csv", {
      download: true,
      header: true,
      complete: function (result) {
        console.log("Parsed CSV Data:", result.data);

        const csvData = result.data;

        // Transform CSV Data into Heatmap Structure
        const series = csvData
          .map((row) => {
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
              ].filter((month) => month.y !== null), // Remove invalid months
            };
          })
          .filter((row) => row !== null); // Remove invalid years

        console.log("Formatted Series Data:", series);

        // Chart options
        const options = {
          series: series,
          chart: {
            width: "100%",
            height: "100%",
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
              reverseNegativeShade: false,
              colorScale: {
                ranges: [
                 
                  { from: 0, to: 15, name: "Below 15 Extremely Low", color: "#a4161a" },
                  { from: 15, to: 18, name: "Low P/E", color: "#ba181b" },
                  { from: 18, to: 22, name: "Fair Valuation Zone", color: "#e5383b" },
                  { from: 22, to: 25, name: "Slightly Overvalued", color: "#38b000" },
                  { from: 25, to: 28, name: "High P/E", color: "#008000" },
                  { from: 28, to: 32, name: "Very High P/E", color: "#007200" },
                  { from: 32, to: 40, name: "Extremely High P/E", color: "#00BFFF" },
                  { from: 40, to: 100, name: "Speculative/Bubble Zone", color: "#00BFFF" },
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
            fontSize: "12px",
          },
          title: {
            text: "Nifty 50 PE Ratio - Last 20 years",
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
