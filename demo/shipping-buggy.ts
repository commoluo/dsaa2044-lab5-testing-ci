/** Intentionally faulty copy for the classroom failure demonstration. */
export function shippingFee(amount: number): number {
  if (!Number.isFinite(amount) || amount < 0) {
    throw new RangeError('Amount must be finite and non-negative')
  }

  // Deliberate bug: an order of exactly 100 should qualify.
  return amount > 100 ? 0 : 10
}
