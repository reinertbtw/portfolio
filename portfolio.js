(() => {
  const themeButton = document.querySelector(".theme-toggle");
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#navigation");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const applyTheme = (dark) => {
    document.body.classList.toggle("dark", dark);
    themeButton.setAttribute(
      "aria-label",
      dark ? "Ativar tema claro" : "Ativar tema escuro",
    );
    themeButton.setAttribute("aria-pressed", String(dark));
    document.querySelector('meta[name="theme-color"]').content = dark
      ? "#1c242c"
      : "#f1f2ef";
  };
  try {
    applyTheme(localStorage.getItem("portfolio-theme") === "dark");
  } catch {
    applyTheme(false);
  }
  themeButton.addEventListener("click", () => {
    const dark = !document.body.classList.contains("dark");
    applyTheme(dark);
    try {
      localStorage.setItem("portfolio-theme", dark ? "dark" : "light");
    } catch {
      /* Theme still works without storage. */
    }
  });
  function setMenu(open) {
    nav.classList.toggle("open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.querySelector("span").textContent = open ? "−" : "+";
  }
  menuButton.addEventListener("click", () =>
    setMenu(menuButton.getAttribute("aria-expanded") !== "true"),
  );
  nav
    .querySelectorAll("a")
    .forEach((link) => link.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("open")) {
      setMenu(false);
      menuButton.focus();
    }
  });
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".site-header")) setMenu(false);
  });
  window
    .matchMedia("(min-width: 681px)")
    .addEventListener("change", (event) => {
      if (event.matches) setMenu(false);
    });
  if ("IntersectionObserver" in window && !reducedMotion.matches) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06 },
    );
    document.documentElement.classList.add("motion-ready");
    document
      .querySelectorAll(".reveal")
      .forEach((element) => observer.observe(element));
  }
})();
