window.tailwind.config = {
  theme: {
    extend: {
      colors: {
        "scroll-bg": "rgba(255, 255, 255, 0.1)",
      },
      fontFamily: {
        sans: ['"Clear Sans"', "sans-serif"],
      },
    },
  },
};

document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          const time = entry.target.getAttribute("data-time");
          const images = document.querySelectorAll(".bg-container img");

          images.forEach((img) => {
            if (img.id === `img-${time}`) {
              img.classList.add("active");
              img.style.zIndex = "1";
            } else {
              img.classList.remove("active");
              setTimeout(() => {
                if (!img.classList.contains("active")) {
                  img.style.zIndex = "-1";
                }
              }, 1200);
            }
          });

          const sections = ["morning", "afternoon", "evening", "night"];
          const idx = sections.indexOf(time) + 1;
          const progress = document.getElementById("progress");
          if (progress) {
            progress.style.height = (idx / sections.length) * 100 + "%";
          }
        }
      });
    },
    { threshold: 0.6 },
  );

  document.querySelectorAll("section").forEach((s) => observer.observe(s));
});
