/* ==========================================================================
   Aklima Akter Minu — portfolio interactions (plain JavaScript, no libraries)
   ========================================================================== */
(function () {
  'use strict';
  window.__aam = true; // tells the page's safety net that this file loaded

  var doc = document;
  var root = doc.documentElement;
  var body = doc.body;
  var SITE = window.SITE || {};
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  function $(s, c) { return (c || doc).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || doc).querySelectorAll(s)); }
  function clamp(n, a, b) { return Math.min(b, Math.max(a, n)); }

  /* ---------- contact details from config.js ---------- */
  (function applyConfig() {
    var year = $('#year'); if (year) year.textContent = new Date().getFullYear();

    $$('[data-contact="email"]').forEach(function (a) {
      if (SITE.email) { a.href = 'mailto:' + SITE.email; a.textContent = SITE.email; }
    });
    $$('[data-contact="linkedin"]').forEach(function (a) { if (SITE.linkedin) a.href = SITE.linkedin; });
    if (SITE.resume) {
      var rwrap = $('[data-contact-wrap="resume"]');
      var rlink = $('[data-contact="resume"]');
      if (rwrap && rlink) { rlink.href = SITE.resume; rwrap.hidden = false; }
    }
    if (SITE.whatsapp) {
      var wrap = $('[data-contact-wrap="whatsapp"]');
      var link = $('[data-contact="whatsapp"]');
      if (wrap && link) { link.href = 'https://wa.me/' + String(SITE.whatsapp).replace(/\D/g, ''); wrap.hidden = false; }
    }
    $$('[data-link]').forEach(function (el) {
      var url = SITE[el.getAttribute('data-link')];
      if (url) { el.setAttribute('href', url); el.setAttribute('target', '_blank'); el.setAttribute('rel', 'noopener'); }
      else if (el.hasAttribute('data-hide-empty')) { el.hidden = true; }
    });
  })();

  /* ---------- opening sequence ---------- */
  var loader = $('#loader');
  var hero = $('.hero');
  var started = false;

  function startSite(instant) {
    if (started) return; started = true;
    root.classList.remove('is-loading');
    body.classList.add('is-ready');
    if (loader && !instant) loader.classList.add('is-done');
    setTimeout(function () { hero.classList.add('is-in'); }, instant ? 30 : 650);
    setTimeout(function () { if (loader) loader.style.display = 'none'; }, 1700);
  }

  (function boot() {
    if (reduce || !loader) {
      if (loader) loader.style.display = 'none';
      startSite(true);
      return;
    }
    var minTime = new Promise(function (r) { setTimeout(r, 1750); });
    var loaded = new Promise(function (r) {
      if (doc.readyState === 'complete') r(); else window.addEventListener('load', r, { once: true });
    });
    var fonts = (doc.fonts && doc.fonts.ready) ? Promise.race([doc.fonts.ready, new Promise(function (r) { setTimeout(r, 2200); })]) : Promise.resolve();
    Promise.all([minTime, loaded, fonts]).then(function () { startSite(false); });
    setTimeout(function () { startSite(false); }, 4200); // failsafe
  })();

  /* ---------- manifesto: words light up as you scroll ---------- */
  var scrub = $('#scrub');
  var scrubWords = [];
  if (scrub) {
    (function split(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var frag = doc.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(doc.createTextNode(' ')); return; }
            var s = doc.createElement('span'); s.className = 'w'; s.textContent = part; frag.appendChild(s); scrubWords.push(s);
          });
          n.parentNode.replaceChild(frag, n);
        } else if (n.nodeType === 1) { split(n); }
      });
    })(scrub);
    if (reduce) scrubWords.forEach(function (w) { w.classList.add('on'); });
  }

  /* ---------- scroll-driven bits (one rAF loop) ---------- */
  var nav = $('#nav');
  var bar = $('#progress');
  var heroName = $('.hero__name');
  var heroPortrait = $('.hero__portrait');
  var parallaxEls = $$('.reveal-img[data-speed]');
  var lastY = window.scrollY, navHidden = false, ticking = false;

  function onScroll() {
    var y = window.scrollY;
    var vh = window.innerHeight;
    var doch = doc.documentElement.scrollHeight - vh;

    if (bar) bar.style.transform = 'scaleX(' + (doch > 0 ? clamp(y / doch, 0, 1) : 0) + ')';

    if (nav) {
      nav.classList.toggle('is-solid', y > 24);
      var dy = y - lastY;
      if (!body.classList.contains('menu-open')) {
        if (y > 420 && dy > 8 && !navHidden) { nav.classList.add('is-hidden'); navHidden = true; }
        else if ((dy < -8 || y < 420) && navHidden) { nav.classList.remove('is-hidden'); navHidden = false; }
      }
    }
    lastY = y;

    if (!reduce) {
      if (y < vh * 1.3) {
        // whole pixels only: fractional positions make text look soft
        if (heroName) heroName.style.setProperty('--ny', Math.round(y * 0.2) + 'px');
        if (heroPortrait) heroPortrait.style.setProperty('--py', Math.round(y * 0.07) + 'px');
      }
      parallaxEls.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) return;
        var mid = r.top + r.height / 2 - vh / 2;
        el.style.setProperty('--py', Math.round(mid * parseFloat(el.getAttribute('data-speed')) * -1) + 'px');
      });
    }

    if (scrub && scrubWords.length && !reduce) {
      var rr = scrub.getBoundingClientRect();
      // fully lit by the time the paragraph is comfortably on screen, so it is never left faded on phones
      var p = clamp((vh * 0.88 - rr.top) / (rr.height * 0.55 + vh * 0.18), 0, 1);
      var upto = Math.round(p * scrubWords.length);
      for (var i = 0; i < scrubWords.length; i++) {
        var on = i < upto;
        if (on !== scrubWords[i].classList.contains('on')) scrubWords[i].classList.toggle('on', on);
      }
    }
    ticking = false;
  }
  function requestTick() { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }
  window.addEventListener('scroll', requestTick, { passive: true });
  window.addEventListener('resize', requestTick);
  onScroll();

  /* ---------- image reveals + active nav link ---------- */
  if ('IntersectionObserver' in window) {
    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); revealIO.unobserve(e.target); } });
    }, { threshold: 0.18 });
    $$('.reveal-img').forEach(function (el) { revealIO.observe(el); });

    var rvIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); rvIO.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
    $$('.rv').forEach(function (el) { rvIO.observe(el); });

    var links = {};
    $$('.nav__links a').forEach(function (a) { links[a.getAttribute('href')] = a; });
    var navIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var a = links['#' + e.target.id];
        if (a) a.classList.toggle('is-active', e.isIntersecting);
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['sales', 'services', 'projects', 'content', 'about', 'experience'].forEach(function (id) { var s = doc.getElementById(id); if (s) navIO.observe(s); });
  } else {
    $$('.reveal-img, .rv').forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- mobile menu ---------- */
  var toggle = $('#menuToggle');
  var menu = $('#menu');
  function setMenu(open) {
    if (!toggle || !menu) return;
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.querySelector('.nav__toggle-label').textContent = open ? 'Close' : 'Menu';
    menu.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', open ? 'false' : 'true');
    body.classList.toggle('menu-open', open);
    root.style.overflow = open ? 'hidden' : '';
    if (open) nav.classList.remove('is-hidden');
  }
  if (toggle) toggle.addEventListener('click', function () { setMenu(toggle.getAttribute('aria-expanded') !== 'true'); });
  $$('#menu a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  doc.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  /* ---------- services accordion ---------- */
  var items = $$('.svc__item');
  items.forEach(function (item) {
    var head = $('.svc__head', item);
    var panel = $('.svc__panel', item);
    head.addEventListener('click', function () {
      var open = !item.classList.contains('is-open');
      items.forEach(function (o) {
        var isThis = o === item;
        var shouldOpen = isThis ? open : false;
        o.classList.toggle('is-open', shouldOpen);
        $('.svc__head', o).setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
        var p = $('.svc__panel', o);
        if (shouldOpen) p.removeAttribute('inert'); else p.setAttribute('inert', '');
      });
    });
  });

  /* ---------- website previews: tabs that swap the screenshot (and gently rotate until touched) ---------- */
  $$('[data-tabs]').forEach(function (stage) {
    var btns = $$('.tabs button', stage);
    var shots = $$('.frame__screen img', stage);
    var current = 0, touched = false, timer = null;
    function show(i) {
      current = i;
      btns.forEach(function (b, n) { b.setAttribute('aria-pressed', n === i ? 'true' : 'false'); });
      shots.forEach(function (img, n) {
        img.classList.toggle('is-on', n === i);
        if (n === i) img.removeAttribute('aria-hidden'); else img.setAttribute('aria-hidden', 'true');
      });
    }
    btns.forEach(function (b, n) {
      b.addEventListener('click', function () { touched = true; stop(); show(n); });
    });
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    function start() {
      if (reduce || touched || timer || btns.length < 2) return;
      timer = setInterval(function () { show((current + 1) % shots.length); }, 3800);
    }
    stage.addEventListener('mouseenter', stop);
    stage.addEventListener('mouseleave', start);
    stage.addEventListener('focusin', function () { touched = true; stop(); });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) start(); else stop(); });
      }, { threshold: 0.45 }).observe(stage);
    }
  });

  /* ---------- copy email ---------- */
  var copyBtn = $('#copyEmail');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var text = SITE.email || 'connect.minu@gmail.com';
      function done(ok) {
        copyBtn.textContent = ok ? 'Copied' : 'Press Ctrl+C';
        setTimeout(function () { copyBtn.textContent = 'Copy'; }, 1800);
      }
      function selectText() {
        var link = $('[data-contact="email"]');
        if (!link || !window.getSelection) return done(false);
        var range = doc.createRange(); range.selectNodeContents(link);
        var sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(range);
        done(false);
      }
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(function () { done(true); }, selectText);
        } else { selectText(); }
      } catch (e) { selectText(); }
    });
  }

  /* ---------- soft cursor ring (mouse devices only) ---------- */
  var cursor = $('#cursor');
  if (cursor && finePointer && !reduce) {
    var cx = 0, cy = 0, tx = 0, ty = 0, shown = false;
    window.addEventListener('mousemove', function (e) {
      tx = e.clientX; ty = e.clientY;
      if (!shown) { cx = tx; cy = ty; shown = true; cursor.classList.add('is-on'); }
    }, { passive: true });
    doc.addEventListener('mouseleave', function () { cursor.classList.remove('is-on'); shown = false; });
    (function loop() {
      cx += (tx - cx) * 0.18; cy += (ty - cy) * 0.18;
      cursor.style.transform = 'translate3d(' + cx.toFixed(1) + 'px,' + cy.toFixed(1) + 'px,0)';
      requestAnimationFrame(loop);
    })();
    doc.addEventListener('mouseover', function (e) {
      cursor.classList.toggle('is-hot', !!e.target.closest('a, button, .svc__head, .creed__row, .role, .mini, input, select, textarea'));
    });
  }
})();
