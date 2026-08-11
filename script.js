(function () {
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("primary-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealEls = document.querySelectorAll(".reveal");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry, i) {
          if (entry.isIntersecting) {
            entry.target.style.transitionDelay = (i % 4) * 60 + "ms";
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    revealEls.forEach(function (el) { observer.observe(el); });
  }

  var quoteForm = document.getElementById("quoteForm");
  if (quoteForm) {
    quoteForm.addEventListener("submit", function (e) {
      e.preventDefault();

      var name = quoteForm.name.value.trim();
      var contact = quoteForm.contact.value.trim();
      var service = quoteForm.service.value;
      var details = quoteForm.details.value.trim();

      var lines = [
        "Hi Perfect L Projects, I'd like a quote.",
        "Name: " + name,
        "Contact: " + contact,
        "Service: " + service
      ];
      if (details) lines.push("Details: " + details);

      var message = encodeURIComponent(lines.join("\n"));
      window.open("https://wa.me/27720475392?text=" + message, "_blank", "noopener");
    });
  }
})();
