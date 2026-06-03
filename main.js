/* Akhil CH — portfolio interactions. Vanilla JS, no dependencies. */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- current year ---- */
  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---- mobile nav toggle ---- */
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---- typed tagline ---- */
  var typed = document.getElementById("typed");
  var phrases = [
    "AWS security end to end.",
    "I find attack paths and build the detection around them.",
    "Offense informs defense.",
  ];
  if (typed) {
    if (reduceMotion) {
      typed.textContent = phrases[1];
    } else {
      var p = 0, c = 0, deleting = false;
      var tick = function () {
        var full = phrases[p];
        c += deleting ? -1 : 1;
        typed.textContent = full.slice(0, c);
        var delay = deleting ? 28 : 55;
        if (!deleting && c === full.length) { delay = 1900; deleting = true; }
        else if (deleting && c === 0) { deleting = false; p = (p + 1) % phrases.length; delay = 360; }
        setTimeout(tick, delay);
      };
      setTimeout(tick, 600);
    }
  }

  /* ---- reveal on scroll ---- */
  var revealTargets = document.querySelectorAll(
    ".section, .project, .skill-card, .tl-item, .post-card"
  );
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealTargets.forEach(function (el) { el.classList.add("in"); });
  } else {
    revealTargets.forEach(function (el) { el.setAttribute("data-reveal", ""); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealTargets.forEach(function (el) { io.observe(el); });
  }
})();
