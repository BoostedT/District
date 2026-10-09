(function () {
  const S = window.SITE;
  const { esc, icon, statusBadge, deptUrl, applyButton, discordButton } = window.UI;
  const page = document.getElementById("deptPage");

  const id = new URLSearchParams(location.search).get("d");
  const d = S.departments.find((x) => x.id === id);

  if (!d) {
    document.title = `Department not found · ${S.name}`;
    page.innerHTML = `
      <section class="section not-found">
        <div class="container narrow">
          <h1>Department not found</h1>
          <p class="muted">That department doesn't exist or may have been renamed.</p>
          <a href="index.html#departments" class="btn btn-primary">See all departments</a>
        </div>
      </section>`;
    return;
  }

  document.title = `${d.short} · ${S.name} Recruitment`;
  page.style.setProperty("--accent", d.accent);

  const list = (items) =>
    `<ul class="check-list">${(items || []).map((r) => `<li>${icon("check")}<span>${esc(r)}</span></li>`).join("")}</ul>`;

  const process = d.process || S.process;
  const others = S.departments.filter((x) => x.id !== d.id);

  page.innerHTML = `
    <section class="dept-hero">
      <div class="dept-hero-bg" aria-hidden="true">
        <div class="dept-hero-glow"></div>
        <div class="dept-hero-watermark">${icon(d.icon)}</div>
      </div>
      <div class="container">
        <a href="index.html#departments" class="back-link">${icon("back")} All departments</a>
        <div class="dept-hero-inner">
          <div class="dept-icon dept-icon-lg">${icon(d.icon)}</div>
          <div>
            <div class="dept-hero-meta">
              <span class="eyebrow">${esc(d.short)}</span>
              ${statusBadge(d)}
            </div>
            <h1>${esc(d.name)}</h1>
            <p class="dept-tagline">${esc(d.tagline)}</p>
            <div class="hero-cta hero-cta-left">
              ${applyButton(d, "btn-lg")}
              ${discordButton("btn-lg", "Ask in Discord")}
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container dept-layout">
        <div class="dept-main">
          <article class="panel">
            <h2>About</h2>
            <p>${esc(d.about)}</p>
          </article>

          <article class="panel">
            <h2>What you'll do</h2>
            ${list(d.duties)}
          </article>

          <article class="panel">
            <h2>Requirements</h2>
            ${list(d.requirements)}
            <p class="muted small panel-note">Plus the <a href="index.html#requirements">general requirements</a> for every department.</p>
          </article>

          <article class="panel">
            <h2>Application process</h2>
            <ol class="timeline">
              ${process.map((s, i) => `<li><span class="step-num">${i + 1}</span><div><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></div></li>`).join("")}
            </ol>
          </article>
        </div>

        <aside class="dept-side">
          <div class="panel side-card">
            <h2>Apply</h2>
            <p class="muted">${
              d.status === "closed"
                ? "Applications are closed right now. Keep an eye on the Discord for when they reopen."
                : d.status === "limited"
                ? "Only a few spots are open. Put your best application forward."
                : "We're actively recruiting. Applications are open."
            }</p>
            ${applyButton(d, "btn-block")}
          </div>

          ${
            d.ranks && d.ranks.length
              ? `<div class="panel side-card">
                  <h2>Rank structure</h2>
                  <ol class="ranks">
                    ${d.ranks.slice().reverse().map((r) => `<li>${esc(r)}</li>`).join("")}
                  </ol>
                  <p class="muted small">Everyone starts at ${esc(d.ranks[0])}.</p>
                </div>`
              : ""
          }
        </aside>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container">
        <div class="section-head">
          <h2>Other departments</h2>
        </div>
        <div class="other-grid">
          ${others
            .map(
              (o) => `
              <a class="other-card" href="${deptUrl(o)}" style="--accent:${esc(o.accent)}">
                <div class="dept-icon dept-icon-sm">${icon(o.icon)}</div>
                <div>
                  <strong>${esc(o.short)}</strong>
                  ${statusBadge(o)}
                </div>
              </a>`
            )
            .join("")}
        </div>
      </div>
    </section>`;
})();
