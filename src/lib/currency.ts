type CurrencyProps = 'GBP' | 'USD' | 'EUR' | 'AED' | 'TRY';

export function formatCurrency(price: string, currency: CurrencyProps = 'EUR') {
  if (!price) return undefined;
  const normalized = price.trim().replace(/,/g, ''); const amount = Number(normalized);
  if (!Number.isFinite(amount)) return undefined;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
