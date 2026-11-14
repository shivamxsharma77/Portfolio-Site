/* =========================================================
   SHIVAM SHARMA — PORTFOLIO SCRIPT
   Vanilla JS, no dependencies.
   Skills and projects render from the DATA section below.
   ========================================================= */

(() => {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;

  /* ---------------------------------------------------------
     1. DATA
     --------------------------------------------------------- */

  const SKILLS = {
    frontend: [
      { name: "HTML5", icon: iconCode() },
      { name: "CSS3", icon: iconCode() },
      { name: "JavaScript", icon: iconCode() },
      { name: "Responsive Design", icon: iconLayout() },
    ],
    programming: [
      { name: "C", icon: iconCode() },
      { name: "C++", icon: iconCode() },
      { name: "Java", icon: iconCode() },
      { name: "Python", icon: iconCode() },
    ],
    tools: [
      { name: "Git", icon: iconBranch() },
      { name: "GitHub", icon: iconBranch() },
      { name: "VS Code", icon: iconLayout() },
      { name: "MySQL", icon: iconDb() },
    ],
  };

  /* =========================================================
     >>>>>>>>>>>>>>>>>>>>>>>>  PROJECTS  <<<<<<<<<<<<<<<<<<<<<<<<
     The project with  featured: true  is the big card.
     Edit any field below to change what appears on the site.
     ========================================================= */
  const PROJECTS = [
    {
      featured: true,

      name: "Development of an influencer marketing and brand campaign management web application",

      description:
        "A web application for managing influencer marketing and brand campaigns, bringing brands and influencers together on one platform through a clean, responsive interface.",

      // Short highlights shown as small pills — edit / add / remove freely
      features: ["Campaign management", "Brand & influencer workflows", "Responsive interface"],

      // Technologies used — change these to match what you actually used
      tech: ["HTML", "CSS", "JavaScript"],

      // ---------------------------------------------------------
      // >>>>>>>>>>>  ADD YOUR PROJECT SCREENSHOT HERE  <<<<<<<<<<<
      // 1. Save the screenshot inside the assets folder,
      //    e.g.  assets/pulse-culture.png
      // 2. Put its path between the quotes below.
      //    Leave it empty ("") to show the placeholder box.
      // ---------------------------------------------------------
      image:"assets/pulse-culture.png",
      imageAlt: "whatever",
      // ------------------------ END SCREENSHOT -----------------

      // Add a deployed link when you have one. Empty = button hidden.
      live: "",
      github: "https://github.com/shivamxsharma77/Pulse-Culture-website",
    },

    /* ---------------------------------------------------------
       TEMPLATE FOR MORE PROJECTS — copy, remove the comment
       markers, and fill in. It will appear in the grid below
       the featured project.

    {
      name: "Project name",
      description: "One or two lines about what it does.",
      tech: ["HTML", "CSS", "JavaScript"],
      image: "assets/project-2.png",
      imageAlt: "Screenshot of Project name",
      live: "",
      github: "https://github.com/shivamxsharma77/repo-name",
    },
    --------------------------------------------------------- */
  ];

  function iconCode() {
    return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M9 18l-6-6 6-6M15 6l6 6-6 6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  }
  function iconLayout() {
    return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="1.7"/><path d="M3 9h18" stroke="currentColor" stroke-width="1.7"/></svg>`;
  }
  function iconBranch() {
    return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="6" cy="6" r="2.2" stroke="currentColor" stroke-width="1.6"/><circle cx="6" cy="18" r="2.2" stroke="currentColor" stroke-width="1.6"/><circle cx="18" cy="9" r="2.2" stroke="currentColor" stroke-width="1.6"/><path d="M6 8.2V15.8M6 8.2C6 12 14 8.5 18 11" stroke="currentColor" stroke-width="1.6"/></svg>`;
  }
  function iconDb() {
    return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="6" rx="8" ry="3" stroke="currentColor" stroke-width="1.6"/><path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" stroke="currentColor" stroke-width="1.6"/></svg>`;
  }

  /* ---------------------------------------------------------
     2. LOADER
     --------------------------------------------------------- */
  window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    setTimeout(() => loader && loader.classList.add("is-hidden"), prefersReducedMotion ? 0 : 400);
  });

  /* ---------------------------------------------------------
     3. NAVBAR
     --------------------------------------------------------- */
  const nav = document.getElementById("nav");
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");

  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 12);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
  navLinks.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    })
  );

  /* ---------------------------------------------------------
     4. SKILLS
     --------------------------------------------------------- */
  const skillsGrid = document.getElementById("skills-grid");
  const skillTabs = document.querySelectorAll(".skills__tab");

  function renderSkills(category) {
    skillsGrid.innerHTML = (SKILLS[category] || [])
      .map(
        (s) => `
      <div class="skill-card">
        <span class="skill-card__icon">${s.icon}</span>
        <span class="skill-card__name">${s.name}</span>
      </div>`
      )
      .join("");
    bindCursorTargets(skillsGrid);
  }

  skillTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      skillTabs.forEach((t) => {
        t.classList.remove("is-active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");
      renderSkills(tab.dataset.category);
    });
  });

  /* ---------------------------------------------------------
     5. PROJECTS
     --------------------------------------------------------- */
  const featuredEl = document.getElementById("featured-project");
  const gridEl = document.getElementById("projects-grid");

  const pills = (arr = []) => arr.map((t) => `<span class="tech-pill">${t}</span>`).join("");

  const featured = PROJECTS.find((p) => p.featured);
  const rest = PROJECTS.filter((p) => !p.featured);

  if (featured) {
    featuredEl.innerHTML = `
      <div class="featured__media">
        ${
          featured.image
            ? `<img src="${featured.image}" alt="${featured.imageAlt || featured.name}" loading="lazy" />`
            : `<span class="featured__media-label">Project preview</span>`
        }
      </div>
      <div class="featured__body">
        <span class="featured__tag">Featured project</span>
        <h3 class="featured__title">${featured.name}</h3>
        <p class="featured__desc">${featured.description}</p>
        ${
          featured.features && featured.features.length
            ? `<div class="featured__features">${featured.features
                .map((f) => `<span class="featured__feature">${f}</span>`)
                .join("")}</div>`
            : ""
        }
        <div class="featured__tech">${pills(featured.tech)}</div>
        <div class="featured__actions">
          ${featured.live ? `<a href="${featured.live}" class="btn btn--primary magnetic" target="_blank" rel="noopener">Live Demo</a>` : ""}
          ${featured.github ? `<a href="${featured.github}" class="btn ${featured.live ? "btn--ghost" : "btn--primary"} magnetic" target="_blank" rel="noopener">GitHub</a>` : ""}
        </div>
      </div>
    `;
  } else {
    featuredEl.remove();
  }

  gridEl.innerHTML = rest
    .map(
      (p) => `
    <article class="project-card reveal">
      <div class="project-card__media">
        ${
          p.image
            ? `<img src="${p.image}" alt="${p.imageAlt || p.name}" loading="lazy" />`
            : `<span class="project-card__media-label">Project preview</span>`
        }
      </div>
      <div class="project-card__body">
        <h3 class="project-card__title">${p.name}</h3>
        <p class="project-card__desc">${p.description}</p>
        <div class="project-card__tech">${pills(p.tech)}</div>
        <div class="project-card__actions">
          ${p.live ? `<a href="${p.live}" class="link-btn" target="_blank" rel="noopener">Live Demo</a>` : ""}
          ${p.github ? `<a href="${p.github}" class="link-btn" target="_blank" rel="noopener">GitHub</a>` : ""}
        </div>
      </div>
    </article>`
    )
    .join("");

  /* ---------------------------------------------------------
     6. SCROLL REVEAL (runs after content is rendered)
     --------------------------------------------------------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -50px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------------------------------------------------------
     7. CUSTOM CURSOR (desktop only)
     --------------------------------------------------------- */
  let bindCursorTargets = () => {};

  if (isTouch) {
    document.body.classList.add("has-no-hover");
  } else {
    const cursor = document.getElementById("cursor");
    const dot = cursor.querySelector(".cursor__dot");
    const ring = cursor.querySelector(".cursor__ring");
    let ringX = 0, ringY = 0, targetX = 0, targetY = 0;

    window.addEventListener("mousemove", (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      dot.style.transform = `translate(${targetX}px, ${targetY}px) translate(-50%, -50%)`;
    });

    (function animateRing() {
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      requestAnimationFrame(animateRing);
    })();

    bindCursorTargets = (root = document) => {
      root.querySelectorAll("a, button, .skill-card, .project-card").forEach((el) => {
        el.addEventListener("mouseenter", () => cursor.classList.add("is-active"));
        el.addEventListener("mouseleave", () => cursor.classList.remove("is-active"));
      });
    };
  }

  renderSkills("frontend");
  bindCursorTargets(document);

  /* ---------------------------------------------------------
     8. MAGNETIC BUTTONS
     --------------------------------------------------------- */
  if (!isTouch && !prefersReducedMotion) {
    document.querySelectorAll(".magnetic").forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.18}px, ${y * 0.3}px)`;
      });
      btn.addEventListener("mouseleave", () => (btn.style.transform = "translate(0, 0)"));
    });
  }

  /* ---------------------------------------------------------
     9. HERO PARALLAX
     --------------------------------------------------------- */
  const heroVisual = document.getElementById("hero-visual");
  if (heroVisual && !isTouch && !prefersReducedMotion) {
    window.addEventListener("mousemove", (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 14;
      const y = (e.clientY / window.innerHeight - 0.5) * 14;
      heroVisual.style.transform = `translate(${x}px, ${y}px)`;
    });
  }
})();
