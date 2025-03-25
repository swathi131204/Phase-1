
const array1 = [1, 2, 3];
const array2 = [4, 5, 6];

const combinedArray = [...array1, ...array2];
console.log("Combined Array:", combinedArray);

const object1 = { name: "Ashwanth", age: 23 };
const object2 = { city: "Theni", country: "India" };

const combinedObject = { ...object1, ...object2 };
console.log("Combined Object:", combinedObject);

const copiedArray = [...array1];
copiedArray.push(10);
console.log("Original Array:", array1);
console.log("Modified Copy:", copiedArray);
