/* villie text pages (privacy, terms, support, contact).
   Builds the "On this page" list from the section headings and marks the
   one being read. Without it the page is the same text in one column. */
(function () {
  var doc = document.querySelector('.doc');
  var prose = document.querySelector('.prose');
  var toc = document.querySelector('.toc');
  if (!doc || !prose || !toc) return;
  var heads = prose.querySelectorAll('h2');
  if (heads.length < 3) return;

  var label = document.createElement('p');
  label.textContent = 'On this page';
  toc.appendChild(label);
  var links = [];
  Array.prototype.forEach.call(heads, function (h) {
    if (!h.id) {
      h.id = h.textContent.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    }
    var a = document.createElement('a');
    a.href = '#' + h.id;
    a.textContent = h.textContent;
    toc.appendChild(a);
    links.push(a);
  });
  doc.classList.add('has-toc');

  /* A heading that arrives by id after the list is built (a link from
     another page) needs the jump made again. */
  if (location.hash.length > 1) {
    var target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (target) target.scrollIntoView();
  }

  if (!('IntersectionObserver' in window)) return;
  /* The section being read is the last heading that has passed the top third. */
  function mark() {
    var line = window.innerHeight * 0.3, current = 0;
    for (var i = 0; i < heads.length; i++) {
      if (heads[i].getBoundingClientRect().top <= line) current = i;
    }
    links.forEach(function (a, i) {
      if (i === current) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
    });
  }
  var queued = false;
  window.addEventListener('scroll', function () {
    if (!queued) { queued = true; requestAnimationFrame(function () { queued = false; mark(); }); }
  }, { passive: true });
  mark();
})();
