(() => {
  'use strict';
  document.documentElement.classList.add('js');
  const menu = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#navigation');
  const mobile = window.matchMedia('(max-width: 760px)');
  function closeMenu() {
    navigation.classList.remove('is-open');
    menu.setAttribute('aria-expanded', 'false');
  }
  function syncMenu() { menu.hidden = !mobile.matches; closeMenu(); }
  syncMenu();
  mobile.addEventListener('change', syncMenu);
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    navigation.classList.toggle('is-open', open);
  });
  navigation.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
      closeMenu(); menu.focus();
    }
  });
  const filters = document.querySelector('.publication-filters');
  const publications = [...document.querySelectorAll('.publication')];
  function setFilter(value) {
    let visible = 0;
    publications.forEach(publication => {
      publication.hidden = value !== 'all' && publication.dataset.status !== value;
      if (!publication.hidden) visible++;
    });
    filters.querySelectorAll('button').forEach(button => {
      const selected = button.dataset.filter === value;
      button.classList.toggle('active', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    document.querySelector('#publication-status').textContent = `Showing ${visible} publications.`;
  }
  filters.hidden = false;
  filters.addEventListener('click', event => {
    const button = event.target.closest('button[data-filter]');
    if (button) setFilter(button.dataset.filter);
  });
  function revealHashTarget() {
    const id = location.hash.slice(1);
    const target = id && document.getElementById(id);
    if (target && target.matches('.publication') && target.hidden) {
      setFilter('all'); target.scrollIntoView();
    }
  }
  window.addEventListener('hashchange', revealHashTarget);
  revealHashTarget();
})();
