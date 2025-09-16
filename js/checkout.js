// Render cart summary on checkout page
document.addEventListener('DOMContentLoaded', () => {
  const direct = JSON.parse(localStorage.getItem('neonrig_checkout') || 'null');
  const cart = direct || JSON.parse(localStorage.getItem('neonrig_cart') || '[]');
  const root = document.getElementById('checkoutItems');
  const totalEl = document.getElementById('checkoutTotal');
  if (!root || !totalEl) return;
  if (cart.length === 0) {
    root.innerHTML = '<div class="muted">Your cart is empty.</div>';
    totalEl.textContent = '0 SAR';
    return;
  }
  root.innerHTML = cart.map(item => `
    <div class="item">
      <div>
        <div><strong>${item.name}</strong></div>
        <div class="muted">${item.meta}</div>
      </div>
      <div class="price">${item.qty} × ${item.price} = ${item.qty * item.price} SAR</div>
    </div>
  `).join('');
  const total = cart.reduce((s, x) => s + x.price * x.qty, 0);
  totalEl.textContent = `${total} SAR`;
  if (direct) {
    // Clear the one-time direct checkout payload after rendering
    localStorage.removeItem('neonrig_checkout');
  }
});


