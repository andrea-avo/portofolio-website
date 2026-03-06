/* 1. Star */
function generateStars(className, count, variableName) {
  let shadow = "";
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 100);
    const y = Math.floor(Math.random() * 100);
    shadow += `${x}vw ${y}vh #fff, `;
  }
  shadow = shadow.slice(0, -2);
  const element = document.querySelector(className);
  if (element) {
    element.style.setProperty(variableName, shadow);
  }
}

/* 2. Cloud */
function generateClouds(count) {
  const container = document.getElementById("cloudsContainer");
  if (!container) return;
  container.innerHTML = "";
  const variants = ["cloud-v1", "cloud-v2", "cloud-v3"];

  for (let i = 0; i < count; i++) {
    const cloud = document.createElement("div");
    cloud.classList.add(
      "cloud",
      variants[Math.floor(Math.random() * variants.length)],
    );
    const isReversed = Math.random() > 0.5;
    if (isReversed) cloud.style.animationName = "floatCloudReverse";

    cloud.style.top = `${Math.floor(Math.random() * 60) + 5}%`;
    cloud.style.transform = `scale(${Math.random() * 0.6 + 0.6})`;
    cloud.style.opacity = Math.random() * 0.3 + 0.5;
    cloud.style.animationDuration = `${Math.floor(Math.random() * 60) + 60}s`;
    cloud.style.animationDelay = `${Math.floor(Math.random() * -100)}s`;
    container.appendChild(cloud);
  }
}

/* 3. Shooting Star */
function recycleStar(star) {
  const randomTop = Math.floor(Math.random() * 40) - 20;
  const randomLeft = Math.floor(Math.random() * 100);
  const randomDuration = Math.random() * 3 + 4;
  const randomDelay = Math.random() * 20 + 10;
  star.style.top = `${randomTop}%`;
  star.style.left = `${randomLeft}%`;
  star.style.animationDuration = `${randomDuration}s`;
  star.style.animationDelay = `${randomDelay}s`;
}

function generateShootingStars(count) {
  const container = document.getElementById("shootingStarsContainer");
  if (!container) return;
  container.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const star = document.createElement("div");
    star.classList.add("shooting-star");
    recycleStar(star);
    star.style.animationDelay = `${Math.random() * 2}s`;
    star.addEventListener("animationiteration", () => recycleStar(star));
    container.appendChild(star);
  }
}

/* 4. Bird */
function generateBirds(count) {
  const container = document.getElementById("birdsContainer");
  if (!container) return;
  container.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const bird = document.createElement("div");
    bird.classList.add("bird");
    const wingL = document.createElement("div");
    wingL.classList.add("bird-wing-left");
    const wingR = document.createElement("div");
    wingR.classList.add("bird-wing-right");
    bird.appendChild(wingL);
    bird.appendChild(wingR);

    const randomTop = Math.floor(Math.random() * 50) + 10;
    const randomDuration = Math.floor(Math.random() * 20) + 30;
    const randomDelay = Math.random() * -50;
    const randomScale = Math.random() * 0.5 + 0.5;

    bird.style.top = `${randomTop}%`;
    bird.style.transform = `scale(${randomScale})`;
    bird.style.animationDuration = `${randomDuration}s`;
    bird.style.animationDelay = `${randomDelay}s`;
    container.appendChild(bird);
  }
}

/* 5. Sun & Moon */
function randomizeSun() {
  const sun = document.querySelector(".sun-mover");
  if (sun) {
    const minimumSkip = 5;
    const randomPart = Math.floor(Math.random() * 150);
    const finalDelay = -(minimumSkip + randomPart);
    sun.style.animationDelay = `${finalDelay}s`;
  }
}

function randomizeMoon() {
  const moon = document.querySelector(".moon-mover");
  if (moon) {
    const minimumSkip = 5;
    const randomPart = Math.floor(Math.random() * 220);
    const finalDelay = -(minimumSkip + randomPart);
    moon.style.animationDelay = `${finalDelay}s`;
  }
}

generateStars(".star-s", 150, "--star-s-shadow");
generateStars(".star-m", 25, "--star-m-shadow");
generateShootingStars(1);
generateClouds(6);
generateBirds(5);
randomizeSun();
randomizeMoon();

/* 6. Music System */
const musicBtn = document.getElementById("btnMusic");
const musicIcon = document.getElementById("musicIcon");
const musicLabel = document.getElementById("musicLabel");

