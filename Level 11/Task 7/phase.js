
let favoriteFoods = ["Pizza", "Burger", "chicken fry", "bread omlet", "sandwich"];
favoriteFoods.push("Ice Cream");
favoriteFoods.shift();
let arrayLength = favoriteFoods.length;

let pizzaIndex = favoriteFoods.indexOf("Pizza");

let slicedFoods = favoriteFoods.slice(1, 4);
console.log("Original Array after modifications:", favoriteFoods);
console.log("Length of the modified array:", arrayLength);
console.log("Index of pizza:", pizzaIndex);
console.log("Sliced Array (index 1 to 3):", slicedFoods);