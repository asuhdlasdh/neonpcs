// Data catalog for components and builder rules
// Prices are in SAR

window.NeonRig = window.NeonRig || {};

const catalog = {
  cpu: [
    // AMD AM4
    { id: 'cpu-r5-5500', name: 'Ryzen 5 5500', brand: 'AMD', socket: 'AM4', price: 500, withStockCooler: true, image: 'https://m.media-amazon.com/images/I/61O7W7f4i0L._AC_SL1200_.jpg', specs: { cores: 6, threads: 12, base: '3.6 GHz', boost: '4.2 GHz', compatibility: ['B550'] } },
    { id: 'cpu-r5-5600x', name: 'Ryzen 5 5600X', brand: 'AMD', socket: 'AM4', price: 650, withStockCooler: true, specs: { cores: 6, threads: 12, base: '3.7 GHz', boost: '4.6 GHz', compatibility: ['B550'] } },
    { id: 'cpu-r7-5800x', name: 'Ryzen 7 5800X', brand: 'AMD', socket: 'AM4', price: 750, withStockCooler: false, specs: { cores: 8, threads: 16, base: '3.8 GHz', boost: '4.7 GHz', compatibility: ['B550'] } },
    // AMD AM5
    { id: 'cpu-r5-7600x', name: 'Ryzen 5 7600X', brand: 'AMD', socket: 'AM5', price: 900, withStockCooler: false, specs: { cores: 6, threads: 12, base: '4.7 GHz', boost: '5.3 GHz', compatibility: ['B650','X670','X870'] } },
    { id: 'cpu-r7-7700x', name: 'Ryzen 7 7700X', brand: 'AMD', socket: 'AM5', price: 1250, withStockCooler: false, specs: { cores: 8, threads: 16, base: '4.5 GHz', boost: '5.4 GHz', compatibility: ['B650','X670','X870'] } },
    { id: 'cpu-r7-7800x3d', name: 'Ryzen 7 7800X3D', brand: 'AMD', socket: 'AM5', price: 1900, withStockCooler: false, image: 'https://m.media-amazon.com/images/I/71vKyXutPJL._AC_SL1200_.jpg', specs: { cores: 8, threads: 16, base: '4.2 GHz', boost: '5.0 GHz', compatibility: ['B650','X670','X870'] } },
    { id: 'cpu-r9-7900x', name: 'Ryzen 9 7900X', brand: 'AMD', socket: 'AM5', price: 1700, withStockCooler: false, specs: { cores: 12, threads: 24, base: '4.7 GHz', boost: '5.6 GHz', compatibility: ['B650','X670','X870'] } },
    { id: 'cpu-r9-7950x', name: 'Ryzen 9 7950X', brand: 'AMD', socket: 'AM5', price: 2800, withStockCooler: false, specs: { cores: 16, threads: 32, base: '4.5 GHz', boost: '5.7 GHz', compatibility: ['B650','X670','X870'] } },
    { id: 'cpu-r5-9600x', name: 'Ryzen 5 9600X', brand: 'AMD', socket: 'AM5', price: 1000, withStockCooler: false, specs: { cores: 6, threads: 12, base: '4.4 GHz', boost: '5.4 GHz', compatibility: ['B650','X670','X870'] } },
    { id: 'cpu-r7-9700x', name: 'Ryzen 7 9700X', brand: 'AMD', socket: 'AM5', price: 1700, withStockCooler: false, specs: { cores: 8, threads: 16, base: '3.8 GHz', boost: '5.5 GHz', compatibility: ['B650','X670','X870'] } },
    { id: 'cpu-r7-9800x3d', name: 'Ryzen 7 9800X3D', brand: 'AMD', socket: 'AM5', price: 2200, withStockCooler: false, specs: { cores: 8, threads: 16, base: '4.0 GHz', boost: '5.5 GHz', compatibility: ['B650','X670','X870'] } },
    { id: 'cpu-r9-9900x', name: 'Ryzen 9 9900X', brand: 'AMD', socket: 'AM5', price: 2000, withStockCooler: false, specs: { cores: 12, threads: 24, base: '4.4 GHz', boost: '5.6 GHz', compatibility: ['B650','X670','X870'] } },
    { id: 'cpu-r9-9900x3d', name: 'Ryzen 9 9900X3D', brand: 'AMD', socket: 'AM5', price: 2800, withStockCooler: false, specs: { cores: 12, threads: 24, base: '4.0 GHz', boost: '5.7 GHz', compatibility: ['B650','X670','X870'] } },
    { id: 'cpu-r9-9950x', name: 'Ryzen 9 9950X', brand: 'AMD', socket: 'AM5', price: 3100, withStockCooler: false, specs: { cores: 16, threads: 32, base: '4.3 GHz', boost: '5.7 GHz', compatibility: ['B650','X670','X870'] } },
    { id: 'cpu-r9-9950x3d', name: 'Ryzen 9 9950X3D', brand: 'AMD', socket: 'AM5', price: 3400, withStockCooler: false, specs: { cores: 16, threads: 32, base: '4.1 GHz', boost: '5.7 GHz', compatibility: ['B650','X670','X870'] } },

    // Intel LGA1700
    { id: 'cpu-i3-12100f', name: 'Intel Core i3-12100F', brand: 'Intel', socket: 'LGA1700', ddr: 'DDR4/DDR5', price: 450, withStockCooler: true, specs: { cores: 4, threads: 8, base: '3.3 GHz', boost: '4.3 GHz', compatibility: ['H610','B660','B760','Z790'] } },
    { id: 'cpu-i5-12400f', name: 'Intel Core i5-12400F', brand: 'Intel', socket: 'LGA1700', ddr: 'DDR4/DDR5', price: 600, withStockCooler: true, specs: { cores: 6, threads: 12, base: '2.5 GHz', boost: '4.4 GHz', compatibility: ['H610','B660','B760','Z790'] } },
    { id: 'cpu-i5-14400f', name: 'Intel Core i5-14400F', brand: 'Intel', socket: 'LGA1700', ddr: 'DDR4/DDR5', price: 700, withStockCooler: true, specs: { cores: 10, threads: 16, base: '2.5 GHz', boost: '4.7 GHz', compatibility: ['H610','B660','B760','Z790'] } },
    { id: 'cpu-i5-14600k', name: 'Intel Core i5-14600K', brand: 'Intel', socket: 'LGA1700', ddr: 'DDR5', price: 1200, withStockCooler: false, specs: { cores: 14, threads: 20, base: '3.5 GHz', boost: '5.3 GHz', compatibility: ['B660','B760','Z790'] } },
    { id: 'cpu-i7-14700k', name: 'Intel Core i7-14700K', brand: 'Intel', socket: 'LGA1700', ddr: 'DDR5', price: 1800, withStockCooler: false, specs: { cores: 20, threads: 28, base: '3.4 GHz', boost: '5.6 GHz', compatibility: ['B660','B760','Z790'] } },
    { id: 'cpu-i9-14900k', name: 'Intel Core i9-14900K', brand: 'Intel', socket: 'LGA1700', ddr: 'DDR5', price: 2200, withStockCooler: false, specs: { cores: 24, threads: 32, base: '3.2 GHz', boost: '6.0 GHz', compatibility: ['B660','B760','Z790'], notRecommended: 'Not recommended due to stability issues.' } },

    // Intel LGA1851
    { id: 'cpu-cu5-245k', name: 'Core Ultra 5 245K', brand: 'Intel', socket: 'LGA1851', ddr: 'DDR5', price: 1550, withStockCooler: false, specs: { cores: 14, threads: 18, base: 'N/A', boost: 'N/A', compatibility: ['H810M','B860','Z890'] }, notRecommended: 'LGA 1851 CPUs are not recommended due to bad value (may change).'},
    { id: 'cpu-cu7-265k', name: 'Core Ultra 7 265K', brand: 'Intel', socket: 'LGA1851', ddr: 'DDR5', price: 1800, withStockCooler: false, specs: { cores: 20, threads: 24, base: 'N/A', boost: 'N/A', compatibility: ['H810M','B860','Z890'] }, notRecommended: 'LGA 1851 CPUs are not recommended due to bad value (may change).'},
    { id: 'cpu-cu9-285k', name: 'Core Ultra 9 285K', brand: 'Intel', socket: 'LGA1851', ddr: 'DDR5', price: 3000, withStockCooler: false, specs: { cores: 24, threads: 28, base: 'N/A', boost: 'N/A', compatibility: ['H810M','B860','Z890'] }, notRecommended: 'LGA 1851 CPUs are not recommended due to bad value (may change).'},
  ],

  gpu: [
    { id: 'gpu-3050-6', name: 'NVIDIA RTX 3050 (6GB)', brand: 'NVIDIA', vram: '6GB', price: 900, image: 'https://m.media-amazon.com/images/I/81FKW3tqOsL._AC_SL1500_.jpg' },
    { id: 'gpu-5060', name: 'NVIDIA RTX 5060', brand: 'NVIDIA', vram: '8GB', price: 1700 },
    { id: 'gpu-5060ti-16', name: 'NVIDIA RTX 5060 Ti (16GB)', brand: 'NVIDIA', vram: '16GB', price: 2200 },
    { id: 'gpu-5060ti-8', name: 'NVIDIA RTX 5060 Ti (8GB)', brand: 'NVIDIA', vram: '8GB', price: 2500 },
    { id: 'gpu-5070', name: 'NVIDIA RTX 5070', brand: 'NVIDIA', vram: '12GB', price: 3600, image: 'https://m.media-amazon.com/images/I/71o+7Jf5r+L._AC_SL1500_.jpg' },
    { id: 'gpu-5070ti', name: 'NVIDIA RTX 5070 Ti', brand: 'NVIDIA', vram: '16GB', price: 4200 },
    { id: 'gpu-5080', name: 'NVIDIA RTX 5080', brand: 'NVIDIA', vram: '16GB', price: 7000 },
    { id: 'gpu-5090', name: 'NVIDIA RTX 5090', brand: 'NVIDIA', vram: '24GB', price: 12000 },

    { id: 'gpu-7900xt', name: 'AMD RX 7900 XT', brand: 'AMD', vram: '20GB', price: 3200 },
    { id: 'gpu-9070', name: 'AMD RX 9070', brand: 'AMD', vram: '16GB', price: 3300 },
    { id: 'gpu-9070xt', name: 'AMD RX 9070 XT', brand: 'AMD', vram: '20GB', price: 3900 },
  ],

  ram: [
    // DDR4 options (AM4 and LGA1700 DDR4)
    { id: 'ram-d4-16', name: 'DDR4 16GB (2x8)', price: 200, type: 'DDR4', speed: '3200 MHz', cl: 'CL16' },
    { id: 'ram-d4-32', name: 'DDR4 32GB (2x16)', price: 320, type: 'DDR4', speed: '3200 MHz', cl: 'CL16' },
    { id: 'ram-d4-64', name: 'DDR4 64GB (2x32)', price: 650, type: 'DDR4', speed: '3200 MHz', cl: 'CL16' },
    // DDR5 options (AM5, LGA1851, LGA1700 DDR5)
    { id: 'ram-d5-32', name: 'DDR5 32GB (2x16)', price: 550, type: 'DDR5', speed: '6000 MHz', cl: 'CL30', image: 'https://m.media-amazon.com/images/I/71kQhQqVwzL._AC_SL1500_.jpg' },
    { id: 'ram-d5-64', name: 'DDR5 64GB (2x32)', price: 1000, type: 'DDR5', speed: '6000 MHz', cl: 'CL30' },
  ],

  ssd: [
    { id: 'ssd-1tb', name: 'NVMe SSD 1TB', price: 300, image: 'https://m.media-amazon.com/images/I/61y7yYF8kPL._AC_SL1500_.jpg' },
    { id: 'ssd-2tb', name: 'NVMe SSD 2TB', price: 520 },
    { id: 'ssd-4tb', name: 'NVMe SSD 4TB', price: 1100 },
  ],

  case: [
    { id: 'case-montech-xr', name: 'Montech XR', price: 240, form: 'ATX' },
    { id: 'case-montech-sky-two', name: 'Montech Sky Two', price: 420, form: 'ATX' },
    { id: 'case-montech-air-100', name: 'Montech Air 100', price: 240, form: 'M-ATX' },
    { id: 'case-nzxt-h6-argb', name: 'NZXT H6 Flow ARGB', price: 650, form: 'ATX', image: 'https://m.media-amazon.com/images/I/71B0Jb2QpSL._AC_SL1500_.jpg' },
    { id: 'case-nzxt-h7-argb', name: 'NZXT H7 Flow 2024 ARGB', price: 650, form: 'ATX' },
    { id: 'case-antec-p120', name: 'Antec Performance Series P120', price: 650, form: 'ATX' },
    { id: 'case-antec-1ft', name: 'Antec Performance 1 FT', price: 750, form: 'ATX' },
    { id: 'case-cm-520', name: 'Cooler Master MasterBox 520', price: 420, form: 'ATX' },
    { id: 'case-lianli-216', name: 'Lian Li Lancool 216', price: 550, form: 'ATX' },
  ],

  cooler: [
    { id: 'cooler-stock', name: 'Stock Cooler', price: 0, type: 'stock' },
    { id: 'cooler-single-air', name: 'Single Tower Air Cooler', price: 120, type: 'air' },
    { id: 'cooler-dual-air', name: 'Dual Tower Air Cooler', price: 270, type: 'air' },
    { id: 'cooler-aio-360', name: '360mm AIO Water Cooler (no ARGB)', price: 500, type: 'aio' },
    { id: 'cooler-aio-360-argb', name: '360mm AIO Water Cooler (ARGB)', price: 600, type: 'aio', image: 'https://m.media-amazon.com/images/I/61H5D4lLZFL._AC_SL1500_.jpg' },
  ],

  motherboard: [
    // AMD AM4
    { id: 'mb-b550-matx', name: 'B550 (M-ATX)', price: 500, brand: 'AMD', socket: 'AM4', form: 'M-ATX' },
    { id: 'mb-b550-atx', name: 'B550 (ATX)', price: 600, brand: 'AMD', socket: 'AM4', form: 'ATX' },
    // AMD AM5
    { id: 'mb-b650-atx', name: 'B650 (ATX)', price: 750, brand: 'AMD', socket: 'AM5', form: 'ATX', image: 'https://m.media-amazon.com/images/I/81Qxv4r9t1L._AC_SL1500_.jpg' },
    { id: 'mb-x670-atx', name: 'X670 (ATX)', price: 1150, brand: 'AMD', socket: 'AM5', form: 'ATX' },
    { id: 'mb-x870-atx', name: 'X870 (ATX)', price: 1250, brand: 'AMD', socket: 'AM5', form: 'ATX' },
    // Intel LGA1700 DDR4
    { id: 'mb-h610-matx', name: 'H610 (M-ATX)', price: 450, brand: 'Intel', socket: 'LGA1700', ddr: 'DDR4', form: 'M-ATX' },
    { id: 'mb-b660-matx-d4', name: 'B660 (M-ATX)', price: 600, brand: 'Intel', socket: 'LGA1700', ddr: 'DDR4', form: 'M-ATX' },
    { id: 'mb-b660-atx-d4', name: 'B660 (ATX)', price: 650, brand: 'Intel', socket: 'LGA1700', ddr: 'DDR4', form: 'ATX' },
    { id: 'mb-b760-matx-d4', name: 'B760 (M-ATX)', price: 700, brand: 'Intel', socket: 'LGA1700', ddr: 'DDR4', form: 'M-ATX' },
    { id: 'mb-b760-atx-d4', name: 'B760 (ATX)', price: 750, brand: 'Intel', socket: 'LGA1700', ddr: 'DDR4', form: 'ATX' },
    { id: 'mb-z790-atx-d4', name: 'Z790 (ATX)', price: 900, brand: 'Intel', socket: 'LGA1700', ddr: 'DDR4', form: 'ATX' },
    // Intel LGA1700 DDR5
    { id: 'mb-b660-matx-d5', name: 'B660 (M-ATX)', price: 600, brand: 'Intel', socket: 'LGA1700', ddr: 'DDR5', form: 'M-ATX' },
    { id: 'mb-b660-atx-d5', name: 'B660 (ATX)', price: 650, brand: 'Intel', socket: 'LGA1700', ddr: 'DDR5', form: 'ATX' },
    { id: 'mb-b760-matx-d5', name: 'B760 (M-ATX)', price: 700, brand: 'Intel', socket: 'LGA1700', ddr: 'DDR5', form: 'M-ATX' },
    { id: 'mb-b760-atx-d5', name: 'B760 (ATX)', price: 750, brand: 'Intel', socket: 'LGA1700', ddr: 'DDR5', form: 'ATX' },
    { id: 'mb-z790-atx-d5', name: 'Z790 (ATX)', price: 1100, brand: 'Intel', socket: 'LGA1700', ddr: 'DDR5', form: 'ATX' },
    // Intel LGA1851
    { id: 'mb-h810m-matx', name: 'H810M (M-ATX)', price: 650, brand: 'Intel', socket: 'LGA1851', ddr: 'DDR5', form: 'M-ATX' },
    { id: 'mb-b860-matx', name: 'B860 (M-ATX)', price: 750, brand: 'Intel', socket: 'LGA1851', ddr: 'DDR5', form: 'M-ATX' },
    { id: 'mb-b860-atx', name: 'B860 (ATX)', price: 850, brand: 'Intel', socket: 'LGA1851', ddr: 'DDR5', form: 'ATX' },
    { id: 'mb-z890-atx', name: 'Z890 (ATX)', price: 1200, brand: 'Intel', socket: 'LGA1851', ddr: 'DDR5', form: 'ATX' },
  ],

  psu: [
    { id: 'psu-650', name: '650W PSU', watt: 650, price: 300 },
    { id: 'psu-750', name: '750W PSU', watt: 750, price: 450 },
    { id: 'psu-850', name: '850W PSU', watt: 850, price: 650 },
    { id: 'psu-1000', name: '1000W PSU', watt: 1000, price: 850 },
    { id: 'psu-1200', name: '1200W PSU', watt: 1200, price: 1000 },
  ],

  optional: [
    { id: 'opt-braided', name: 'Braided cable extensions', price: 200 },
    { id: 'opt-rgb-fans', name: 'RGB Case fans', price: 200 },
  ],
};

// PSU auto-selection based on GPU and extreme CPUs
function selectPsuId(gpuId, cpuId) {
  const extremeCpu = cpuId === 'cpu-i9-14900k' || cpuId === 'cpu-cu9-285k';
  const lowSet = new Set(['gpu-3050-6','gpu-5060','gpu-5060ti-16','gpu-5060ti-8']);
  const midSet = new Set(['gpu-5070','gpu-9070']);
  const highSet = new Set(['gpu-5070ti','gpu-7900xt','gpu-9070xt']);
  const ultraSet = new Set(['gpu-5080','gpu-5090']);
  if (lowSet.has(gpuId)) return extremeCpu ? 'psu-850' : 'psu-650';
  if (midSet.has(gpuId)) return extremeCpu ? 'psu-1000' : 'psu-750';
  if (highSet.has(gpuId)) return extremeCpu ? 'psu-1000' : 'psu-850';
  if (ultraSet.has(gpuId)) return extremeCpu ? 'psu-1200' : 'psu-1000';
  return null;
}

// Export
NeonRig.catalog = catalog;
NeonRig.selectPsuId = selectPsuId;


