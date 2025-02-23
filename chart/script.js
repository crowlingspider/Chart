// Get elements
const ctx = document.getElementById('priceChart').getContext('2d');
const currentPriceElement = document.getElementById('currentPrice');
const timeSlider = document.getElementById('timeSlider');
const themeToggle = document.getElementById('themeToggle');

// Function to determine line color based on price movement
function getLineColor(data) {
  if (data.length < 2) return '#00d1b2'; // Default color if not enough data
  const firstPrice = data[0].price;
  const lastPrice = data[data.length - 1].price;
  return lastPrice >= firstPrice ? '#00ff00' : '#ff0000'; // Green for increase, red for decrease
}

// Function to update chart theme
function updateChartTheme(isLightMode) {
  const xAxis = chart.options.scales.x;
  const yAxis = chart.options.scales.y;

  if (isLightMode) {
    // Light mode colors
    xAxis.ticks.color = '#333';
    xAxis.grid.color = '#ddd';
    yAxis.ticks.color = '#333';
    yAxis.grid.color = '#ddd';
  } else {
    // Dark mode colors
    xAxis.ticks.color = '#fff';
    xAxis.grid.color = '#444';
    yAxis.ticks.color = '#fff';
    yAxis.grid.color = '#444';
  }

  chart.update(); // Refresh the chart
}

// Chart configuration
const chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: priceData.map((_, index) => (index % 50 === 0 ? index : '')),
    datasets: [{
      label: 'Price',
      data: priceData.map(data => data.price),
      borderColor: getLineColor(priceData), // Dynamic color based on price movement
      borderWidth: 2,
      fill: false,
      pointRadius: 0,
      tension: 0, // Sharp lines
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: true,
        grid: {
          color: '#444', // Default dark mode grid color
        },
        ticks: {
          color: '#fff', // Default dark mode text color
          maxTicksLimit: 10,
        }
      },
      y: {
        display: true,
        grid: {
          color: '#444', // Default dark mode grid color
        },
        ticks: {
          color: '#fff', // Default dark mode text color
          callback: (value) => `₹${value}`, // Display prices in INR
        }
      }
    },
    plugins: {
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
        callbacks: {
          title: (context) => `Time: ${priceData[context[0].dataIndex].date}`,
          label: (context) => `Price: ₹${context.raw}`, // Display prices in INR
        }
      },
      legend: {
        display: false,
      },
      zoom: {
        pan: {
          enabled: true,
          mode: 'x',
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'x',
        }
      }
    }
  }
});

// Update current price
function updateCurrentPrice() {
  const latestPrice = priceData[priceData.length - 1].price;
  currentPriceElement.textContent = `₹${latestPrice.toFixed(2)}`; // Display in INR
}

// Update chart based on slider
timeSlider.addEventListener('input', () => {
  const sliderValue = parseInt(timeSlider.value);
  const slicedData = priceData.slice(-sliderValue);

  // Update chart data and color
  chart.data.labels = slicedData.map((_, index) => (index % 50 === 0 ? index : ''));
  chart.data.datasets[0].data = slicedData.map(data => data.price);
  chart.data.datasets[0].borderColor = getLineColor(slicedData); // Update line color
  chart.update();
});

// Dark/Light mode toggle
themeToggle.addEventListener('click', () => {
  const isLightMode = document.body.classList.toggle('light-mode');
  updateChartTheme(isLightMode); // Update chart theme
  themeToggle.textContent = isLightMode
    ? 'Switch to Dark Mode'
    : 'Switch to Light Mode';
});

// Initial setup
updateCurrentPrice();