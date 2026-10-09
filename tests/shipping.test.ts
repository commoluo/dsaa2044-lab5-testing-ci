import { describe, expect, test } from 'vitest'
import { shippingFee } from '../src/shipping'

describe('shippingFee', () => {
  test('zero is a valid amount and costs 10', () => {
    expect(shippingFee(0)).toBe(10)
  })

  test('orders below the threshold cost 10', () => {
    expect(shippingFee(50)).toBe(10)
  })

  test('99 is below the free-shipping threshold', () => {
    expect(shippingFee(99)).toBe(10)
  })

  test('free shipping starts at 100', () => {
    expect(shippingFee(100)).toBe(0)
  })

  test('101 is above the free-shipping threshold', () => {
    expect(shippingFee(101)).toBe(0)
  })

  test('negative amounts are invalid', () => {
    expect(() => shippingFee(-1)).toThrow(RangeError)
  })
})
