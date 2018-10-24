// Grab DOM elements
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = progress.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

// Create functions
function togglePlay() {
  video.paused ? video.play() : video.pause();
}

function updateButton() {
  video.paused ? toggle.innerText = "►" : toggle.innerText = "❚ ❚";
}

function skip() {
  video.currentTime += parseInt(this.dataset.skip);
}

function updateRange() {
  video[this.name] = this.value;
}

function updateProgress() {
  const percent = video.currentTime / video.duration * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const time = video.duration * (e.offsetX / progress.offsetWidth);
  video.currentTime = time;
}

// Attach functions via event listeners
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", updateProgress);

toggle.addEventListener("click", togglePlay);

skipButtons.forEach(button => button.addEventListener("click", skip));

ranges.forEach(range => range.addEventListener("mousemove", updateRange));

let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", e => mousedown && scrub(e));
progress.addEventListener("mousedown", () => mousedown = true);
progress.addEventListener("mouseup", () => mousedown = false);