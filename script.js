const pad = n => String(n).padStart(2, '0');
const THEMES = ['theme-a', 'theme-b', 'theme-c', 'theme-d', 'theme-e'];

const MONTHS_LONG  = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const MONTHS_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function formatDisplayDate(iso) {
  const d = new Date(iso);
  const h = d.getHours();
  const ampm = h >= 12 ? 'pm' : 'am';
  const h12 = h % 12 || 12;
  return `${d.getDate()} <em>${MONTHS_LONG[d.getMonth()]}</em> ${d.getFullYear()} · ${h12}${ampm}`;
}

function formatProgressLabel(iso) {
  const d = new Date(iso);
  return `${d.getDate()} ${MONTHS_SHORT[d.getMonth()]} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function buildCard({ id, label, target }, index) {
  const theme = THEMES[index % THEMES.length];
  return `
    <div class="card ${theme}" data-event-id="${id}" data-target="${target}">
      <div class="event-label">${label}</div>
      <div class="big-number" id="${id}-days">--</div>
      <div class="days-label">days to go</div>
      <div class="divider"></div>
      <div class="target-date">${formatDisplayDate(target)}</div>
      <div class="breakdown">
        <div class="unit"><span class="unit-val" id="${id}-hrs">--</span><span class="unit-label">Hours</span></div>
        <div class="unit"><span class="unit-val" id="${id}-mins">--</span><span class="unit-label">Minutes</span></div>
        <div class="unit"><span class="unit-val" id="${id}-secs">--</span><span class="unit-label">Seconds</span></div>
      </div>
      <div class="progress-bar"><div class="progress-fill" id="${id}-prog"></div></div>
      <div class="progress-label"><span>Today</span><span>${formatProgressLabel(target)}</span></div>
    </div>`;
}

function tick(events, now0) {
  const now = new Date();
  events.forEach(({ id, target }) => {
    const t = new Date(target);
    const diff = t - now;
    const totalMs = t - now0;
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
    document.getElementById(`${id}-hrs`).textContent  = pad(Math.floor((ts % 86400) / 3600));
    document.getElementById(`${id}-mins`).textContent = pad(Math.floor((ts % 3600) / 60));
    document.getElementById(`${id}-secs`).textContent = pad(ts % 60);
    const pct = Math.min(100, Math.max(0, ((now - now0) / totalMs) * 100));
    document.getElementById(`${id}-prog`).style.width = pct + '%';
  });
}

fetch('config.json')
  .then(r => {
    if (!r.ok) throw new Error(`HTTP ${r.status} loading config.json`);
    return r.json();
  })
  .then(({ startDate, events }) => {
    const now0 = new Date(startDate);
    document.querySelector('.wrapper').innerHTML = events.map((e, i) => buildCard(e, i)).join('');
    tick(events, now0);
    setInterval(() => tick(events, now0), 1000);
  })
  .catch(err => {
    console.error('Could not load config.json:', err);
    document.querySelector('.wrapper').textContent = 'Error loading config — check the console.';
  });
