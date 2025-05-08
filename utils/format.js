export function formatPrice(price, currency = 'EUR') {
  if (!price) return 'Kostenlos';
  
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency
  }).format(price);
}
