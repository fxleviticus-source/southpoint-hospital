// South Point Hospitals — shared behaviour

document.addEventListener('DOMContentLoaded', function () {

  /* Mobile nav toggle */
  var burger = document.querySelector('.hamburger');
  var mobileNav = document.querySelector('.mobile-nav');
  if (burger && mobileNav) {
    burger.addEventListener('click', function () {
      burger.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        burger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* Sticky header shadow on scroll */
  var header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.style.boxShadow = window.scrollY > 8 ? '0 4px 16px rgba(11,53,86,0.10)' : 'none';
    }, { passive: true });
  }

  /* Gentle reveal-on-scroll */
  var revealEls = document.querySelectorAll('.feature-card, .service-card, .clinic-pill-card, .branch-card, .gallery-item');
  if ('IntersectionObserver' in window && revealEls.length) {
    revealEls.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* Count-up numbers (stat figures) when scrolled into view */
  var countEls = document.querySelectorAll('[data-countup]');
  if (countEls.length) {
    var countIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var target = parseInt(el.getAttribute('data-countup'), 10);
        var suffix = el.getAttribute('data-suffix') || '';
        var duration = 1100;
        var start = null;
        function step(ts) {
          if (!start) start = ts;
          var progress = Math.min((ts - start) / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(target * eased) + suffix;
          if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        countIO.unobserve(el);
      });
    }, { threshold: 0.5 });
    countEls.forEach(function (el) { countIO.observe(el); });
  }

  /* Contact form demo submit */
  var form = document.querySelector('[data-contact-form]');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var note = form.querySelector('.form-success');
      if (note) note.style.display = 'block';
      form.reset();
    });
  }
});
