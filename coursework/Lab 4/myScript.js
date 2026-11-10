const sec = document.getElementById('sec');
const min = document.getElementById('min');
const hour = document.getElementById('hour');

function updateClock() {
  const now = new Date();
  const ms = now.getMilliseconds();
  const s = now.getSeconds();
  const m = now.getMinutes();
  const h = now.getHours();

  sec.style.transform = `rotate(${(s+ms/1000)/60}turn)`;
  min.style.transform = `rotate(${(m+s/60)/60}turn)`;
  hour.style.transform = `rotate(${(h+m/60)/12}turn)`;
}

updateClock();
setInterval(updateClock)