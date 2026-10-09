import { expect, test } from 'vitest'
import { shippingFee } from '../src/shipping'

test('free shipping starts at exactly 100', () => {
  expect(shippingFee(100)).toBe(0)
})