const tracks = {
  morning: document.getElementById("bgm-morning"),
  afternoon: document.getElementById("bgm-afternoon"),
  evening: document.getElementById("bgm-evening"),
  night: document.getElementById("bgm-night"),
};

let isMusicPlaying = false;
let currentTheme = "";

function stopAllMusic() {
  Object.values(tracks).forEach((track) => {
    if (track) {
      track.pause();
      track.currentTime = 0;
    }
  });
}

function playThemeMusic(theme) {
  if (!isMusicPlaying) return;
  stopAllMusic();
  if (tracks[theme]) {
    tracks[theme].volume = 0.4;
    tracks[theme].play().catch((e) => console.log("Autoplay blocked:", e));
  }
}

if (musicBtn) {
  musicBtn.addEventListener("click", () => {
    isMusicPlaying = !isMusicPlaying;

    if (isMusicPlaying) {
      musicIcon.classList.remove("fa-music");
      musicIcon.classList.add("fa-pause");
      musicIcon.style.color = "#e74c3c";
      musicLabel.textContent = "Pause Music";
      playThemeMusic(currentTheme);
    } else {
      stopAllMusic();
      musicIcon.classList.remove("fa-pause");
      musicIcon.classList.add("fa-music");
      musicIcon.style.color = "";
      musicLabel.textContent = "Play Music";
    }
  });
}

/* 7. Time System & Theme Logic */
document.getElementById("year").textContent = new Date().getFullYear();

function updateSystem() {
  const now = new Date();
  const timeOptions = {
    timeZone: "Asia/Jakarta",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  };

  const dateOptions = {
    timeZone: "Asia/Jakarta",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  document.getElementById("clock").textContent = now.toLocaleTimeString(
    "en-US",
    timeOptions,
  );

  document.getElementById("date").textContent = now.toLocaleDateString(
    "en-GB",
    dateOptions,
  );

  const hour = parseInt(
    now.toLocaleTimeString("en-US", { ...timeOptions, minute: undefined }),
  );

  const body = document.body;
  body.className = "";

  let timeOfDay = "night";
  if (hour >= 5 && hour < 11) timeOfDay = "morning";
  else if (hour >= 11 && hour < 15) timeOfDay = "afternoon";
  else if (hour >= 15 && hour < 18) timeOfDay = "evening";

  if (currentTheme !== timeOfDay) {
    currentTheme = timeOfDay;
    if (isMusicPlaying) {
      playThemeMusic(currentTheme);
    }
  }

  body.classList.add(timeOfDay);

  /* 8. Moon Phase */
  if (timeOfDay === "night") {
    if (typeof SunCalc !== "undefined") {
      const moonData = SunCalc.getMoonIllumination(now);
      const phase = moonData.phase;
      const moonElement = document.getElementById("moonElement");
      const moonShadow = document.getElementById("moonShadow");

      moonElement.classList.remove("moon-new");
      const shadowColor = "rgba(10, 15, 30, 0.95)";

      if (phase < 0.03 || phase > 0.97) {
        moonElement.classList.add("moon-new");
        moonShadow.style.boxShadow = `inset 0 0 0 50px ${shadowColor}`;
      } else if (phase >= 0.48 && phase <= 0.52) {
        moonShadow.style.boxShadow = "inset 0 0 0 0 transparent";
      } else if (phase < 0.25) {
        moonShadow.style.boxShadow = `inset 25px 0 15px -5px ${shadowColor}`;
      } else if (phase < 0.48) {
        moonShadow.style.boxShadow = `inset 10px 0 10px -5px ${shadowColor}`;
      } else if (phase < 0.75) {
        moonShadow.style.boxShadow = `inset -10px 0 10px -5px ${shadowColor}`;
      } else {
        moonShadow.style.boxShadow = `inset -25px 0 15px -5px ${shadowColor}`;
      }
    }
  }
}

setInterval(updateSystem, 100);
updateSystem();

/* 9. Loading Screen */
function startLoading() {
  const loadingScreen = document.getElementById("loadingScreen");
  const percentText = document.getElementById("loadingPercent");
  const progressFill = document.getElementById("progressFill");

  let progress = 0;

  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 5) + 1;

    if (progress > 100) progress = 100;

    percentText.textContent = `${progress}%`;
    progressFill.style.width = `${progress}%`;

    if (progress === 100) {
      clearInterval(interval);
      setTimeout(() => {
        loadingScreen.classList.add("finished");
      }, 500);
    }
  }, 50);
}

startLoading();
