// Set your preferred business contact email before publishing.
const CONTACT_EMAIL = "YOUR_EMAIL@example.com";
const emailLink = document.getElementById("email-link");
if (CONTACT_EMAIL !== "YOUR_EMAIL@example.com") {
  emailLink.href = `mailto:${CONTACT_EMAIL}`;
  emailLink.textContent = CONTACT_EMAIL + " ↗";
}
document.getElementById("year").textContent = new Date().getFullYear();
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
toggle.addEventListener("click", () => {
  const opened = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(opened));
  toggle.setAttribute("aria-label", opened ? "Close menu" : "Open menu");
  toggle.textContent = opened ? "×" : "☰";
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  toggle.setAttribute("aria-expanded", "false");
  toggle.textContent = "☰";
}));
