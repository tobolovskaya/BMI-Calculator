const calculateBtn = document.getElementById('calculate');
const heightInput = document.querySelector('#height');
const weightInput = document.querySelector('#weight');
const resultOutput = document.querySelector('#result');
const commentOutput = document.querySelector('.comment');
const historyList = document.querySelector('#history-list');
const themeToggle = document.getElementById('theme-toggle');

// Theme toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

// Calculate BMI
calculateBtn.addEventListener('click', function () {
  const heightValue = parseFloat(heightInput.value.trim());
  const weightValue = parseFloat(weightInput.value.trim());

  if (!heightValue || !weightValue || heightValue <= 0 || weightValue <= 0) {
    alert('Please enter valid height and weight!');
    return;
  }

  const heightInMeters = heightValue / 100;
  const bmiValue = weightValue / (heightInMeters * heightInMeters);
  const roundedBmiValue = bmiValue.toFixed(2);
  resultOutput.innerHTML = roundedBmiValue;

  let status = '';
  if (bmiValue < 18.5) {
    status = 'Underweight 😒';
  } else if (bmiValue < 25) {
    status = 'Normal Weight 😍';
  } else if (bmiValue < 30) {
    status = 'Overweight 😮';
  } else {
    status = 'Obese 😱';
  }

  commentOutput.innerHTML = `Comment: you are <span id="comment">${status}</span>`;

  const newItem = document.createElement('li');
  newItem.textContent = `Height: ${heightValue} cm, Weight: ${weightValue} kg → BMI: ${roundedBmiValue} (${status})`;
  historyList.prepend(newItem);
});
