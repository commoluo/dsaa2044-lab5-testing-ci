import { shippingFee } from '../src/shipping.ts'

console.log('DSAA 2044 Lab 5: the shipping-fee program')
console.log('Rule: below 100 costs 10; 100 or more costs 0.')
console.table([0, 50, 99, 100, 101].map(amount => ({
  amount,
  shippingFee: shippingFee(amount),
})))

try {
  shippingFee(-1)
} catch (error) {
  console.log(`Invalid input -1: ${error.name}: ${error.message}`)
}

console.log('\nThis display calls the function. Run npm test to check assertions.')
