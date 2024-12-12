import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const StockTreemap = () => {
  const svgRef = useRef(null);
  const [stockData, setStockData] = useState([]); // State to store the CSV data

  useEffect(() => {
    // Load CSV data with a cache-busting query parameter
    d3.csv(`/Scraped_data/NIFTYIT_stock_data.csv?timestamp=${new Date().getTime()}`)
      .then((data) => {
        // Parse CSV rows to ensure correct data types
        const parsedData = data.map((d) => ({
          name: d.name,
          price: parseFloat(d.price),
          change: parseFloat(d.change),
        }));
        setStockData(parsedData); // Store the data in state
      })
      .catch((error) => {
        console.error("Error loading the CSV file:", error);
      });
  }, []); // Only run this effect once when the component mounts

  useEffect(() => {
    if (!stockData.length) return; // If no data is loaded, don't render the treemap

    const width = window.innerWidth - 40; // 40px padding for sides
    const height = window.innerHeight - 100; // 100px for top and bottom padding

    // Create tooltip div
    const tooltip = d3.select("body")
      .append("div")
      .style("position", "absolute")
      .style("background", "rgba(0, 0, 0, 0.7)")
      .style("color", "white")
      .style("padding", "10px")
      .style("border-radius", "5px")
      .style("pointer-events", "none")
      .style("opacity", 0);

    // Set up the treemap layout
    const treemap = d3.treemap().size([width, height]).padding(1);

    // Format the stock data into hierarchical data for D3
    const root = d3
      .hierarchy({ children: stockData })
      .sum((d) => Math.abs(d.change)) // Using absolute value for treemap size
      .sort((a, b) => b.value - a.value);

    // Apply the treemap algorithm
    treemap(root);

    // Create the SVG element
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .style("background-color", "#f4f4f4")
      .style("border", "1px solid #ddd");

    // Create color scales for profit (green) and loss (red)
    const colorScale = d3
      .scaleLinear()
      .domain([0, Math.max(...stockData.map((d) => Math.abs(d.change)))])
      .range(["#00FF00", "#006400"]); // Green color for positive values

    const lossColorScale = d3
      .scaleLinear()
      .domain([0, Math.abs(Math.min(...stockData.map((d) => d.change)))])
      .range(["#FF0000", "#8B0000"]); // Red color for negative values

    // Create rectangles for each stock in the treemap
    const rectangles = svg
      .selectAll("rect")
      .data(root.leaves())
      .enter()
      .append("rect")
      .attr("x", (d) => d.x0)
      .attr("y", (d) => d.y0)
      .attr("width", (d) => d.x1 - d.x0)
      .attr("height", (d) => d.y1 - d.y0)
      .attr("fill", (d) =>
        d.data.change > 0
          ? colorScale(d.data.change)
          : lossColorScale(Math.abs(d.data.change))
      )
      // Add hover effects
      .on("mouseover", function (event, d) {
        // Highlight rectangle
        d3.select(this).transition().duration(200).attr("opacity", 0.7);

        // Show tooltip
        tooltip.transition().duration(200).style("opacity", 0.9);

        tooltip
          .html(`
          <strong>Stock:</strong> ${d.data.name}<br>
          <strong>Price:</strong> ₹${d.data.price.toLocaleString()}
        `)
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mouseout", function () {
        // Restore original appearance
        d3.select(this).transition().duration(200).attr("opacity", 1);

        // Hide tooltip
        tooltip.transition().duration(500).style("opacity", 0);
      });

    // Add text labels inside each rectangle
    svg
      .selectAll("text")
      .data(root.leaves())
      .enter()
      .append("text")
      .attr("x", (d) => (d.x0 + d.x1) / 2) // Center horizontally
      .attr("y", (d) => (d.y0 + d.y1) / 2) // Center vertically
      .attr("text-anchor", "middle")
      .attr("font-size", "15px")
      .attr("fill", "white")
      .attr("dy", -5)
      .text((d) => d.data.name);

    svg
      .selectAll("text.market-cap")
      .data(root.leaves())
      .enter()
      .append("text")
      .attr("x", (d) => (d.x0 + d.x1) / 2)
      .attr("y", (d) => (d.y0 + d.y1) / 2)
      .attr("text-anchor", "middle")
      .attr("font-size", "15px")
      .attr("fill", "white")
      .attr("dy", 12)
      .text((d) => `₹${d.data.price.toLocaleString()}`);

    // Adjust chart size on window resize
    const handleResize = () => {
      const newWidth = window.innerWidth - 40;
      const newHeight = window.innerHeight - 100;

      treemap.size([newWidth, newHeight]);
      root.each((node) => {
        node.x0 = node.x0 * (newWidth / width);
        node.x1 = node.x1 * (newWidth / width);
        node.y0 = node.y0 * (newHeight / height);
        node.y1 = node.y1 * (newHeight / height);
      });

      svg.attr("width", newWidth).attr("height", newHeight);

      svg.selectAll("rect").attr("x", (d) => d.x0).attr("y", (d) => d.y0).attr("width", (d) => d.x1 - d.x0).attr("height", (d) => d.y1 - d.y0);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      tooltip.remove();
    };
  }, [stockData]); // Re-run when stockData changes

  return (
    <div
      className="treemap-container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <h1
        style={{
          fontFamily: "Bebas Neue, sans-serif",
          fontSize: "40px",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        Nifty IT
      </h1>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default StockTreemap;
