// Renders portfolio content from /data/projects.json.
// Adding a new project = adding a new object to that file. No HTML changes required.

function projectUrl(p) {
  return `project.html?slug=${encodeURIComponent(p.slug)}`;
}

function renderFlagshipList(containerId, projects) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const flagships = projects.filter(p => p.featured && p.visibility === 'public').sort((a, b) => a.order - b.order);
  el.innerHTML = flagships.map((p, i) => `
    <a class="flagship-row" href="${projectUrl(p)}">
      <span class="flagship-num">${String(i + 1).padStart(2, '0')}</span>
      <span class="flagship-body">
        <h3>${p.shortTitle}</h3>
        <p>${p.summary}</p>
        ${(p.stats && p.stats.length) ? `<span class="flagship-stats">${p.stats.slice(0, 3).map(s => `<span class="flagship-stat"><strong>${s.value}</strong> ${s.label}</span>`).join('')}</span>` : ''}
        <span class="flagship-tags">${(p.tags || []).slice(0, 4).map(t => `<span class="tag">${t}</span>`).join('')}</span>
      </span>
      <span class="flagship-cta"><span class="arrow-link">View platform</span></span>
    </a>
  `).join('');
}

function renderProjectGrid(containerId, projects, placeholderCount = 2) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const items = projects.filter(p => p.visibility === 'public').sort((a, b) => a.order - b.order);
  let html = items.map(p => `
    <a class="project-card" href="${projectUrl(p)}">
      <span class="cat">${p.category}</span>
      <h3>${p.shortTitle}</h3>
      <p>${p.summary}</p>
      <span class="arrow-link">Read case study</span>
    </a>
  `).join('');
  for (let i = 0; i < placeholderCount; i++) {
    html += `<div class="project-card placeholder-card">More case studies are added on an ongoing basis as engagements complete.</div>`;
  }
  el.innerHTML = html;
}

function esc(str) { return (str || '').toString(); }

function renderProjectDetail(projects) {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  const project = projects.find(p => p.slug === slug);
  const root = document.getElementById('project-root');
  if (!root) return;

  if (!project) {
    root.innerHTML = `
      <section class="case-block"><div class="wrap">
        <h2>Project not found</h2>
        <p class="content">This case study may have been moved or unpublished. <a class="arrow-link" href="portfolio.html">Back to the portfolio</a></p>
      </div></section>`;
    document.title = 'Project not found — Lavan Kumar Vangapandu';
    return;
  }

  document.title = `${project.shortTitle} — Lavan Kumar Vangapandu`;

  const statRow = (project.stats || []).map(s => `<div><strong>${esc(s.value)}</strong>${esc(s.label)}</div>`).join('');

  const modules = (project.modules || []).map(m => `
    <div class="module-item"><h4>${esc(m.name)}</h4><p>${esc(m.detail)}</p></div>
  `).join('');

  const bulletBlock = (title, items) => !items || !items.length ? '' : `
    <div class="case-block"><div class="wrap">
      <div class="label">${title}</div>
      <ul class="content" style="list-style:disc; padding-left:20px;">
        ${items.map(i => `<li style="margin-bottom:8px;">${esc(i)}</li>`).join('')}
      </ul>
    </div></div>`;

  const downloads = project.downloads || {};
  const chip = (label, href) => href
    ? `<a class="download-chip" href="${href}" target="_blank" rel="noopener">${label} ↓</a>`
    : `<span class="download-chip disabled">${label} — coming soon</span>`;

  root.innerHTML = `
    <section class="project-hero">
      <div class="wrap">
        <div class="breadcrumb"><a href="portfolio.html">Portfolio</a> / ${esc(project.category.split('·')[0].trim())}</div>
        <div class="cat">${esc(project.category)}</div>
        <h1>${esc(project.title)}</h1>
        <p class="tagline">${esc(project.summary)}</p>
        ${statRow ? `<div class="stat-row">${statRow}</div>` : ''}
      </div>
    </section>

    <section class="case-block"><div class="wrap">
      <div class="label">The business problem</div>
      <h2>Why this was worth building</h2>
      <div class="content"><p>${esc(project.businessProblem)}</p></div>
    </div></section>

    <section class="case-block alt-bg"><div class="wrap">
      <div class="label">The approach</div>
      <h2>How it works</h2>
      <div class="content"><p>${esc(project.approach)}</p></div>
      ${modules ? `<div class="module-list">${modules}</div>` : ''}
    </div></section>

    ${bulletBlock('What business decisions can this support?', project.decisionSupport)}
    ${bulletBlock('Business applications', project.businessApplications)}
    ${bulletBlock('What sets it apart', project.usp || project.whyDifferent)}
    ${project.keyInsightsFraming ? `<div class="case-block"><div class="wrap"><div class="label">Design philosophy</div><div class="content"><p>${esc(project.keyInsightsFraming)}</p></div></div></div>` : ''}
    ${project.gettingStarted ? `<div class="case-block"><div class="wrap"><div class="label">Getting started</div><div class="content"><p>${esc(project.gettingStarted)}</p></div></div></div>` : ''}

    <section class="case-block"><div class="wrap">
      <div class="label">Technology used</div>
      <div class="pill-row">${(project.technology || []).map(t => `<span class="pill">${esc(t)}</span>`).join('')}</div>
    </div></section>

    <section class="case-block"><div class="wrap">
      <div class="label">Screenshots, demo & materials</div>
      <div class="download-row">
        ${chip('Presentation (PPT/PDF)', downloads.presentation)}
        ${chip('Project brief (PDF)', downloads.pdf)}
        ${chip('Video walkthrough', downloads.video)}
        ${chip('Live demo', downloads.demoLink)}
      </div>
      ${project.dataNote ? `<div class="demo-note"><span class="badge-demo">Illustrative / Synthetic Data</span><br/><br/>${esc(project.dataNote)}</div>` : ''}
    </div></section>

    <section class="case-block"><div class="wrap">
      <div class="label">Interested in something similar?</div>
      <h2>Let's talk about your workforce data</h2>
      <div class="cta-row" style="margin-top:20px;">
        <a class="btn btn-primary" href="consulting.html#contact">Start a conversation</a>
        <a class="btn btn-outline" href="portfolio.html">Back to portfolio</a>
      </div>
    </div></section>
  `;
}
