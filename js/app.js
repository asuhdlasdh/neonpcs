// SPA navigation, catalog rendering, search, and cart management

const state = {
  cart: JSON.parse(localStorage.getItem('neonrig_cart') || '[]'),
  components: {
    activeKind: 'cpu',
    sort: 'featured',
    page: 1,
    perPage: 8,
    compact: false,
  }
};

function saveCart() {
  localStorage.setItem('neonrig_cart', JSON.stringify(state.cart));
  updateCartCount();
}

function updateCartCount() {
  const count = state.cart.reduce((s, item) => s + (item.qty || 1), 0);
  const el = document.getElementById('cartCount');
  if (el) el.textContent = String(count);
}

function addToCart(item) {
  const existing = state.cart.find(x => x.id === item.id && x.meta === item.meta);
  if (existing) {
    existing.qty += item.qty || 1;
  } else {
    state.cart.push({ ...item, qty: item.qty || 1 });
  }
  saveCart();
  renderCart();
  cartAddFeedback();
}

function removeFromCart(id, meta) {
  state.cart = state.cart.filter(x => !(x.id === id && x.meta === meta));
  saveCart();
  renderCart();
}

function setQty(id, meta, qty) {
  const item = state.cart.find(x => x.id === id && x.meta === meta);
  if (!item) return;
  item.qty = Math.max(1, parseInt(qty || '1', 10));
  saveCart();
  renderCart();
}

function money(v) { return `${v} SAR`; }

function showView(id) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  if (id === 'components') { renderCatalog(); }
  if (id === 'cart') { renderCart(); }
}

function setupNav() {
  document.querySelectorAll('[data-target]').forEach(btn => {
    btn.addEventListener('click', () => {
      const t = btn.getAttribute('data-target');
      if (t) showView(t);
    });
  });
  // Hash support
  if (location.hash) {
    const id = location.hash.replace('#','');
    if (document.getElementById(id)) showView(id);
  }
}

function renderCatalog() {
  const root = document.getElementById('catalog');
  if (!root) return;
  const cat = NeonRig.catalog;
  renderTabs();
  const kind = state.components.activeKind;
  let items = sortItems(cat[kind].slice(), state.components.sort);
  if (kind === 'cooler') items = items.filter(it => it.id !== 'cooler-stock');
  const { page, perPage } = state.components;
  const start = (page - 1) * perPage;
  const slice = items.slice(start, start + perPage);
  root.classList.toggle('compact-mode', state.components.compact);
  root.innerHTML = slice.map(item => renderProductCard(kind, item)).join('');
  renderPagination(items.length);
}

function renderProductCard(kind, item) {
  const meta = buildMeta(kind, item);
  const idMeta = `${kind}:${item.id}`;
  const img = resolveImage(kind, item);
  const { stars, count } = getRating(item.id);
  return `
    <div class="product-card">
      <div class="img">${img ? `<img src="${img}" alt="${item.name}">` : ''}</div>
      <div>
        <h4>${item.name}</h4>
        <div class="muted">${meta}</div>
      </div>
      <div class="rating">${'★'.repeat(stars)}${'☆'.repeat(5-stars)} <span class="count">${count}</span></div>
      <div class="price">${money(item.price)}</div>
      <div class="actions"><button class="btn" data-add='${idMeta}'>Add to Cart</button><button class="btn primary" data-buy='${idMeta}'>Buy Now</button></div>
    </div>`;
}

function buildMeta(kind, item) {
  if (kind === 'cpu') return `${item.specs.cores}C/${item.specs.threads}T • ${item.specs.base} → ${item.specs.boost}`;
  if (kind === 'gpu') return `${item.brand} • ${item.vram} VRAM`;
  if (kind === 'ram') return `${item.type} • ${item.speed} ${item.cl}`;
  if (kind === 'motherboard') return `${item.brand} • ${item.socket}${item.ddr ? ' ' + item.ddr : ''} • ${item.form}`;
  if (kind === 'case') return `${item.form}`;
  if (kind === 'psu') return `${item.watt}W`;
  return '';
}

const defaultImages = {
  cpu: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop',
  gpu: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=800&auto=format&fit=crop',
  ram: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=800&auto=format&fit=crop',
  ssd: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c6?q=80&w=800&auto=format&fit=crop',
  motherboard: 'https://images.unsplash.com/photo-1591488320449-011701bb670d?q=80&w=800&auto=format&fit=crop',
  cooler: 'https://images.unsplash.com/photo-1624705002806-9a7b2d52856e?q=80&w=800&auto=format&fit=crop',
  case: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=800&auto=format&fit=crop',
  psu: 'https://images.unsplash.com/photo-1587206667262-9a4d8e3f1fc1?q=80&w=800&auto=format&fit=crop',
  optional: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=800&auto=format&fit=crop'
};

function resolveImage(kind, item) {
  return item.image || defaultImages[kind] || '';
}

