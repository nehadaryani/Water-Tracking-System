
// Get the form and chart elements
const form = document.getElementById('consumptionForm');
const chartCanvas = document.getElementById('consumptionChart');
const conservationMeasuresContainer = document.getElementById('conservationMeasures');

// Add event listener to form submission
form.addEventListener('submit', (event) => {
  event.preventDefault();

  // Get the input values
  const day1 = document.getElementById('day1').value;
  const day2 = document.getElementById('day2').value;
  const day3 = document.getElementById('day3').value;
  const day4 = document.getElementById('day4').value;
  const day5 = document.getElementById('day5').value;
  const day6 = document.getElementById('day6').value;
  const day7 = document.getElementById('day7').value;

  // Validate input values
  if (day1 === '' || day2 === '' || day3 === '' || day4 === '' || day5 === '' || day6 === '' || day7 === '') {
    alert('Please fill in all fields to proceed further');
    return;
  }

  // Convert input values to numbers
  const userConsumption = [day1, day2, day3, day4, day5, day6, day7].map(Number);

  // Check for invalid input values
  if (userConsumption.includes(NaN)) {
    alert('Please enter valid numbers for all days');
    return;
  }

  // Example standard consumption for comparison
  const standardConsumption = [100, 120, 110, 130, 105, 125, 115];

  // Create the chart
  const ctx = chartCanvas.getContext('2d');
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
      datasets: [{
        label: 'Your Consumption',
        data: userConsumption,
        borderColor: 'red',
        fill: false
      }, {
        label: 'Standard Consumption',
        data: standardConsumption,
        borderColor: 'blue',
        fill: false
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Water Consumption Chart'
      }
    }
  });

  // Calculate conservation measures
  const totalUserConsumption = userConsumption.reduce((a, b) => a + b, 0);
  const totalStandardConsumption = standardConsumption.reduce((a, b) => a + b, 0);
  let conservationMeasures = [];

  if (totalUserConsumption > totalStandardConsumption) {
    alert("High Water Usage Detected");
    conservationMeasures.push('<h1>WATER CONSERVATION MEASURES</h1>');
    conservationMeasures.push('<h4>Kindly consider below methods to save water:</h4>');
    conservationMeasures.push('1. Reduce water usage by taking shorter showers.');
    conservationMeasures.push('2. Fix leaks to avoid wasting water.');
    conservationMeasures.push('3. Use water-efficient appliances and fixtures.');
    conservationMeasures.push('4. Harvest rainwater for non-potable uses.');
    conservationMeasures.push('5. Use drought-resistant plants in your garden.');
  } else if (totalUserConsumption === totalStandardConsumption) {
    conservationMeasures.push('You are using water efficiently. Keep up the good work!');
  } else if (totalUserConsumption === 0) {
    conservationMeasures.push('Please fill in all fields');
  } else {
    conservationMeasures.push('You are using less water than the  total standard consumption of 7 days . Great job!');
  }

  // Display conservation measures
  conservationMeasuresContainer.innerHTML = conservationMeasures.join('<br>');
});