import { expect, test } from 'vitest'
import { shippingFee } from './shipping-buggy'

test('free shipping starts at 100', () => {
  expect(shippingFee(100)).toBe(0)
})
