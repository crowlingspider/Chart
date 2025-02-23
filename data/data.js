// Sample price data with 500 points (in INR)
const priceData = [];
let currentPrice = 100 * 82; // Starting price in INR
let currentDate = new Date('2023-10-01T00:00:00');

for (let i = 0; i < 500; i++) {
  // Random price fluctuation
  const fluctuation = (Math.random() - 0.5) * 10 * 82; // Random value between -410 and +410 INR
  currentPrice += fluctuation;

  // Ensure price doesn't go negative
  if (currentPrice < 0) currentPrice = 0;

  // Add data point
  priceData.push({
    price: parseFloat(currentPrice.toFixed(2)), // Round to 2 decimal places
    date: currentDate.toISOString().slice(0, 16).replace('T', ' '), // Format as "YYYY-MM-DD HH:mm"
  });

  // Increment date by 5 minutes
  currentDate.setMinutes(currentDate.getMinutes() + 5);
}