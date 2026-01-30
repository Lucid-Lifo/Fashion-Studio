(function () {
  const containerSelector = ".gallery-grid";

  function init() {
    const container = document.querySelector(containerSelector);
    if (!container) {
      console.log("Gallery container not found");
      return;
    }

    const speed = 1;
    let isPaused = false;

    container.addEventListener("mouseenter", () => {
      isPaused = true;
    });
    container.addEventListener("mouseleave", () => {
      isPaused = false;
    });

    // Pause on touch
    container.addEventListener("touchstart", () => {
      isPaused = true;
    }, { passive: true });
    container.addEventListener("touchend", () => {
      isPaused = false;
    });

    const imgs = Array.from(container.querySelectorAll("img"));
    const loadPromises = imgs.map((img) => {
      if (img.complete) return Promise.resolve();
      return new Promise((resolve) => {
        img.addEventListener("load", resolve, { once: true });
      });
    });

    Promise.all(loadPromises).then(() => {
      const originalWidth = container.scrollWidth;

      // Duplicate children for seamless loop
      const children = Array.from(container.children);
      children.forEach((child) => {
        container.appendChild(child.cloneNode(true));
      });

      console.log("Auto-scroll initialized");

      let lastTime = null;
      function step(time) {
        if (lastTime !== null) {
          const delta = time - lastTime;
          if (!isPaused) {
            container.scrollLeft += (speed * delta) / 16.6667;
            if (container.scrollLeft >= originalWidth) {
              container.scrollLeft -= originalWidth;
            }
          }
        }
        lastTime = time;
        requestAnimationFrame(step);
      }

      requestAnimationFrame(step);
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
