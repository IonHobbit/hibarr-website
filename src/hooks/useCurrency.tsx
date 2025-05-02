type useCurrencyProps = {
  currency?: 'GBP' | 'USD' | 'EUR' | 'AED' | 'TRY'
  amount?: number
}

export default function useCurrency(price?: useCurrencyProps) {
  const { amount, currency } = price || { amount: 0, currency: 'GBP' };

  return amount?.toLocaleString('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}
