// Shared helpers + header/footer for every page.
(function () {
  const S = window.SITE;

  const ICONS = {
    police: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="M12 8l1.2 2.4 2.6.4-1.9 1.8.5 2.6L12 14l-2.4 1.2.5-2.6-1.9-1.8 2.6-.4z"/>',
    sheriff: '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>',
    ems: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"/>',
    dispatch: '<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>',
    doj: '<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10M12 3v18M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>',
    mechanic: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
    staff: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    arrow: '<path d="M5 12h14M12 5l7 7-7 7"/>',
    back: '<path d="M19 12H5M12 19l-7-7 7-7"/>',
    bolt: '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>',
    trophy: '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>',
    chat: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    play: '<path d="m6 3 14 9-14 9V3z"/>',
  };

  const DISCORD_SVG =
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.865-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.74 19.74 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.058a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .078-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>';

  const STATUS = {
    open: { label: "Recruiting", cls: "status-open" },
    limited: { label: "Limited spots", cls: "status-limited" },
    closed: { label: "Closed", cls: "status-closed" },
  };

  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const icon = (name) =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ICONS.users}</svg>`;

  const statusBadge = (d) => {
    const s = STATUS[d.status] || STATUS.closed;
    return `<span class="status ${s.cls}"><span class="status-dot"></span>${s.label}</span>`;
  };

  const deptUrl = (d) => `department.html?d=${encodeURIComponent(d.id)}`;

  const discordButton = (cls, label) =>
    `<a href="${esc(S.discordUrl)}" class="btn btn-discord ${cls || ""}" target="_blank" rel="noopener">${DISCORD_SVG}${label || "Join Discord"}</a>`;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Animates a number from 0 up to `to` inside `el`.
  const countUp = (el, to) => {
    if (reduceMotion) return void (el.textContent = to);
    const start = performance.now();
    const dur = 1200;
    const tick = (now) => {
      const t = Math.min((now - start) / dur, 1);
      el.textContent = Math.round(to * (1 - Math.pow(1 - t, 3)));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const applyButton = (d, cls) =>
    d.status === "closed"
      ? `<button class="btn btn-primary ${cls || ""}" disabled>Applications closed</button>`
      : `<a class="btn btn-primary ${cls || ""}" href="${esc(d.applyUrl || S.defaultApplyUrl)}" target="_blank" rel="noopener">Apply now</a>`;

  // --- Header / footer -------------------------------------------------------
  document.getElementById("siteHeader").innerHTML = `
    <div class="container nav-inner">
      <a href="index.html" class="logo"><img src="assets/logo.webp" alt="" width="40" height="40">${esc(S.name)}</a>
      <nav class="nav-links" id="navLinks">
        <a href="index.html#departments">Departments</a>
        <a href="index.html#requirements">Requirements</a>
        <a href="index.html#process">How to apply</a>
        <a href="index.html#faq">FAQ</a>
      </nav>
      <div class="nav-actions">
        ${discordButton()}
      </div>
      <button class="menu-toggle" id="menuToggle" aria-label="Open menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>`;

  const socials = [["Discord", S.discordUrl], ["Facebook", S.socials.facebook], ["Instagram", S.socials.instagram], ["Twitter", S.socials.twitter]]
    .filter(([, url]) => url)
    .map(([label, url]) => `<a href="${esc(url)}" target="_blank" rel="noopener">${label}</a>`)
    .join("");

  document.getElementById("siteFooter").innerHTML = `
    <div class="container footer-inner">
      <div>
        <a href="index.html" class="logo"><img src="assets/logo.webp" alt="" width="40" height="40">${esc(S.name)}</a>
        <p class="muted">${esc(S.name)} is a FiveM roleplay server. Not affiliated with Rockstar Games, Take-Two Interactive or Cfx.re.</p>
      </div>
      <div class="footer-cols">
        <div class="footer-links">
          <h4>Departments</h4>
          ${S.departments.map((d) => `<a href="${deptUrl(d)}">${esc(d.short)}</a>`).join("")}
        </div>
        <div class="footer-links">
          <h4>Community</h4>
          ${socials}
        </div>
      </div>
    </div>
    <div class="container footer-bottom muted">© ${new Date().getFullYear()} ${esc(S.name)}. All rights reserved.</div>`;

  // --- Mobile menu -----------------------------------------------------------
  const toggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  toggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });
  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      navLinks.classList.remove("open");
      toggle.setAttribute("aria-expanded", false);
    }
  });

  // --- Nav background on scroll -----------------------------------------------
  const header = document.getElementById("siteHeader");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 10);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // --- Effects that run once each page has rendered its content -------------
  // (page scripts load after this file, so wait until they've finished)
  document.addEventListener("DOMContentLoaded", () => {
    // Cursor spotlight + slight tilt on cards
    document.querySelectorAll(".dept-card, .highlight, .other-card").forEach((card) => {
      const tilt = card.classList.contains("dept-card") && !reduceMotion;
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        card.style.setProperty("--mx", `${x * 100}%`);
        card.style.setProperty("--my", `${y * 100}%`);
        if (tilt) {
          card.style.setProperty("--ry", `${(x - 0.5) * 8}deg`);
          card.style.setProperty("--rx", `${(0.5 - y) * 8}deg`);
        }
      });
      card.addEventListener("pointerleave", () => {
        card.style.setProperty("--rx", "0deg");
        card.style.setProperty("--ry", "0deg");
      });
    });

    // Fade/slide content in as it scrolls into view
    if (reduceMotion || !("IntersectionObserver" in window)) return;
    const targets = document.querySelectorAll(
      ".section-head, .dept-card, .highlight, .steps li, .faq details, .check-list li, .panel, .other-card, .cta-banner"
    );
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("in");
          io.unobserve(e.target);
        }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    targets.forEach((el) => {
      const i = Array.prototype.indexOf.call(el.parentElement.children, el);
      el.style.setProperty("--delay", `${(i % 8) * 70}ms`);
      el.classList.add("reveal");
      io.observe(el);
    });
  });

  window.UI = { esc, icon, statusBadge, deptUrl, applyButton, discordButton, countUp, reduceMotion };
})();
