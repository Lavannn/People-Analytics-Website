// Renders /data/media.json into the Media & Presentations library, with type filtering
// and an inline lightbox for videos. Adding new content = adding an object to media.json
// (see /docs/HOW-TO-ADD-MEDIA.md). No HTML changes required.

function esc(s) { return (s || '').toString(); }

function mediaIcon(type) {
  switch (type) {
    case 'Video': return '&#9654;';       // play triangle
    case 'Webinar': return '&#9654;';
    case 'Presentation': return '&#9636;'; // slide-like glyph
    default: return '&#9679;';
  }
}

function mediaThumb(item) {
  if (item.thumbnail) {
    return `<div class="media-thumb" style="background-image:url('${esc(item.thumbnail)}')"><span class="media-thumb-icon">${mediaIcon(item.type)}</span></div>`;
  }
  return `<div class="media-thumb media-thumb-fallback"><span class="media-thumb-icon">${mediaIcon(item.type)}</span></div>`;
}

function mediaCard(item) {
  const isVideo = !!item.embedUrl;
  const openAttr = isVideo
    ? `data-video="${esc(item.embedUrl)}" data-title="${esc(item.title)}"`
    : '';
  const href = !isVideo ? (item.externalUrl || '#') : '#';
  const disabled = !isVideo && !item.externalUrl;

  return `
    <a class="media-card ${disabled ? 'media-card-disabled' : ''}" href="${disabled ? '#' : href}"
       ${!disabled && !isVideo ? 'target="_blank" rel="noopener"' : ''}
       ${openAttr}>
      ${mediaThumb(item)}
      <div class="media-card-body">
        <span class="media-meta">${esc(item.type)} · ${esc(item.category)}${item.duration ? ' · ' + esc(item.duration) : ''}</span>
        <h3>${esc(item.title)}</h3>
        <p>${esc(item.description || '')}</p>
        ${item.demo ? '<span class="badge-demo">Illustrative example</span>' : ''}
        ${disabled ? '<span class="media-soon">Coming soon</span>' : ''}
      </div>
    </a>`;
}

function ensureLightbox() {
  if (document.getElementById('media-lightbox')) return;
  const div = document.createElement('div');
  div.id = 'media-lightbox';
  div.className = 'media-lightbox';
  div.innerHTML = `
    <div class="media-lightbox-inner">
      <button class="media-lightbox-close" aria-label="Close video">&times;</button>
      <div class="media-lightbox-frame"></div>
    </div>`;
  document.body.appendChild(div);

  div.addEventListener('click', (e) => {
    if (e.target === div || e.target.classList.contains('media-lightbox-close')) {
      closeLightbox();
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
}

function openLightbox(embedUrl, title) {
  ensureLightbox();
  const lb = document.getElementById('media-lightbox');
  const frame = lb.querySelector('.media-lightbox-frame');
  frame.innerHTML = `<iframe src="${esc(embedUrl)}" title="${esc(title)}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lb = document.getElementById('media-lightbox');
  if (!lb) return;
  lb.classList.remove('open');
  lb.querySelector('.media-lightbox-frame').innerHTML = '';
  document.body.style.overflow = '';
}

function wireMediaClicks(root) {
  root.querySelectorAll('[data-video]').forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      openLightbox(card.dataset.video, card.dataset.title);
    });
  });
}

function renderMediaLibrary(items) {
  const grid = document.getElementById('media-grid');
  const filterBar = document.getElementById('media-filter-bar');
  if (!grid) return;

  const publicItems = items.filter(m => m.visibility === 'public' || !m.visibility);
  const types = ['All', ...new Set(publicItems.map(m => m.type))];

  if (filterBar) {
    filterBar.innerHTML = types.map((t, i) =>
      `<button class="filter-chip ${i === 0 ? 'active' : ''}" data-type="${t}">${t}</button>`
    ).join('');
    filterBar.querySelectorAll('.filter-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        filterBar.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        draw(btn.dataset.type);
      });
    });
  }

  function draw(type) {
    const list = type === 'All' ? publicItems : publicItems.filter(m => m.type === type);
    if (!list.length) {
      grid.innerHTML = `
        <div class="empty-state">
          <h3>New media is on the way</h3>
          <p>Recorded talks, webinars and presentation decks are added here over time. Check back soon.</p>
        </div>`;
      return;
    }
    grid.innerHTML = list.map(mediaCard).join('');
    wireMediaClicks(grid);
  }

  draw('All');
}

function renderMediaTeaser(containerId, items, count = 3) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const list = items
    .filter(m => (m.visibility === 'public' || !m.visibility) && m.featured)
    .slice(0, count);
  el.innerHTML = list.map(mediaCard).join('');
  wireMediaClicks(el);
}
