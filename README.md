# InfinityPlus
A simple big number library that shouldnt be hard to understand.
## Documentation
I shall teach you how to use InfinityPlus, but first:
## How to install
in the terminal, use `npm install infinityplus`, then, in a js file, write
```js
import InfinityPlus from "infinityplus"
```
## Instanciating the InfinityPlus class
This is quite simple but its different from Break_infinity.js
To create an infinityplus class instance:
```js
import InfinityPlus from "infinityplus"
let variable = new InfinityPlus(2,9)
```
The first number in the Constructor is the mantissa and the second number is the exponent
Once you do this you can do:
```js
console.log(variable.mantissa) // to see mantissa
console.log(variable.exponent) // to see exponent
console.log(variable.number) // to see the full number, you can also use console.log(variable.seeNumber())
```
# InfinityPlus methods
## .fix()
```js
variable.fix() 
```
This method is used to increase the exponent when the mantissa goes above 10,
you can just call the method as it does all the necessary calculations.
**Returns a Promise that contains an array that contains the mantissa and exponent after using fix()** (like [mantissa, exponent])
## .rfix()
```js
variable.rfix()
```
This method is used to decrease the exponent when the mantissa is below 1, just call the method and it does everything necessary. **Also returns a Promise that contains an array that contains the mantissa and exponent after using rfix()**
## await .add(mantissa, exponent) (async)
from this point on, some methods are async to protect the browser and wait for fix() and rfix(), if using any async methods. ***PLEASE USE AWAIT***
```js
// dont forget to put await
let num = new InfinityPlus(1,5)
await num.add(4,4) // 1e5 + 4e4
console.log(num.number) // 1.40e5

let num2 = new InfinityPlus(3,5)
await num2.add(num.mantissa, num.exponent) // 3e5 + 1.40e5
console.log(num2.number) // 4.40e5
```
`add()` accepts 2 parameters: `add(mantissa, exponent)`. This adds 2 numbers from InfinityPlus. You can either put values in or use values from another instance of InfinityPlus, for more understanding, refer to the example above.**Returns an array containing the mantissa and exponent after the operation([mantissa, exponent])**
## await .subtract(mantissa, exponent) (async)
```js
let num = new InfinityPlus(1,5)
await num.subtract(4,4) // 1e5 - 4e4
console.log(num.number) // 6e4

let num2 = new InfinityPlus(3,5)
await num2.subtract(num.mantissa, num.exponent) // 3e5 - 6e4
console.log(num2.number) // 2.40e5
```
`subtract()` accepts 2 parameters: `subtract(mantissa, exponent)` this minuses 2 numbers from InfinityPlus, you can manually input values into the method or use values from another instance of InfinityPlus, for more understanding, refer to the above example.**Returns an array containing the mantissa and exponent after the operation([mantissa, exponent])**
## await .multiply(mantissa, exponent) (async)
```js
let num = new InfinityPlus(1,432)
await num.multiply(1,100) // 1e432 * 1e100
console.log(num.number) // 1e532

let num2 = new InfinityPlus(3,500)
await num2.multiply(num.mantissa, num.exponent) // 3e500 * 1e532
console.log(num2.number) // 3e1032
```
`multiply()` accepts 2 parameters: `multiply(mantissa, exponent)` this multiplies 2 numbers from InfinityPlus, you can manually input values into the method or use values from another instance of InfinityPlus, for more understanding, refer to the above example.**Returns an array containing the mantissa and exponent after the operation([mantissa, exponent])**
## await .divide(mantissa, exponent) (async)
```js
let num = new InfinityPlus(1,432)
await num.divide(1,60) // 1e432 / 1e60
console.log(num.number) // 1e372

let num2 = new InfinityPlus(3,500)
await num2.divide(num.mantissa, num.exponent) // 3e500 / 1e372
console.log(num2.number) // 3e128
```
`divide()` accepts 2 parameters: `divide(mantissa, exponent)` this divides 2 numbers from InfinityPlus, you can manually input values into the method or use values from another instance of InfinityPlus, for more understanding, refer to the above example.**Returns an array containing the mantissa and exponent after the operation([mantissa, exponent])**
## await .power(exponent) (async)
```js
let num = new InfinityPlus(1,432)
await num.power(2) // 1e432 squared
console.log(num.number) // 1e864
```
power(exponent) accepts an exponent and raises the InfinityPlus number with the exponent.**Returns an array containing the mantissa and exponent after the operation([mantissa, exponent])**
## await .root(n) (async)
```js
let num = new InfinityPlus(1,432)
await num.root(2) // square root of 1e432
console.log(num.number) // 1e216
```
root(n) takes 1 argument, n, takes the n-th root of a InfinityPlus number. yes that also means:
```js
let num = new InfinityPlus(1,10000)
await num.root(1000) // 1000-th root of 1e10000
console.log(num.number) // 1e10
```
**Returns an array containing the mantissa and exponent after the operation([mantissa, exponent])**
## .log10()
```js
let num = new InfinityPlus(3,90)
let result = num.log10() // log10(3e90)
console.log(result) // log10(3e90) = 90.47712125471966
```
**Note that .log10(), .ln() and .log2() isnt async**, .log10() returns the log10 of a InfinityPlus number
## .ln()
```js
let num = new InfinityPlus(3,90)
let result = num.ln() // ln(3e90)
console.log(result) // ln(3e90) = 208.33127065813224
```
.ln() returns the natural log of a InfinityPlus number
## .log2()
```js
let num = new InfinityPlus(3,90)
let result = num.log2() // log2(3e90)
console.log(result) // log2(3e90) = 300.5584910405837
```
.log2() returns the log2 of a InfinityPlus number
## await .abs() (async)
```js
let num = new InfinityPlus(-5,10)
await num.abs()
console.log(num.number) // 5e10
```
.abs() turns an InfinityPlus number into its absolute value. **Returns a mantissa,exponent array**
## .lessThan(mantissa, exponent)
```js
let num = new InfinityPlus(3,90)
console.log(num.lessThan(5,45)) // 3e90 < 5e45 = false
console.log(num.lessThan(2,92)) // 3e90 < 2e92 = true
```
Checks if the InfinityPlus number on the left is less than the number on the right, not async.**Returns true or false**
## .greaterThan(mantissa, exponent)
```js
let num = new InfinityPlus(3,90)
console.log(num.greaterThan(5,45)) // 3e90 > 5e45 = true
console.log(num.greaterThan(2,92)) // 3e90 > 2e92 = false
```
Checks if the InfinityPlus number on the left is greater than the number on the right, not async. **Returns true or false**
## .equalTo(mantissa, exponent)
```js
let num = new InfinityPlus(3,90)
console.log(num.equalTo(3,90)) // 3e90 === 3e90 = true
console.log(num.equalTo(2,92)) // 3e90 === 2e92 = false
```
Checks if the InfinityPlus number on the left is equal to the number on the right, not async. **Returns true or false**
### Creating less than or equal to and greater than or equal to 
```js
// less than or equal to
let num = new InfinityPlus(2,89) // 2e89
console.log(num.lessThan(2,89) || num.equalTo(2,89)) // true, this is 2e89 <= 2e89

// greater than or equal to
let num2 = new InfinityPlus(1,897)
console.log(num2.greaterThan(1,765) || num2.equalTo(1,765)) // true, this is 1e897 >= 1e765
```
This can also be used in conditional statements
## await .floor() (async)
```js
let num = new InfinityPlus(3.87,70)
await num.floor()
console.log(num.number) // 3e70 (3.87e70 -> 3e70)
```
This rounds down an InfinityPlus number.**Returns [mantissa, exponent]** 
## await .ceiling() (async)
```js
let num = new InfinityPlus(3.32,70)
await num.ceiling()
console.log(num.number) // 4e70 (3.32e70 -> 4e70)
```
This rounds up an InfinityPlus number.**Returns [mantissa, exponent]**
## await round() (async)
```js
let num = new InfinityPlus(2.7,90)
await num.round() 
console.log(num.number) // 2e90

let num2 = new InfinityPlus(6.2, 34)
await num2.round() 
console.log(num2.number) // 7e34

let num3 = new InfinityPlus(5.5, 22)
await num3.round() 
console.log(num3.number) // 6e22
```
.round() rounds a number to the nearest mantissa. if the mantissa is less than 5.50, it rounds down and if the mantissa is >= 5.50, it rounds up.
## .seeNumber()
```js
let num = new InfinityPlus(3,7832)
number = num.seeNumber()
console.log(number) // 3e7832
```
seeNumber() returns the value of the .number property.
## .toNumber()
```js
let num = new InfinityPlus(3,90)
number = num.toNumber()
console.log(number) // 3e+90
```
.toNumber() turns an InfinityPlus number into the native js Number type if the InfinityPlus number is less than 1.79e308. If the number is higher than 1.79e308, .toNumber() returns null because converting would give Infinity, use .seeNumber() or .number to see numbers beyond infinity
# Things to note
- Since the Constructor takes 2 arguments, **every InfinityPlus number must be created in scientific notation**, use .toNumber() to convert it if its below 1.79e308.
- You can't chain operations because of returning a result or an array
- Don't forget to use await for all async operations for consistency
- All methods except .log10(), .ln(), .log2(), .lessThan(), .greaterThan(), .equalTo(), .toNumber() and .seeNumber() automatically use .fix() and .rfix() so there is so need to use .fix() and .rfix() again
