type FormatCurrencyProps = {
  currency?: 'GBP' | 'USD' | 'EUR' | 'AED' | 'TRY'
  amount?: number
}

export function formatCurrency(price?: string) {
  if (!price) return undefined;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number(price));
}
