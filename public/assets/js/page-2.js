(function () {
  // mobile menu
  var btn = document.getElementById('menu-btn'), menu = document.getElementById('mobile-menu');
  var io = document.getElementById('ico-open'), ic = document.getElementById('ico-close');
  function setMenu(open) {
    menu.classList.toggle('hidden', !open);
    io.classList.toggle('hidden', open); ic.classList.toggle('hidden', !open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  btn.addEventListener('click', function () { setMenu(menu.classList.contains('hidden')); });
  menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  window.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  // day-arc rail: page progress maps to 8 -> 24
  var rail = document.getElementById('day-rail');
  var fill = document.getElementById('rail-fill'), now = document.getElementById('rail-now'), clock = document.getElementById('rail-clock');
  var marks = rail.querySelectorAll('.mark'), stops = [0, 25, 62.5, 100];
  function update() {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    var p = h > 0 ? Math.min(1, Math.max(0, window.scrollY / h)) : 0;
    var pct = p * 100;
    fill.style.height = pct + '%'; now.style.top = pct + '%';
    var hour = 8 + 16 * p, hh = Math.floor(hour), mm = Math.floor((hour - hh) * 60 / 15) * 15;
    clock.style.top = pct + '%';
    clock.textContent = (hh === 24 ? '00' : ('0' + hh).slice(-2)) + ':' + ('0' + mm).slice(-2);
    clock.style.display = p > 0.01 ? 'block' : 'none';
    marks.forEach(function (m, i) { m.classList.toggle('on', pct >= stops[i] - 0.5); });
  }
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();

  // reveal
  var els = document.querySelectorAll('#services-section .svc-row, #reviews-section .rev, .menu-panel, .map-box, #hours');
  els.forEach(function (el) { el.classList.add('rv'); });
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); obs.unobserve(en.target); } });
    }, { threshold: 0.12 });
    els.forEach(function (el) { obs.observe(el); });
    // runtime-cloned items get revealed by a safety pass
    setTimeout(function () { document.querySelectorAll('.rv:not(.in)').forEach(function (el) {
      var r = el.getBoundingClientRect(); if (r.top < window.innerHeight) el.classList.add('in'); }); }, 1500);
  } else { els.forEach(function (el) { el.classList.add('in'); }); }
})();