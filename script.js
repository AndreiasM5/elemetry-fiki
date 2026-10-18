const normal = 'M20 137L55 130L80 138L110 119L140 128L170 111L200 120L230 102L260 113L290 98L320 110L350 94L380 104L410 88L435 100L460 90';
const anomaly = 'M20 137L55 130L80 138L110 119L140 128L170 111L200 120L230 102L260 113L290 41L315 29L340 52L365 96L390 100L420 88L460 90';
document.querySelectorAll('[data-scenario]').forEach(button => {
  button.addEventListener('click', () => {
    const isAnomaly = button.dataset.scenario === 'anomaly';
    const path = isAnomaly ? anomaly : normal;
    document.querySelector('#chart-line').setAttribute('d', path);
    document.querySelector('#chart-area').setAttribute('d', path + 'V185H20Z');
    document.querySelector('#chart-alert').style.display = isAnomaly ? '' : 'none';
    document.querySelector('#scenario-label').textContent = isAnomaly ? 'Abatere detectata' : 'Profil de referinta';
    document.querySelector('#insight-icon').textContent = isAnomaly ? '↗' : '∿';
    document.querySelector('#insight-title').textContent = isAnomaly ? 'Un consum diferit. Un indiciu util.' : 'Fiecare echipament are un ritm.';
    document.querySelector('#insight-copy').textContent = isAnomaly ? 'Agentii AI ar putea semnala abaterea si propune verificarea echipamentului.' : 'Profilul obisnuit ofera context pentru identificarea unor abateri ulterioare.';
    document.querySelector('#signal-chart').setAttribute('aria-label', isAnomaly ? 'Exemplu ilustrativ: profil de consum cu o abatere fata de functionarea obisnuita' : 'Exemplu ilustrativ: profil de consum obisnuit, fara abaterea simulata');
    document.querySelectorAll('[data-scenario]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  });
});
const progress = document.querySelector('.read-progress');
let scheduled = false;
function updateProgress() {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = (max > 0 ? scrollY / max * 100 : 0) + '%';
  scheduled = false;
}
addEventListener('scroll', () => { if (!scheduled) { scheduled = true; requestAnimationFrame(updateProgress); } }, { passive: true });
addEventListener('resize', updateProgress);
updateProgress();
const navLinks = [...document.querySelectorAll('.nav-link')];
const sections = navLinks.map(link => document.querySelector(link.getAttribute('href')));
const observer = new IntersectionObserver(entries => {
  const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
  if (!visible.length) return;
  const id = visible[0].target.id;
  navLinks.forEach(link => {
    const active = link.getAttribute('href') === '#' + id;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
  });
}, { rootMargin: '-15% 0px -65% 0px', threshold: 0 });
sections.forEach(section => observer.observe(section));
observer.observe(document.querySelector('#acasa'));
