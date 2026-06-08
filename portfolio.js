const themeToggle = document.getElementById("theme-toggle");

const getPreferredTheme = () => {
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme) return storedTheme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const applyTheme = (theme) => {
  document.body.classList.toggle("light", theme === "light");
  const label = theme === "light" ? "Dark" : "Light";
  themeToggle.textContent = label;
  themeToggle.setAttribute(
    "aria-label",
    theme === "light"
      ? "Alternar para tema escuro"
      : "Alternar para tema claro",
  );
  localStorage.setItem("theme", theme);
};

const toggleTheme = () => {
  const newTheme = document.body.classList.contains("light") ? "dark" : "light";
  applyTheme(newTheme);
};

const initFadeIn = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 },
  );

  document.querySelectorAll(".fade-in").forEach((el) => {
    observer.observe(el);
    setTimeout(() => el.classList.add("visible"), 100);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  if (themeToggle) {
    applyTheme(getPreferredTheme());
    themeToggle.addEventListener("click", toggleTheme);
  }

  initFadeIn();
});
