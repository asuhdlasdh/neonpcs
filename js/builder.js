// Custom PC Builder logic enforcing brand/socket flow, constraints, and PSU selection

window.NeonRigBuilder = (function() {
  const cat = () => NeonRig.catalog;

  const state = {
    brand: null, // AMD | Intel
    socket: null, // AM4 | AM5 | LGA 1700 DDR4 | LGA 1700 DDR5 | LGA 1851
    cpuId: null,
    motherboardId: null,
    coolerId: null,
    gpuId: null,
    ramId: null,
    ssdId: null,
    caseId: null,
    optionalIds: new Set(),
    step: 0,
  };

  let addToCartCb = null;

  function init(addToCart) {
    addToCartCb = addToCart;
    render();
  }

  function money(v) { return `${v} SAR`; }

  function getSubtotalAndPSU() {
    const ids = [state.cpuId, state.motherboardId, state.coolerId, state.gpuId, state.ramId, state.ssdId, state.caseId];
    const items = ids.map(id => findItemById(id)).filter(Boolean);
    const optItems = [...state.optionalIds].map(id => findItemById(id));
    const cpuId = state.cpuId;
    const gpuId = state.gpuId;
    const psuId = NeonRig.selectPsuId(gpuId, cpuId);
    const psuItem = findItemById(psuId);
    const total = [...items, ...optItems, psuItem].filter(Boolean).reduce((s, it) => s + it.price, 0);
    return { total, psuItem };
  }

  function findItemById(id) {
    if (!id) return null;
    for (const group of Object.values(cat())) {
      const found = group.find(x => x.id === id);
      if (found) return found;
    }
    return null;
  }

  function brandOptions() { return ['AMD','Intel']; }

  function socketOptions() {
    if (state.brand === 'AMD') return ['AM4','AM5'];
    if (state.brand === 'Intel') return ['LGA 1700 DDR4','LGA 1700 DDR5','LGA 1851'];
    return [];
  }

  function cpuOptions() {
    if (!state.brand || !state.socket) return [];
    if (state.brand === 'AMD' && state.socket === 'AM4') return cat().cpu.filter(c => c.brand==='AMD' && c.socket==='AM4');
    if (state.brand === 'AMD' && state.socket === 'AM5') return cat().cpu.filter(c => c.brand==='AMD' && c.socket==='AM5');
    if (state.brand === 'Intel' && state.socket.startsWith('LGA 1700')) return cat().cpu.filter(c => c.brand==='Intel' && c.socket==='LGA1700');
    if (state.brand === 'Intel' && state.socket==='LGA 1851') return cat().cpu.filter(c => c.brand==='Intel' && c.socket==='LGA1851');
    return [];
  }

  function motherboardOptions() {
    if (!state.cpuId || !state.socket) return [];
    const cpu = findItemById(state.cpuId);
    if (state.brand === 'AMD' && state.socket === 'AM4') return cat().motherboard.filter(m => m.brand==='AMD' && m.socket==='AM4');
    if (state.brand === 'AMD' && state.socket === 'AM5') return cat().motherboard.filter(m => m.brand==='AMD' && m.socket==='AM5');
    if (state.brand === 'Intel' && state.socket === 'LGA 1700 DDR4') return cat().motherboard.filter(m => m.brand==='Intel' && m.socket==='LGA1700' && m.ddr==='DDR4');
    if (state.brand === 'Intel' && state.socket === 'LGA 1700 DDR5') return cat().motherboard.filter(m => m.brand==='Intel' && m.socket==='LGA1700' && m.ddr==='DDR5');
    if (state.brand === 'Intel' && state.socket === 'LGA 1851') return cat().motherboard.filter(m => m.brand==='Intel' && m.socket==='LGA1851');
    return [];
  }

  function coolerOptions() {
    // Stock cooler only if CPU includes it
    const base = [...cat().cooler];
    const cpu = findItemById(state.cpuId);
    if (!cpu || cpu.withStockCooler) return base;
    return base.filter(c => c.id !== 'cooler-stock');
  }

  function gpuOptions() { return cat().gpu; }

  function ramOptions() {
    if (!state.socket) return [];
    if (state.socket === 'AM4' || state.socket === 'LGA 1700 DDR4') {
      return cat().ram.filter(r => r.type === 'DDR4');
    }
    if (state.socket === 'AM5' || state.socket === 'LGA 1700 DDR5' || state.socket === 'LGA 1851') {
      return cat().ram.filter(r => r.type === 'DDR5');
    }
    return [];
  }

  function ssdOptions() { return cat().ssd; }

  function caseOptions() {
    const list = [...cat().case];
    const mb = findItemById(state.motherboardId);
    const gpuId = state.gpuId;
    const coolerId = state.coolerId;
    let filtered = list;
    const needsBiggerCase = new Set(['cooler-aio-360','cooler-aio-360-argb','gpu-5090','gpu-5080','gpu-9070xt','gpu-9070','gpu-7900xt','gpu-5070ti']);
    if (mb && mb.form === 'ATX') {
      filtered = filtered.filter(c => c.id !== 'case-montech-air-100');
    }
    if (coolerId && needsBiggerCase.has(coolerId)) filtered = filtered.filter(c => c.id !== 'case-montech-air-100');
    if (gpuId && needsBiggerCase.has(gpuId)) filtered = filtered.filter(c => c.id !== 'case-montech-air-100');
    return filtered;
  }

  function optionalOptions() { return cat().optional; }

  function recommendationsNote() {
    const cpu = findItemById(state.cpuId);
    if (!cpu) return '';
    const ids = new Set([
      'cpu-r7-5800x','cpu-r7-7700x','cpu-r7-7800x3d','cpu-r7-9700x','cpu-r7-9800x3d','cpu-i5-14600k','cpu-cu5-245k'
    ]);
    const highIds = new Set([
      'cpu-r9-7900x','cpu-r9-7950x','cpu-r9-9900x','cpu-r9-9900x3d','cpu-r9-9950x','cpu-r9-9950x3d','cpu-i7-14700k','cpu-i9-14900k','cpu-cu7-265k','cpu-cu9-285k'
    ]);
    if (ids.has(cpu.id)) return 'Recommendation: Choose Dual Tower Air or 360mm AIO for best thermals.';
    if (highIds.has(cpu.id)) return 'Recommendation: Choose 360mm AIO (with or without ARGB).';
    return '';
  }

  function biosUpdateNote() {
    const cpuIds = new Set(['cpu-r5-9600x','cpu-r7-9700x','cpu-r7-9800x3d','cpu-r9-9900x','cpu-r9-9900x3d','cpu-r9-9950x','cpu-r9-9950x3d']);
    const mb = findItemById(state.motherboardId);
    if (!mb) return '';
    if (mb.socket==='AM5' && (mb.name.startsWith('B650') || mb.name.startsWith('X670')) && cpuIds.has(state.cpuId)) {
      return 'Note: B650 and X670 might require a BIOS update to boot with this CPU.';
    }
    return '';
  }

  function onChange() {
    const { total, psuItem } = getSubtotalAndPSU();
    const complete = state.brand && state.socket && state.cpuId && state.motherboardId && state.coolerId && state.gpuId && state.ramId && state.ssdId && state.caseId;
    const btn = document.getElementById('addBuildToCart');
    if (btn) btn.disabled = !complete;
    const subtotalEl = document.getElementById('builderSubtotal');
    if (subtotalEl) subtotalEl.textContent = money(total);
    const psuEl = document.getElementById('summaryPsu');
    if (psuEl) psuEl.textContent = psuItem ? `${psuItem.name} - ${money(psuItem.price)}` : '-';
    const note = recommendationsNote();
    const bios = biosUpdateNote();
    const notRec = findItemById(state.cpuId)?.notRecommended || '';
    const notesEl = document.getElementById('builderNotes');
    if (notesEl) notesEl.innerHTML = [note, bios, notRec].filter(Boolean).map(t => `<div class="note">${t}</div>`).join('');
    renderCalc();
    renderSummaryItems();
    updateWattsDisplay(psuItem);
  }

  function addBuildToCart() {
    const componentIds = [state.cpuId, state.motherboardId, state.coolerId, state.gpuId, state.ramId, state.ssdId, state.caseId].filter(Boolean);
    const components = componentIds.map(id => findItemById(id)).filter(Boolean);
    const optionalComponents = [...state.optionalIds].map(id => findItemById(id)).filter(Boolean);
    const psuId = NeonRig.selectPsuId(state.gpuId, state.cpuId);
    const psu = findItemById(psuId);
    const allItems = [...components, ...optionalComponents, ...(psu ? [psu] : [])];
    const total = allItems.reduce((s, it) => s + it.price, 0);
    const details = allItems.map(it => it.name);
    const buildId = 'custom-build-' + Date.now();
    addToCartCb({ id: buildId, name: 'Custom PC Build', price: total, qty: 1, meta: 'custom-build', details });
    // Switch to cart view
    location.hash = '#cart';
    const toCart = document.querySelector('[data-target="cart"]');
    if (toCart) toCart.click();
  }

  function renderWizard() { /* obsolete in calculator layout */ }

  function updateWattsDisplay(psuItem) {
    const wattsEl = document.getElementById('wattsValue');
    if (!wattsEl) return;
    if (!psuItem) { wattsEl.textContent = '0 WATTS'; return; }
    wattsEl.textContent = `${psuItem.watt || 0} WATTS`;
  }

  function fillSelect(el, options, getValue, getLabel, currentVal, placeholder) {
    if (!el) return;
    const opts = ['<option value="">'+(placeholder||'Select')+'</option>'].concat(
      options.map(o => `<option value="${getValue(o)}" ${currentVal===getValue(o)?'selected':''}>${getLabel(o)}</option>`)
    );
    el.innerHTML = opts.join('');
  }

  function renderCalc() {
    // Brand
    fillSelect(
      document.getElementById('selBrand'),
      brandOptions().map(v=>({ v })),
      o=>o.v,
      o=>o.v,
      state.brand,
      'Select Brand'
    );
    // Socket
    fillSelect(
      document.getElementById('selSocket'),
      socketOptions().map(v=>({ v })),
      o=>o.v,
      o=>o.v,
      state.socket,
      'Select Socket'
    );
    // CPU
    fillSelect(
      document.getElementById('selCpu'),
      cpuOptions(),
      o=>o.id,
      o=>`${o.name} — ${money(o.price)}`,
      state.cpuId,
      'Select Model'
    );
    // Motherboard
    fillSelect(
      document.getElementById('selMotherboard'),
      motherboardOptions(),
      o=>o.id,
      o=>`${o.name} — ${money(o.price)}`,
      state.motherboardId,
      'Select Form Factor'
    );
    // GPU
    fillSelect(
      document.getElementById('selGpu'),
      gpuOptions(),
      o=>o.id,
      o=>`${o.name} — ${money(o.price)}`,
      state.gpuId,
      'Select GPU'
    );
    // RAM
    fillSelect(
      document.getElementById('selRam'),
      ramOptions(),
      o=>o.id,
      o=>`${o.name} — ${money(o.price)}`,
      state.ramId,
      'Select RAM'
    );
    // SSD
    fillSelect(
      document.getElementById('selSsd'),
      ssdOptions(),
      o=>o.id,
      o=>`${o.name} — ${money(o.price)}`,
      state.ssdId,
      'Select NVMe SSD'
    );
    // Case
    fillSelect(
      document.getElementById('selCase'),
      caseOptions(),
      o=>o.id,
      o=>`${o.name} — ${money(o.price)}`,
      state.caseId,
      'Select Case'
    );
    // Cooler
    fillSelect(
      document.getElementById('selCooler'),
      coolerOptions(),
      o=>o.id,
      o=>`${o.name} — ${money(o.price)}`,
      state.coolerId,
      'Select Cooler'
    );

    const calcNotes = document.getElementById('calcNotes');
    if (calcNotes) calcNotes.textContent = ramWarning() || '';
  }

  function ramWarning() {
    if (state.socket==='AM4' || state.socket==='LGA 1700 DDR4') {
      return 'Note: 64GB DDR4 is not recommended but still selectable.';
    }
    return '';
  }

  function cardGrid(field, options, value, hint) {
    const cards = options.map(o => `<div class="card-option ${value===o.value?'selected':''}" data-field="${field}" data-value="${o.value}"><div><strong>${o.label}</strong></div>${o.sub?`<div class=\"hint\">${o.sub}</div>`:''}</div>`).join('');
    return `<div class="card-grid">${cards}</div>${hint?`<div class=\"hint\">${hint}</div>`:''}`;
  }

  function checkboxPanel(field, options, selectedSet) {
    return `<div class="card">${options.map(o => `<label><input type=\"checkbox\" data-check=\"${field}|${o.id}\" ${selectedSet.has(o.id)?'checked':''}/> ${o.name} - ${money(o.price)}</label>`).join('<br/>')}</div>`;
  }

  function attachHandlers() {
    const brandEl = document.getElementById('selBrand');
    const socketEl = document.getElementById('selSocket');
    const cpuEl = document.getElementById('selCpu');
    const mbEl = document.getElementById('selMotherboard');
    const gpuEl = document.getElementById('selGpu');
    const ramEl = document.getElementById('selRam');
    const ssdEl = document.getElementById('selSsd');
    const caseEl = document.getElementById('selCase');
    const coolerEl = document.getElementById('selCooler');
    const resetBtn = document.getElementById('resetBuilder');

    brandEl && brandEl.addEventListener('change', () => { state.brand = brandEl.value || null; state.socket=null; state.cpuId=null; state.motherboardId=null; state.coolerId=null; state.gpuId=null; state.ramId=null; state.ssdId=null; state.caseId=null; onChange(); });
    socketEl && socketEl.addEventListener('change', () => { state.socket = socketEl.value || null; state.cpuId=null; state.motherboardId=null; state.coolerId=null; state.gpuId=null; state.ramId=null; state.ssdId=null; state.caseId=null; onChange(); });
    cpuEl && cpuEl.addEventListener('change', () => { state.cpuId = cpuEl.value || null; onChange(); });
    mbEl && mbEl.addEventListener('change', () => { state.motherboardId = mbEl.value || null; onChange(); });
    gpuEl && gpuEl.addEventListener('change', () => { state.gpuId = gpuEl.value || null; onChange(); });
    ramEl && ramEl.addEventListener('change', () => { state.ramId = ramEl.value || null; onChange(); });
    ssdEl && ssdEl.addEventListener('change', () => { state.ssdId = ssdEl.value || null; onChange(); });
    caseEl && caseEl.addEventListener('change', () => { state.caseId = caseEl.value || null; onChange(); });
    coolerEl && coolerEl.addEventListener('change', () => { state.coolerId = coolerEl.value || null; onChange(); });
    resetBtn && resetBtn.addEventListener('click', () => { Object.assign(state, { brand:null, socket:null, cpuId:null, motherboardId:null, coolerId:null, gpuId:null, ramId:null, ssdId:null, caseId:null }); onChange(); });
    const addBtn = document.getElementById('addBuildToCart');
    addBtn && addBtn.addEventListener('click', (e) => { if (window.animateAddButton) window.animateAddButton(e.currentTarget); addBuildToCart(); });
  }

  function render() {
    renderCalc();
    attachHandlers();
    onChange();
  }

  function renderSummaryItems() {
    const slots = [
      ['brand', state.brand],
      ['socket', state.socket],
      ['CPU', findItemById(state.cpuId)?.name],
      ['Motherboard', findItemById(state.motherboardId)?.name],
      ['Cooler', findItemById(state.coolerId)?.name],
      ['GPU', findItemById(state.gpuId)?.name],
      ['RAM', findItemById(state.ramId)?.name],
      ['NVMe SSD', findItemById(state.ssdId)?.name],
      ['Case', findItemById(state.caseId)?.name],
    ];
    const root = document.getElementById('summaryItems');
    if (!root) return;
    root.innerHTML = slots.map(([k,v]) => `<div class=\"line\"><span class=\"muted\">${k}</span><span>${v||'-'}</span></div>`).join('') + (state.optionalIds.size ? `<div class=\"line\"><span class=\"muted\">Optional</span><span>${[...state.optionalIds].map(id=>findItemById(id)?.name).join(', ')}</span></div>` : '');
  }

  return { init };
})();