function getRating(id) {
  // Deterministic pseudo rating based on id
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  const stars = 4 + (hash % 2); // 4 or 5
  const count = 50 + (hash % 5000);
  return { stars, count };
}

function setupAddToCartButtons() {
  document.body.addEventListener('click', (e) => {
    const t = e.target;
    if (t && t.getAttribute && t.hasAttribute('data-add')) {
      animateAddButton(t);
      const token = t.getAttribute('data-add');
      const [kind, id] = token.split(':');
      const item = Object.values(NeonRig.catalog).flat().find(x => x.id === id);
      if (!item) return;
      addToCart({ id, name: item.name, price: item.price, meta: kind });
    }
    if (t && t.getAttribute && t.hasAttribute('data-buy')) {
      const token = t.getAttribute('data-buy');
      const [kind, id] = token.split(':');
      const item = Object.values(NeonRig.catalog).flat().find(x => x.id === id);
      if (!item) return;
      const payload = [{ id, name: item.name, price: item.price, qty: 1, meta: kind }];
      localStorage.setItem('neonrig_checkout', JSON.stringify(payload));
      location.href = 'checkout.html';
    }
  });
}

function renderCart() {
  const root = document.getElementById('cartItems');
  if (!root) return;
  if (state.cart.length === 0) {
    root.innerHTML = '<div class="muted">Your cart is empty.</div>';
    document.getElementById('cartTotal').textContent = money(0);
    return;
  }
  root.innerHTML = state.cart.map(item => `
    <div class="item">
      <div>
        <div><strong>${item.name}</strong></div>
        <div class="muted">${item.meta}${item.meta==='custom-build' && item.details ? ' • ' + item.details.join(', ') : ''}</div>
      </div>
      <div class="price">${money(item.price)}</div>
      <div class="total"><span>= ${money((item.qty || 1) * item.price)}</span></div>
      <div class="actions">
        <button class="remove" data-remove="${item.id}|${item.meta}">✕</button>
        ${item.meta==='custom-build' ? '' : `<button class="qty-btn" data-qtyminus="${item.id}|${item.meta}">−</button>
        <input type="number" min="1" value="${item.qty}" data-qty="${item.id}|${item.meta}" />
        <button class="qty-btn" data-qtyplus="${item.id}|${item.meta}">+</button>`}
        <button class="btn primary" data-buynow="${item.id}|${item.meta}">Buy Now</button>
      </div>
    </div>
  `).join('');
  const total = state.cart.reduce((s, x) => s + x.price * (x.qty || 1), 0);
  document.getElementById('cartTotal').textContent = money(total);
}

function setupCartHandlers() {
  document.body.addEventListener('change', (e) => {
    const t = e.target;
    if (t && t.getAttribute && t.hasAttribute('data-qty')) {
      const [id, meta] = t.getAttribute('data-qty').split('|');
      setQty(id, meta, t.value);
    }
  });
  document.body.addEventListener('click', (e) => {
    const t = e.target;
    if (t && t.getAttribute && t.hasAttribute('data-remove')) {
      const [id, meta] = t.getAttribute('data-remove').split('|');
      removeFromCart(id, meta);
    }
    if (t && t.getAttribute && t.hasAttribute('data-qtyminus')) {
      const [id, meta] = t.getAttribute('data-qtyminus').split('|');
      const item = state.cart.find(x => x.id === id && x.meta === meta);
      if (!item) return;
      setQty(id, meta, Math.max(1, (item.qty || 1) - 1));
    }
    if (t && t.getAttribute && t.hasAttribute('data-qtyplus')) {
      const [id, meta] = t.getAttribute('data-qtyplus').split('|');
      const item = state.cart.find(x => x.id === id && x.meta === meta);
      if (!item) return;
      setQty(id, meta, (item.qty || 1) + 1);
    }
    if (t && t.getAttribute && t.hasAttribute('data-buynow')) {
      const [id, meta] = t.getAttribute('data-buynow').split('|');
      const item = state.cart.find(x => x.id === id && x.meta === meta);
      if (!item) return;
      const payload = [{ id: item.id, name: item.name, price: item.price, qty: item.qty || 1, meta: item.meta }];
      localStorage.setItem('neonrig_checkout', JSON.stringify(payload));
      location.href = 'checkout.html';
    }
  });
}

