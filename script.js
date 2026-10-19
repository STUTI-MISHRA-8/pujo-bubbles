(() => {
  const pages = [...document.querySelectorAll('.page')];
  const fill = document.getElementById('progressFill');
  const counter = document.getElementById('pageCounter');
  let current = 0;
  function showPage(index) {
    current = Math.max(0, Math.min(index, pages.length - 1));
    pages.forEach((page, i) => {
      page.classList.toggle('active', i === current);
      page.setAttribute('aria-hidden', i === current ? 'false' : 'true');
    });
    fill.style.width = `${((current + 1) / pages.length) * 100}%`;
    counter.textContent = `${String(current + 1).padStart(2, '0')} / ${String(pages.length).padStart(2, '0')}`;
    window.scrollTo({top: 0, behavior: 'smooth'});
    history.replaceState(null, '', `#${pages[current].id}`);
  }
  document.querySelectorAll('[data-next]').forEach(button => button.addEventListener('click', () => showPage(current + 1)));
  document.getElementById('restart').addEventListener('click', () => showPage(0));
  const revealButton = document.getElementById('revealSwiss');
  const reveal = document.getElementById('swissReveal');
  revealButton.addEventListener('click', () => {
    reveal.hidden = false;
    revealButton.textContent = 'Surprise opened ♡';
    revealButton.disabled = true;
  });
  // Keep the opening class in place: removing it resets the CSS transform
  // and makes the curtains snap shut after the animation. The `forwards`
  // animation fill mode keeps them open for the rest of the visit.
  // If the page is opened at a section hash, start at that page.
  const initial = pages.findIndex(page => `#${page.id}` === location.hash);
  if (initial > 0) showPage(initial);
})();
