const themeToggle = document.getElementById("theme-toggle");
const themeLabel = themeToggle?.querySelector(".theme-label");

function preferredTheme() {
  const saved = localStorage.getItem("portfolio-theme");
  if (saved) return saved;
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

function setTheme(theme) {
  document.body.classList.toggle("light", theme === "light");
  if (themeLabel) themeLabel.textContent = theme === "light" ? "dark" : "light";
  themeToggle?.setAttribute(
    "aria-label",
    theme === "light" ? "Alternar para tema escuro" : "Alternar para tema claro"
  );
  localStorage.setItem("portfolio-theme", theme);
}

setTheme(preferredTheme());

themeToggle?.addEventListener("click", () => {
  setTheme(document.body.classList.contains("light") ? "dark" : "light");
});

const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      obs.unobserve(entry.target);
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index * 25, 160)}ms`;
  observer.observe(element);
});
