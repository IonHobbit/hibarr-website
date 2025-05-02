type FormatCurrencyProps = {
  currency?: 'GBP' | 'USD' | 'EUR' | 'AED' | 'TRY'
  amount?: number
}

export function formatCurrency(price?: FormatCurrencyProps) {
  if (!price?.amount) return undefined;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: price.currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price.amount);
}
