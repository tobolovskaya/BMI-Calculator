const calculateBtn = document.getElementById('calculate');
const heightInput = document.getElementById('height');
const weightInput = document.getElementById('weight');
const ageInput = document.getElementById('age');
const resultOutput = document.getElementById('result');
const commentOutput = document.querySelector('.comment');
const historyList = document.getElementById('history-list');
const themeToggle = document.getElementById('theme-toggle');
const pointer = document.getElementById('pointer');

// Перемикач теми
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

// Обчислення BMI
calculateBtn.addEventListener('click', function () {
  const height = parseFloat(heightInput.value.trim());
  const weight = parseFloat(weightInput.value.trim());
  const age = parseInt(ageInput.value.trim());
  const gender = document.querySelector('input[name="gender"]:checked').value;

  if (!height || !weight || !age || height <= 0 || weight <= 0 || age <= 0) {
    alert('Please enter valid height, weight, and age!');
    return;
  }

  const heightMeters = height / 100;
  const bmi = weight / (heightMeters * heightMeters);
  const roundedBMI = bmi.toFixed(1);
  resultOutput.innerText = roundedBMI;

  // Статус
  let status = '';
  if (bmi < 18.5) {
    status = 'Underweight 😒';
  } else if (bmi < 25) {
    status = 'Normal Weight 😍';
  } else if (bmi < 30) {
    status = 'Overweight 😮';
  } else {
    status = 'Obese 😱';
  }

  commentOutput.innerHTML = `Comment: you are <span id="comment">${status}</span>`;

  // Здорова вага
  const minHealthy = (18.5 * heightMeters * heightMeters).toFixed(1);
  const maxHealthy = (24.9 * heightMeters * heightMeters).toFixed(1);
  commentOutput.innerHTML += `<br>Healthy weight range: ${minHealthy}–${maxHealthy} kg`;

  // Додати до історії
  const item = document.createElement('li');
  item.textContent = `Gender: ${gender}, Age: ${age}, Height: ${height} cm, Weight: ${weight} kg → BMI: ${roundedBMI} (${status})`;
  historyList.prepend(item);

  // Перемістити стрілку на шкалі
  const scale = document.querySelector('.bmi-scale');
  const relativePosition = Math.min((bmi / 40), 1);
  pointer.style.left = `calc(${(relativePosition * 100).toFixed(1)}% - 15px)`;
});
