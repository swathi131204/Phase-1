
const numbers = Array.from({ length: 10 }, (_, i) => i + 1);

const squaredNumbers = numbers.map(num => num ** 2);

const oddNumbers = numbers.filter(num => num % 2 !== 0);
const sumOfNumbers = numbers.reduce((sum, num) => sum + num, 0);

console.log("Number and its Square Root:");
numbers.forEach(num => console.log(`Number: ${num}, Square Root: ${Math.sqrt(num)}`));

console.log("Original Array:", numbers);
console.log("Squared Numbers:", squaredNumbers);
console.log("Odd Numbers:", oddNumbers);
console.log("Sum of Numbers:", sumOfNumbers);
