// mlapacz.github.io — the only script on the page.
// 1. theme toggle (persists in localStorage, follows the OS otherwise)
// 2. reveals the "stack over time" bars when they scroll into view
// 3. reveals section content as it scrolls into view (once, staggered)
(function () {
  var root = document.documentElement;
  root.classList.remove("no-js");

  // --- theme ---
  var btn = document.querySelector("[data-theme-toggle]");
  var mq = window.matchMedia("(prefers-color-scheme: dark)");

  function effective() {
    return root.dataset.theme || (mq.matches ? "dark" : "light");
  }

  function label() {
    if (!btn) return;
    var next = effective() === "dark" ? "light" : "dark";
    btn.textContent = next === "dark" ? "Dark" : "Light";
    btn.setAttribute("aria-label", "Switch to " + next + " theme");
  }

  if (btn) {
    btn.addEventListener("click", function () {
      var next = effective() === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      try {
        localStorage.setItem("theme", next);
      } catch (e) {
        /* private mode: theme still switches, just does not persist */
      }
      label();
    });
    mq.addEventListener("change", label);
    label();
  }

  // --- stack chart reveal ---
  var stack = document.querySelector(".stack");
  if (stack) {
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              stack.classList.add("is-in");
              io.disconnect();
            }
          });
        },
        { threshold: 0.12 }
      );
      io.observe(stack);
    } else {
      stack.classList.add("is-in");
    }
  }

  // --- scroll reveal (mirrors the selector list in style.css) ---
  var REVEAL =
    ".section__label, .section__body > :not(.stances, .work, .contact, .ledger), " +
    ".stances > li, .work > li, .contact > li, .ledger tbody > tr, .foot > p";
  var items = Array.prototype.slice.call(document.querySelectorAll(REVEAL));

  function show(el, delay) {
    el.style.transitionDelay = delay ? delay + "ms" : "";
    el.classList.add("is-in");
  }

  // (with prefers-reduced-motion the CSS turns this into a plain cross-fade)
  if (items.length) {
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) {
        show(el, 0);
      });
    } else {
      var pending = items.slice();

      function done(el) {
        rio.unobserve(el);
        var k = pending.indexOf(el);
        if (k > -1) pending.splice(k, 1);
      }

      var rio = new IntersectionObserver(
        function (entries) {
          // everything entering in the same tick gets a small stagger, in DOM order
          var entering = entries
            .filter(function (e) {
              return e.isIntersecting;
            })
            .sort(function (a, b) {
              return items.indexOf(a.target) - items.indexOf(b.target);
            });
          entering.forEach(function (e, i) {
            show(e.target, Math.min(i, 8) * 60);
            done(e.target);
          });
          // anything the viewport has already jumped past (anchor link, End key,
          // reload mid-page) is shown at once, without animation
          pending.slice().forEach(function (el) {
            if (el.getBoundingClientRect().bottom < 0) {
              el.style.transition = "none";
              show(el, 0);
              done(el);
            }
          });
        },
        { threshold: 0 }
      );
      items.forEach(function (el) {
        rio.observe(el);
      });
    }
  }
})();
