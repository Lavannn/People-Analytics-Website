// Renders /data/articles.json into the Insights & Resources grid, with category filtering.
// Adding new content = adding an object to articles.json (see /docs/HOW-TO-ADD-CONTENT.md).

function renderInsights(articles) {
  const grid = document.getElementById('insight-grid');
  const filterBar = document.getElementById('filter-bar');
  if (!grid) return;

  const publicArticles = articles.filter(a => a.visibility === 'public' || !a.visibility);
  const categories = ['All', ...new Set(publicArticles.map(a => a.category))];

  if (filterBar) {
    filterBar.innerHTML = categories.map((c, i) =>
      `<button class="filter-chip ${i === 0 ? 'active' : ''}" data-cat="${c}">${c}</button>`
    ).join('');
    filterBar.querySelectorAll('.filter-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        filterBar.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        draw(btn.dataset.cat);
      });
    });
  }

  function draw(cat) {
    const items = cat === 'All' ? publicArticles : publicArticles.filter(a => a.category === cat);
    if (!items.length) {
      grid.innerHTML = `
        <div class="empty-state">
          <h3>New resources are on the way</h3>
          <p>Articles, whitepapers and case studies are added here as they're published. Check back soon, or get in touch to request something specific.</p>
        </div>`;
      return;
    }
    grid.innerHTML = items.map(a => `
      <a class="insight-card" href="${a.link || '#'}" ${a.link ? 'target="_blank" rel="noopener"' : ''}>
        <span class="meta">${a.category} · ${a.type || 'Article'}</span>
        <h3>${a.title}</h3>
        <p>${a.excerpt || ''}</p>
      </a>
    `).join('');
  }

  draw('All');
}
