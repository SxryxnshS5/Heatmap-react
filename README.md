# 📊 Stock Heatmap React Web App

This project visualizes stock market data as a dynamic heatmap, leveraging **React**, **D3.js**, and automated data updates powered by my [Python Playwright Stock Scraper API](https://github.com/SxryxnshS5/Python-Playwright-StockScraper-API). The app is designed to provide a clear, interactive representation of stock market trends.

## 🚀 Features

- **Dynamic Heatmap**: Visualizes stock price changes with interactive treemap charts.
- **Custom Stock Scraper API**: Utilizes your own API for fetching the latest stock data.
- **Automated Data Updates**: CSV stock data is automatically updated through GitHub Actions.
- **D3.js Integration**: Treemap rendering and interactive tooltips powered by D3.js.
- **Responsive Design**: The heatmap adjusts dynamically to screen size changes.
- **Hover Effects**: Display detailed stock information on hover.

## 🌐 Deployment

This project is deployed on **Vercel**: [Live Demo](https://stock-heatmap.vercel.app/).

## 📂 Repositories

- **Heatmap Web App**: [Stock Heatmap React](https://github.com/SxryxnshS5/Heatmap-react)
- **Custom Stock Scraper API**: [Python Playwright Stock Scraper API](https://github.com/SxryxnshS5/Python-Playwright-StockScraper-API)

### About the Stock Scraper API

This web app relies on my **Python Playwright Stock Scraper API** to fetch real-time stock data. The API scrapes data directly from market sources, ensuring accuracy and freshness. The scraped data is formatted into a CSV and seamlessly integrated into the heatmap app via automated workflows.

## 📊 Data Flow

1. **Custom Stock Scraper API**:
   - Scrapes stock market data periodically.
   - Formats the data into CSV files.

2. **GitHub Actions**:
   - Automates the process of updating CSV files in the repository.

3. **React App**:
   - Fetches the updated CSV data dynamically.
   - Processes and visualizes the data as a treemap using D3.js.

### Sample CSV Format

```csv
name,price,change
Tata Steel,140.5,-2.3
JSW Steel,710.4,3.1
Hindalco,420.6,-1.2
```

## ⚙️ How It Works

1. **Fetching CSV Data**:
   - CSV files are loaded dynamically with a cache-busting timestamp to ensure up-to-date information.
   
2. **Treemap Visualization**:
   - Data is processed into a hierarchical format and visualized as a heatmap using D3.js.
   - Green shades represent gains, while red shades indicate losses.
   
3. **Tooltip Interactivity**:
   - Hovering over a stock displays detailed information (name, price) via a tooltip.

4. **Automatic Updates**:
   - Your stock scraper runs on a schedule and updates the CSV data in the repository using GitHub Actions.

## 🛠️ Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/SxryxnshS5/Heatmap-react.git
   cd Heatmap-react
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the app**:

   ```bash
   npm start
   ```

4. Open the app in your browser:

   ```
   http://localhost:3000
   ```

## 🔧 Dependencies

- **React**: For building the UI.
- **D3.js**: For creating interactive data visualizations.
- **GitHub Actions**: For automating CSV updates.
- **Custom Stock Scraper API**: Your Python API for fetching real-time stock data.

## 🌐 Directory Structure

```
Heatmap-react/
├── public/
│   └── Scraped_data/
│       └── NIFTYMETAL_stock_data.csv  # CSV stock data
├── src/
│   ├── components/
│   │   └── StockTreemap.js            # Main heatmap component
│   └── App.js
├── package.json
└── README.md
```

## 🤝 Contributions

Contributions are welcome! If you have ideas to improve the app or the stock scraper, feel free to submit a pull request or open an issue.

## 📜 License

This project is licensed under the MIT License.

---

By combining the power of React, D3.js, and your custom-built scraper API, this project delivers a fast and reliable way to visualize stock market trends. **Happy coding!** 🖥️📈
