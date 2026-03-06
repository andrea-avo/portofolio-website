window.tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Clear Sans"', "sans-serif"],
      },
      animation: {
        "msg-appear": "msgAppear 0.7s ease-out backwards",
      },
      keyframes: {
        msgAppear: {
          "0%": { opacity: "0", transform: "translateX(-10px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
    },
  },
};

document.addEventListener("DOMContentLoaded", () => {
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
