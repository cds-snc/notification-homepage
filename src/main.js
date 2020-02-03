import "./style.css";

function classToggle() {
  const nav = document.querySelector(".mobile-nav");
  const arrow = document.querySelector(".mobile-arrow");
  nav.classList.toggle("hidden");
  arrow.classList.toggle("flip");
}
document.querySelector("#menu").addEventListener("click", classToggle);
