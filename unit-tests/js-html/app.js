export function increment() {
  const counter = document.getElementById('counter');
  const currentValue = parseInt(counter.textContent);
  counter.textContent = currentValue + 1;
  return currentValue + 1;
}

if (typeof window !== 'undefined') {
  document.getElementById('increment-btn')?.addEventListener('click', increment);
}