// Listen for submit
document.getElementById('loan-form').addEventListener('submit', calculateResults);

// Calculate results
function calculateResults(e) {

  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principle = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const caculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, caculatedPayments);
  const monthly = (principle * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * caculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * caculatedPayments) - principle).toFixed(2);
  } else {
    showError('Please check your numbers.');
  }
  e.preventDefault();
}

function showError(error) {

  const errorDiv = document.createElement('div');

  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  errorDiv.className = 'alert alert-danger';

  errorDiv.appendChild(document.createTextNode(error));

  card.insertBefore(errorDiv, heading);

  // Remove error
  setTimeout(clearError, 3000);
}

function clearError() {
  document.querySelector('.alert').remove();
}