
const screens = document.querySelectorAll(".screen");
const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
const musicLabel = document.getElementById("musicLabel");

let musicStarted = false;

function showScreen(id) {
  screens.forEach(screen => screen.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function startMusic() {
  if (musicStarted) return;

  bgMusic.volume = 0.55;
  bgMusic.play()
    .then(() => {
      musicStarted = true;
      musicBtn.textContent = "♫";
      musicLabel.textContent = "Music on";
      musicBtn.setAttribute("aria-label", "Pause music");
    })
    .catch(() => {
      musicLabel.textContent = "Tap ♫ for music";
    });
}

document.getElementById("startBtn").addEventListener("click", () => {
  startMusic();
  showScreen("reveal");

  const content = document.querySelector(".stage-content");
  content.classList.add("visible");
});

document.getElementById("revealBtn").addEventListener("click", () => {
  const curtains = document.getElementById("curtains");
  curtains.classList.add("open");

  launchConfetti();

  window.setTimeout(() => {
    showScreen("birthday");
    launchConfetti();
  }, 1700);
});

document.getElementById("memoriesBtn").addEventListener("click", () => {
  showScreen("gallery");
});

document.getElementById("finalBtn").addEventListener("click", () => {
  showScreen("final");
  launchConfetti();
});

document.getElementById("replayBtn").addEventListener("click", () => {
  document.getElementById("curtains").classList.remove("open");
  document.querySelector(".stage-content").classList.remove("visible");
  showScreen("intro");
});

// Play/pause music control
musicBtn.addEventListener("click", async () => {
  if (bgMusic.paused) {
    try {
      await bgMusic.play();
      musicStarted = true;
      musicBtn.textContent = "♫";
      musicLabel.textContent = "Music on";
      musicBtn.setAttribute("aria-label", "Pause music");
    } catch {
      musicLabel.textContent = "Music unavailable";
    }
  } else {
    bgMusic.pause();
    musicBtn.textContent = "▶";
    musicLabel.textContent = "Music off";
    musicBtn.setAttribute("aria-label", "Play music");
  }
});

// Floating stars in the background
const starsContainer = document.getElementById("stars");

for (let i = 0; i < 65; i++) {
  const star = document.createElement("span");
  star.className = "star";
  star.style.left = Math.random() * 100 + "%";
  star.style.top = Math.random() * 100 + "%";
  star.style.animationDelay = Math.random() * 3 + "s";
  star.style.animationDuration = (1.5 + Math.random() * 3) + "s";
  starsContainer.appendChild(star);
}

// Celebration confetti
function launchConfetti() {
  const container = document.getElementById("confetti");
  const colors = ["#ff5b9b", "#ffb2d1", "#ffffff", "#e6b8ff", "#ffd166"];

  for (let i = 0; i < 65; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.left = Math.random() * 100 + "%";
    piece.style.background = colors[
      Math.floor(Math.random() * colors.length)
    ];
    piece.style.animationDelay = Math.random() * 1.8 + "s";
    piece.style.animationDuration = (2.5 + Math.random() * 2) + "s";
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;

    container.appendChild(piece);
    window.setTimeout(() => piece.remove(), 6000);
  }
}

// Warn if a photo path is incorrect
document.querySelectorAll(".photo-card img").forEach(img => {
  img.addEventListener("error", () => {
    img.alt = "Photo not found — check the filename in assets";
    img.style.minHeight = "120px";
  });
});
