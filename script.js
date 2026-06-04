const pad = n => String(n).padStart(2,'0');
const now0 = new Date('2026-05-26T00:00:00');

async function loadConfig() {
  const res = await fetch('config.json');
  return res.json();
}

function createCard(config) {
  return `
    <div class="card ${config.class}" data-event-id="${config.id}" data-target="${config.target}">
      <div class="event-label">${config.name}</div>
      <div class="big-number" id="${config.id}-days">--</div>
      <div class="days-label">days to go</div>
      <div class="divider"></div>
      <div class="target-date">${config.displayDate}</div>
      <div class="breakdown">
        <div class="unit"><span class="unit-val" id="${config.id}-hrs">--</span><span class="unit-label">Hours</span></div>
        <div class="unit"><span class="unit-val" id="${config.id}-mins">--</span><span class="unit-label">Minutes</span></div>
        <div class="unit"><span class="unit-val" id="${config.id}-secs">--</span><span class="unit-label">Seconds</span></div>
      </div>
      <div class="progress-bar"><div class="progress-fill" id="${config.id}-prog"></div></div>
      <div class="progress-label"><span>Today</span><span>${config.progressLabel}</span></div>
    </div>
  `;
}

function tick() {
  const now = new Date();
  document.querySelectorAll('[data-event-id][data-target]').forEach(card => {
    const id = card.dataset.eventId;
    const target = new Date(card.dataset.target);
    const diff = target - now;
    const totalMs = target - now0;
    if (diff <= 0) {
      document.getElementById(`${id}-days`).textContent = '0';
      document.getElementById(`${id}-hrs`).textContent = '00';
      document.getElementById(`${id}-mins`).textContent = '00';
      document.getElementById(`${id}-secs`).textContent = '00';
      document.getElementById(`${id}-prog`).style.width = '100%';
      return;
    }
    const ts = Math.floor(diff / 1000);
    document.getElementById(`${id}-days`).textContent = Math.floor(ts / 86400);
    document.getElementById(`${id}-hrs`).textContent = pad(Math.floor((ts % 86400) / 3600));
    document.getElementById(`${id}-mins`).textContent = pad(Math.floor((ts % 3600) / 60));
    document.getElementById(`${id}-secs`).textContent = pad(ts % 60);
    const pct = Math.min(100, Math.max(0, ((now - now0) / totalMs) * 100));
    document.getElementById(`${id}-prog`).style.width = pct + '%';
  });
}

async function init() {
  const config = await loadConfig();
  const wrapper = document.querySelector('.wrapper');
  wrapper.innerHTML = config.countdowns.map(createCard).join('');
  tick();
  setInterval(tick, 1000);
}

init();
