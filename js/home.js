(function () {
  const S = window.SITE;
  const { esc, icon, statusBadge, deptUrl, discordButton, countUp, reduceMotion } = window.UI;

  const recruitingDepts = S.departments.filter((d) => d.status !== "closed");

  // --- Hero ------------------------------------------------------------------
  const connect = document.getElementById("connectBtn");
  if (S.connectUrl) {
    connect.href = S.connectUrl;
    connect.hidden = false;
  }

  // "Now recruiting: LSPD / BCSO / EMS ..." in each department's colour
  const rotator = document.getElementById("heroRotator");
  if (recruitingDepts.length) {
    document.getElementById("rotatorWrap").hidden = false;
    let i = 0;
    const show = () => {
      const d = recruitingDepts[i % recruitingDepts.length];
      rotator.textContent = d.short;
      rotator.style.setProperty("--accent", d.accent);
      rotator.classList.remove("swap");
      void rotator.offsetWidth; // restart the animation
      rotator.classList.add("swap");
      i++;
    };
    show();
    if (!reduceMotion && recruitingDepts.length > 1) setInterval(show, 2200);
  }

  const stats = document.getElementById("heroStats");
  const addStat = (value, label, live) => {
    const el = document.createElement("div");
    el.innerHTML = `<strong>0</strong><span>${live ? '<i class="live-dot"></i>' : ""}${esc(label)}</span>`;
    stats.appendChild(el);
    countUp(el.querySelector("strong"), value);
  };
  addStat(S.departments.length, "Departments");
  addStat(recruitingDepts.length, "Recruiting now");

  // Live player count from the FiveM server list (needs connectUrl = cfx.re/join/xxxx)
  const cfxCode = (S.connectUrl.match(/cfx\.re\/join\/(\w+)/i) || [])[1];
  if (cfxCode) {
    fetch(`https://servers-frontend-api.cfx.re/api/servers/single/${cfxCode}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(({ Data }) => {
        if (!Data) return;
        addStat(Data.clients, "In city now", true);
        const live = document.getElementById("heroLive");
        live.innerHTML = `<i class="live-dot"></i>Server online · ${Data.clients}/${Data.sv_maxclients} players`;
        live.hidden = false;
      })
      .catch(() => {});
  }

  // Online members from the Discord widget (needs the widget enabled on the server)
  if (S.discordGuildId) {
    fetch(`https://discord.com/api/guilds/${S.discordGuildId}/widget.json`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((w) => typeof w.presence_count === "number" && addStat(w.presence_count, "Online in Discord", true))
      .catch(() => {});
  }

  // Rising embers over the banner
  const canvas = document.getElementById("heroEmbers");
  if (!reduceMotion && canvas.getContext) {
    const ctx = canvas.getContext("2d");
    let w, h, embers, running = true;
    const spawn = (anywhere) => ({
      x: Math.random() * w,
      y: anywhere ? Math.random() * h : h + 10,
      r: Math.random() * 2.2 + 0.6,
      vy: Math.random() * 0.8 + 0.3,
      vx: (Math.random() - 0.5) * 0.4,
      sway: Math.random() * Math.PI * 2,
      life: Math.random() * 0.6 + 0.4,
    });
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      embers = Array.from({ length: Math.round(w / 18) }, () => spawn(true));
    };
    const frame = () => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      for (const p of embers) {
        p.sway += 0.02;
        p.x += p.vx + Math.sin(p.sway) * 0.3;
        p.y -= p.vy;
        const fade = Math.min(1, p.y / (h * 0.6)) * p.life;
        if (p.y < -10 || fade <= 0) Object.assign(p, spawn(false));
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        g.addColorStop(0, `rgba(255, 200, 120, ${fade})`);
        g.addColorStop(0.4, `rgba(255, 110, 20, ${fade * 0.6})`);
        g.addColorStop(1, "rgba(255, 60, 0, 0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fill();
      }
      requestAnimationFrame(frame);
    };
    resize();
    window.addEventListener("resize", resize);
    // Pause when the hero is scrolled out of view
    new IntersectionObserver(([e]) => {
      const was = running;
      running = e.isIntersecting;
      if (running && !was) requestAnimationFrame(frame);
    }).observe(canvas);
    requestAnimationFrame(frame);
  }

  // --- Ticker ----------------------------------------------------------------
  const tickerItems = (items) => {
    const one = items.map((t) => `<span>${esc(t)}</span><span class="ticker-sep">✦</span>`).join("");
    return one + one; // doubled so the loop is seamless
  };
  const hiring = recruitingDepts.map((d) => `${d.short} now hiring`);
  document.getElementById("tickerFront").innerHTML = tickerItems(hiring.concat(hiring));
  document.getElementById("tickerBack").innerHTML = tickerItems(
    Array(4).fill([`${S.name}`, "FiveM Roleplay", "Apply today"]).flat()
  );

  // --- Sections --------------------------------------------------------------
  document.getElementById("highlights").innerHTML = (S.highlights || [])
    .map(
      (h) => `
      <div class="highlight">
        <div class="highlight-icon">${icon(h.icon)}</div>
        <h3>${esc(h.title)}</h3>
        <p>${esc(h.text)}</p>
      </div>`
    )
    .join("");

  document.getElementById("deptGrid").innerHTML = S.departments
    .map(
      (d) => `
      <a class="dept-card${d.status === "closed" ? " is-closed" : ""}" href="${deptUrl(d)}" style="--accent:${esc(d.accent)}">
        <div class="dept-card-bg-icon" aria-hidden="true">${icon(d.icon)}</div>
        <div class="dept-card-top">
          <div class="dept-icon">${icon(d.icon)}</div>
          ${statusBadge(d)}
        </div>
        <h3>${esc(d.name)}</h3>
        <p>${esc(d.tagline)}</p>
        <span class="dept-link">View department ${icon("arrow")}</span>
      </a>`
    )
    .join("");

  document.getElementById("generalReqs").innerHTML = S.generalRequirements
    .map((r) => `<li>${icon("check")}<span>${esc(r)}</span></li>`)
    .join("");

  document.getElementById("processSteps").innerHTML = S.process
    .map((s, i) => `<li><span class="step-num">${i + 1}</span><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></li>`)
    .join("");

  document.getElementById("faqList").innerHTML = S.faq
    .map((f) => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`)
    .join("");

  document.getElementById("ctaButtons").innerHTML =
    discordButton("btn-lg") +
    (S.connectUrl
      ? `<a href="${esc(S.connectUrl)}" class="btn btn-ghost btn-lg" target="_blank" rel="noopener">${icon("play")}Connect to server</a>`
      : `<a href="#departments" class="btn btn-ghost btn-lg">Browse departments</a>`);
})();
