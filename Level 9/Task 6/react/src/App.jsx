import React, { useState, useMemo, useCallback } from "react";
import "./App.css";


const findPrimes = (limit) => {
  console.log("Calculating primes...");
  const primes = [];
  for (let num = 2; num <= limit; num++) {
    let isPrime = true;
    for (let i = 2; i * i <= num; i++) {
      if (num % i === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) primes.push(num);
  }
  return primes;
};

const PrimeCalculator = () => {
  const [limit, setLimit] = useState(100);
  const [count, setCount] = useState(0);

  // Memoizing the result of the expensive calculation
  const primeNumbers = useMemo(() => findPrimes(limit), [limit]);

  // Memoizing event handlers
  const incrementCount = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  return (
    <div className="container">
      <h1>Prime Number Finder</h1>
      <input
        type="number"
        value={limit}
        onChange={(e) => setLimit(Number(e.target.value))}
      />
      <p>Primes up to {limit}:</p>
      <p>{primeNumbers.join(", ")}</p>
      <button onClick={incrementCount}>Re-render Counter: {count}</button>
    </div>
  );
};

export default PrimeCalculator;
