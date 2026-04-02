/* =========================================
   Portfolio Main JavaScript
   ========================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* --- Dark Mode --- */
  const htmlEl = document.documentElement;
  const darkToggle = document.getElementById('darkToggle');
  const savedTheme = localStorage.getItem('theme') || 'light';
  htmlEl.setAttribute('data-theme', savedTheme);

  darkToggle.addEventListener('click', function () {
    const next = htmlEl.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    htmlEl.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  /* --- Mobile Menu --- */
  const menuBtn = document.getElementById('menuBtn');
  const gnbNav  = document.getElementById('gnbNav');

  menuBtn.addEventListener('click', function () {
    gnbNav.classList.toggle('open');
  });

  gnbNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () { gnbNav.classList.remove('open'); });
  });

  /* --- Scroll Progress Bar --- */
  var progressBar = document.getElementById('scrollProgress');
  function updateProgress() {
    var scrollTop  = document.documentElement.scrollTop || document.body.scrollTop;
    var docHeight  = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
  }

  /* --- Active Nav & Page Dots on Scroll --- */
  var sections  = document.querySelectorAll('section[id]');
  var navLinks  = document.querySelectorAll('.gnb-nav a[href^="#"]');
  var pageDotEls = document.querySelectorAll('.page-dot[data-section]');

  function updateActiveNav() {
    var scrollY = window.scrollY + 120;
    sections.forEach(function (section) {
      var sTop = section.offsetTop;
      var sH   = section.offsetHeight;
      var sId  = section.getAttribute('id');
      if (scrollY >= sTop && scrollY < sTop + sH) {
        navLinks.forEach(function (l) { l.classList.remove('active'); });
        pageDotEls.forEach(function (d) { d.classList.remove('active'); });
        var link = document.querySelector('.gnb-nav a[href="#' + sId + '"]');
        var dot  = document.querySelector('.page-dot[data-section="' + sId + '"]');
        if (link) link.classList.add('active');
        if (dot)  dot.classList.add('active');
      }
    });
  }

  /* --- GNB scroll shadow --- */
  var gnb = document.querySelector('.gnb');
  function updateGnbShadow() {
    gnb.style.boxShadow = window.scrollY > 10
      ? '0 2px 16px rgba(192,65,90,0.12)'
      : 'none';
  }

  window.addEventListener('scroll', function () {
    updateProgress();
    updateActiveNav();
    updateGnbShadow();
  }, { passive: true });

  updateProgress();
  updateActiveNav();
  updateGnbShadow();

  /* --- Typing Animation --- */
  var typingEl = document.getElementById('typingText');
  var phrases  = [
    'JAVA Back-End Developer',
    'SI Team Lead & Architect',
    'Full-Stack Engineer',
    'Public Web Developer',
    'Python Developer',
    'AI Enthusiast'
  ];
  var phraseIdx = 0, charIdx = 0, isDeleting = false, typeDelay = 100;

  function type() {
    var current = phrases[phraseIdx];
    typingEl.textContent = isDeleting
      ? current.substring(0, charIdx - 1)
      : current.substring(0, charIdx + 1);
    charIdx += isDeleting ? -1 : 1;
    typeDelay = isDeleting ? 50 : 100;

    if (!isDeleting && charIdx === current.length) {
      isDeleting = true; typeDelay = 1800;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx  = (phraseIdx + 1) % phrases.length;
      typeDelay  = 400;
    }
    setTimeout(type, typeDelay);
  }
  setTimeout(type, 800);

  /* --- Scroll Fade-in (Intersection Observer) --- */
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(function (el) { observer.observe(el); });

  /* --- Skill Bar Animation --- */
  var skillObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.getAttribute('data-level') + '%';
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.skill-fill').forEach(function (el) { skillObserver.observe(el); });

  /* --- Counter Animation --- */
  function animateCounter(el) {
    var target   = parseInt(el.getAttribute('data-count'), 10);
    var suffix   = el.getAttribute('data-suffix') || '';
    var duration = 1600;
    var step     = target / (duration / 16);
    var current  = 0;
    var timer = setInterval(function () {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = Math.floor(current) + suffix;
    }, 16);
  }

  var counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  document.querySelectorAll('.count-up').forEach(function (el) { counterObserver.observe(el); });

  /* --- Projects Search & Filter --- */
  var filterBtns   = document.querySelectorAll('.filter-btn');
  var projectCards = document.querySelectorAll('.project-card');
  var searchInput  = document.getElementById('projectSearch');
  var noResults    = document.getElementById('noResults');
  var activeFilter = 'all';

  function filterProjects() {
    var keyword = searchInput.value.trim().toLowerCase();
    var count   = 0;
    projectCards.forEach(function (card) {
      var catMatch = (activeFilter === 'all' || card.getAttribute('data-category') === activeFilter);
      var keyMatch = (keyword === '' || card.textContent.toLowerCase().includes(keyword));
      card.style.display = (catMatch && keyMatch) ? 'flex' : 'none';
      if (catMatch && keyMatch) count++;
    });
    noResults.style.display = count === 0 ? 'block' : 'none';
  }

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      activeFilter = btn.getAttribute('data-filter');
      filterProjects();
    });
  });

  searchInput.addEventListener('input', filterProjects);

  /* --- Project View Toggle (Card / Timeline) --- */
  var btnCardView = document.getElementById('btnCardView');
  var btnTimelineView = document.getElementById('btnTimelineView');
  var cardView = document.getElementById('cardView');
  var timelineView = document.getElementById('timelineView');

  btnCardView.addEventListener('click', function() {
    btnCardView.classList.add('active');
    btnTimelineView.classList.remove('active');
    cardView.style.display = 'block';
    timelineView.classList.remove('visible');
  });

  btnTimelineView.addEventListener('click', function() {
    btnTimelineView.classList.add('active');
    btnCardView.classList.remove('active');
    cardView.style.display = 'none';
    timelineView.classList.add('visible');
  });

  /* --- Planning Modal --- */
  function openModal(modalId) {
    var modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.planning-preview-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      openModal(btn.getAttribute('data-modal'));
    });
  });

  document.querySelectorAll('.planning-modal').forEach(function(modal) {
    modal.querySelector('.planning-modal-close').addEventListener('click', function() {
      closeModal(modal);
    });
    modal.querySelector('.planning-modal-backdrop').addEventListener('click', function() {
      closeModal(modal);
    });
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.planning-modal.open').forEach(closeModal);
    }
  });

});
