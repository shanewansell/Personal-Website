const sec = document.getElementById('sec');
const min = document.getElementById('min');
const hour = document.getElementById('hour');
const clock = document.getElementById('clock');
const digitalTime = document.getElementById('digital-time');
const analogueMode = document.getElementById('analogue-mode');
const digitalMode = document.getElementById('digital-mode');

function updateClock() {
  const now = new Date();
  const ms = now.getMilliseconds();
  const s = now.getSeconds();
  const m = now.getMinutes();
  const h = now.getHours();

  sec.style.transform = `rotate(${(s+ms/1000)/60}turn)`;
  min.style.transform = `rotate(${(m+s/60)/60}turn)`;
  hour.style.transform = `rotate(${(h+m/60)/12}turn)`;

  digitalTime.dateTime = now.toISOString();
  digitalTime.textContent = now.toLocaleTimeString();
}

function setClockMode(mode) {
  const isDigital = mode === 'digital';
  clock.classList.toggle('is-digital', isDigital);
  digitalTime.hidden = !isDigital;
  analogueMode.disabled = !isDigital;
  digitalMode.disabled = isDigital;
  analogueMode.setAttribute('pressed', String(!isDigital));
  digitalMode.setAttribute('pressed', String(isDigital));
}

analogueMode.addEventListener('click', () => setClockMode('analogue'));
digitalMode.addEventListener('click', () => setClockMode('digital'));

updateClock();
setInterval(updateClock);