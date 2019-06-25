"use strict";

// Helper Functions

var scrollTo = function scrollTo(to, duration) {
  var element = document.scrollingElement || document.documentElement,
    start = element.scrollTop,
    change = to - start,
    startDate = +new Date(),
    // t = current time
    // b = start value
    // c = change in value
    // d = duration
    easeInOutQuad = function easeInOutQuad(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    },
    animateScroll = function animateScroll() {
      var currentDate = +new Date();
      var currentTime = currentDate - startDate;
      element.scrollTop = parseInt(
        easeInOutQuad(currentTime, start, change, duration)
      );

      if (currentTime < duration) {
        requestAnimationFrame(animateScroll);
      } else {
        element.scrollTop = to;
      }
    };

  animateScroll();
};

var countUp = function countUp(to, el, duration) {
  var startDate = +new Date(),
    start = 0,
    change = to,
    // t = current time
    // b = start value
    // c = change in value
    // d = duration
    easeInOutQuad = function easeInOutQuad(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    },
    animateCount = function animateCount() {
      var currentDate = +new Date();
      var currentTime = currentDate - startDate;
      el.innerHTML = parseInt(
        easeInOutQuad(currentTime, start, change, duration)
      );

      if (currentTime <= duration) {
        requestAnimationFrame(animateCount);
      } else {
        el.innerHTML = to;
      }
    };

  animateCount();
};

function animateValues() {
  Array.from(document.querySelectorAll(".home-infographics .stat > span"))
    .concat(
      Array.from(document.querySelectorAll(".infographic .statistic > span"))
    )
    .forEach(function(item) {
      var num = item.innerHTML;

      if (isInViewport(item) && !item.classList.contains("scrolled")) {
        countUp(num, item, 5000);
        item.classList.add("scrolled");
      }
    });
}

const isInViewport = function isInViewport(el) {
  var bounding = el.getBoundingClientRect();
  return (
    bounding.top >= 0 &&
    bounding.bottom <=
      (window.innerHeight || document.documentElement.clientHeight)
  );
};

(function() {
  const imgs = document.querySelectorAll(".lazy");
  const observer = lozad(imgs);
  observer.observe();

  animateValues();

  document.querySelectorAll(".nav--top-level > li > a").forEach(function(el) {
    el.addEventListener("click", function(e) {
      var page_id = e.target.id;

      if (page_id != "home") {
        e.preventDefault();
        var section = document.getElementById("sub_" + page_id);

        if (section) {
          Array.from(section.parentNode.children).forEach(function(node) {
            if (node != section) {
              node.classList.remove("open");
            }
          });
          section.classList.toggle("open");
        }
      }
    });
  });
  document.querySelectorAll(".back-button").forEach(function(el) {
    el.addEventListener("click", function(e) {
      e.target.parentNode.classList.remove("open");
    });
  });
  document
    .querySelector(".main-menu-button")
    .addEventListener("click", function(e) {
      document.querySelector(".main-menu").classList.add("show-first");
    });
  document.querySelector(".close-menu").addEventListener("click", function(e) {
    document.querySelector(".main-menu").classList.remove("show-first");
  });
  var doc = document.documentElement || document.body;
  doc.addEventListener("click", function(e) {
    if (
      !document.querySelector(".main-menu").contains(e.target) &&
      !document.querySelector(".first-level").contains(e.target) &&
      !document.querySelector(".second-level").contains(e.target)
    ) {
      document.querySelector(".main-menu").classList.remove("show-first");
    }
  });
  var btn = document.querySelector(".translate-button");
  btn.addEventListener("click", function(e) {
    if (btn.classList.contains("eng")) {
      document.querySelectorAll(".english").forEach(function(el) {
        el.classList.add("hidden");
      });
      document.querySelectorAll(".spanish").forEach(function(el) {
        el.classList.remove("hidden");
      });
      btn.classList.remove("eng");
      btn.classList.remove("button-secondary");
      btn.classList.add("button-tertiary");
      // Persist user's language selection
      sessionStorage.setItem("language", "spanish");
    } else {
      document.querySelectorAll(".english").forEach(function(el) {
        el.classList.remove("hidden");
      });
      document.querySelectorAll(".spanish").forEach(function(el) {
        el.classList.add("hidden");
      });
      btn.classList.add("eng");
      btn.classList.add("button-secondary");
      btn.classList.remove("button-tertiary");
      // Persist user's language selection
      sessionStorage.setItem("language", "english");
    }
  });

  // Persist user's language selection
  if (sessionStorage.getItem("language") == "spanish") {
    btn.click();
  }

  window.onscroll = function(e) {
    var scroll = document.documentElement.scrollTop || document.body.scrollTop;

    if (scroll > 0) {
      document
        .querySelectorAll(".hero-right-text .button")
        .forEach(function(el) {
          el.classList.add("hide");
        });
    } else {
      document
        .querySelectorAll(".hero-right-text .button")
        .forEach(function(el) {
          el.classList.remove("hide");
        });
    }

    animateValues();
  };

  document.querySelectorAll(".grid.team .team-member").forEach(function(el) {
    el.addEventListener("click", function() {
      this.querySelector(".team-member-contact").classList.toggle("visible");
    });
  });
})();