function setupSearch() {
  const input = document.getElementById('searchInput');
  const results = document.getElementById('searchResults');
  if (!input || !results) return;
  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (!q) { results.innerHTML = ''; return; }
    const items = Object.entries(NeonRig.catalog).flatMap(([kind, arr]) =>
      arr.map(it => ({ kind, it }))
    ).filter(({ kind, it }) => it.id !== 'cooler-stock' && `${it.name} ${it.brand || ''} ${it.socket || ''} ${it.vram || ''} ${it.type || ''}`.toLowerCase().includes(q));
    if (items.length === 0) { results.innerHTML = '<div class="result-item">doesn\'t match anything</div>'; return; }
    results.innerHTML = items.slice(0, 20).map(({ kind, it }) => {
      let meta = '';
      if (kind === 'cpu') meta = `${it.specs.cores}C/${it.specs.threads}T • ${it.specs.base}/${it.specs.boost} • MB: ${it.specs.compatibility.join(', ')}`;
      else if (kind === 'gpu') meta = `${it.brand} • ${it.vram}`;
      else if (kind === 'ram') meta = `${it.type} ${it.speed} ${it.cl}`;
      else if (kind === 'motherboard') meta = `${it.socket} ${it.ddr || ''} ${it.form}`;
      return `<div class="result-item"><div><div><strong>${it.name}</strong></div><div class="meta">${meta}</div></div><div><button class="btn" data-add='${kind}:${it.id}'>Add</button> <button class="btn primary" data-buy='${kind}:${it.id}'>Buy</button></div></div>`;
    }).join('');
  });
}

function renderTabs() {
  const tabsRoot = document.getElementById('catTabs');
  if (!tabsRoot) return;
  const defs = [
    ['cpu','CPU'], ['gpu','GPU'], ['motherboard','Motherboard'], ['ram','Memory'], ['ssd','NVMe SSD'], ['cooler','Cooler'], ['case','Case'], ['psu','PSU'], ['optional','Optional']
  ];
  tabsRoot.innerHTML = defs.map(([k, label]) => `<button class="tab ${state.components.activeKind===k?'active':''}" data-tab="${k}">${label}</button>`).join('');
}

function sortItems(arr, by) {
  if (by === 'price-asc') return arr.sort((a,b)=>a.price-b.price);
  if (by === 'price-desc') return arr.sort((a,b)=>b.price-a.price);
  if (by === 'name-asc') return arr.sort((a,b)=>a.name.localeCompare(b.name));
  if (by === 'name-desc') return arr.sort((a,b)=>b.name.localeCompare(a.name));
  return arr; // featured default
}

function renderPagination(total) {
  const root = document.getElementById('pagination');
  if (!root) return;
  const pages = Math.max(1, Math.ceil(total / state.components.perPage));
  state.components.page = Math.min(state.components.page, pages);
  const p = state.components.page;
  root.innerHTML = `
    <button class="page-btn" ${p===1?'disabled':''} data-page="prev">Prev</button>
    <span class="muted">Page ${p} / ${pages}</span>
    <button class="page-btn" ${p===pages?'disabled':''} data-page="next">Next</button>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  setupNav();
  updateCartCount();
  renderCart();
  renderCatalog();
  setupAddToCartButtons();
  setupCartHandlers();
  setupSearch();
  // Tab interactions
  document.body.addEventListener('click', (e) => {
    const tab = e.target.closest('[data-tab]');
    if (tab) {
      state.components.activeKind = tab.getAttribute('data-tab');
      state.components.page = 1;
      renderCatalog();
    }
    const pageBtn = e.target.closest('[data-page]');
    if (pageBtn) {
      const pages = Math.max(1, Math.ceil(NeonRig.catalog[state.components.activeKind].length / state.components.perPage));
      if (pageBtn.getAttribute('data-page')==='prev') state.components.page = Math.max(1, state.components.page-1);
      else state.components.page = Math.min(pages, state.components.page+1);
      renderCatalog();
    }
  });
  // Sort and compact
  const sortSelect = document.getElementById('sortSelect');
  sortSelect && sortSelect.addEventListener('change', () => { state.components.sort = sortSelect.value; state.components.page = 1; renderCatalog(); });
  const compactBtn = document.getElementById('btnToggleCompact');
  compactBtn && compactBtn.addEventListener('click', () => { state.components.compact = !state.components.compact; renderCatalog(); });
  if (window.NeonRigBuilder && window.NeonRigBuilder.init) window.NeonRigBuilder.init(addToCart);
});

// Visual feedback when adding to cart
function cartAddFeedback() {
  const counter = document.getElementById('cartCount');
  if (counter) {
    counter.classList.remove('bump');
    // force reflow to restart animation
    void counter.offsetWidth;
    counter.classList.add('bump');
  }
  const btnCart = document.querySelector('[data-target="cart"]');
  const rect = btnCart ? btnCart.getBoundingClientRect() : { left: window.innerWidth - 40, top: 20 };
  const tag = document.createElement('div');
  tag.className = 'cart-float';
  tag.textContent = '+1';
  tag.style.left = (rect.left + rect.width - 8) + 'px';
  tag.style.top = (rect.top + 8 + window.scrollY) + 'px';
  document.body.appendChild(tag);
  setTimeout(() => tag.remove(), 800);
}

function animateAddButton(btn) {
  btn.classList.remove('added');
  btn.classList.add('adding');
  setTimeout(() => {
    btn.classList.remove('adding');
    btn.classList.add('added');
    setTimeout(() => btn.classList.remove('added'), 450);
  }, 160);
}


