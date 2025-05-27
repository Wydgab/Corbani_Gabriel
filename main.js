function clearDisplay() {
  display.value = '';
}
function backspace() {
  display.value = display.value.slice(0, -1);
}
function appendValue(value) {
  display.value += value;
}
function calculateResult() {
  try {
    display.value = eval(display.value);
  } catch (error) {
    display.value = 'Error';
  }
}
function hideCalculator() {
  document.getElementById('calculator').classList.remove('active');
  document.getElementById('calculatorOverlay').classList.remove('active');
  document.getElementById('mainContent').classList.remove('hidden');
}
