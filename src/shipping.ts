/** Simplified shipping rules for the DSAA-2044 teaching example. */
export function shippingFee(amount: number): number {
  if (!Number.isFinite(amount) || amount < 0) {
    throw new RangeError('Amount must be finite and non-negative')
  }

  return amount >= 100 ? 0 : 10
}
