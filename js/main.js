(function() {
  document.querySelector(".main-menu-button").addEventListener("click", e => {
    document.querySelector(".main-menu").classList.add("show-first");
  });

  document.querySelector(".close-menu").addEventListener("click", e => {
    document.querySelector(".main-menu").classList.remove("show-first");
  });

  let btn = document.querySelector(".translate-button");
  btn.addEventListener("click", e => {
    if (btn.classList.contains("eng")) {
      document.querySelectorAll(".english").forEach(el => {
        el.classList.add("hidden");
      });
      document.querySelectorAll(".spanish").forEach(el => {
        el.classList.remove("hidden");
      });
      btn.classList.remove("eng");
      btn.classList.remove("button-secondary");
      btn.classList.add("button-tertiary");
      // Persist user's language selection
      sessionStorage.setItem("language", "spanish");
    } else {
      document.querySelectorAll(".english").forEach(el => {
        el.classList.remove("hidden");
      });
      document.querySelectorAll(".spanish").forEach(el => {
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

  window.onscroll = e => {
    let scroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (scroll > 0) {
      document.querySelectorAll(".hero-right-text .button").forEach(el => {
        el.classList.add("hide");
      });
    } else {
      document.querySelectorAll(".hero-right-text .button").forEach(el => {
        el.classList.remove("hide");
      });
    }
    animateValues();
  };

  document.querySelectorAll(".grid.team .team-member").forEach(el => {
    el.addEventListener("click", function() {
      this.querySelector(".team-member-contact").classList.toggle("visible");
      //   this.classList.add("visible");
    });
  });
})();

// Helper Functions

const scrollTo = function(to, duration) {
  const element = document.scrollingElement || document.documentElement,
    start = element.scrollTop,
    change = to - start,
    startDate = +new Date(),
    // t = current time
    // b = start value
    // c = change in value
    // d = duration
    easeInOutQuad = function(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    },
    animateScroll = function() {
      const currentDate = +new Date();
      const currentTime = currentDate - startDate;
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

const countUp = function(to, el, duration) {
  console.log(to);
  const startDate = +new Date(),
    start = 0,
    change = to,
    // t = current time
    // b = start value
    // c = change in value
    // d = duration
    easeInOutQuad = function(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    },
    animateCount = function() {
      const currentDate = +new Date();
      const currentTime = currentDate - startDate;
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
    .forEach(item => {
      const num = item.innerHTML;
      if (isInViewport(item) && !item.classList.contains("scrolled")) {
        countUp(num, item, 5000);
        item.classList.add("scrolled");
      }
    });
}

const isInViewport = function(el) {
  let bounding = el.getBoundingClientRect();
  return (
    bounding.top >= 0 &&
    bounding.bottom <=
      (window.innerHeight || document.documentElement.clientHeight)
  );
};
