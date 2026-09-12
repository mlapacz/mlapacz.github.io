// mlapacz.github.io — the only script on the page.
// 1. theme toggle (persists in localStorage, follows the OS otherwise)
// 2. reveals the "stack over time" bars when they scroll into view
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
})();
