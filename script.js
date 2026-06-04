const pad = n => String(n).padStart(2,'0');
const now0 = new Date('2026-05-26T00:00:00');

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

tick();
setInterval(tick, 1000);
