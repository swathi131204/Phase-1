
const product = {
    name: "Laptop",
    price: 65000,
    category: "Electronics",
    inStock: false
};

const { name, price, category, inStock } = product;


console.log("Destructured Values:");
console.log("Name:", name);
console.log("Price:", price);
console.log("Category:", category);
console.log("In Stock:", inStock);

function formatProductDetails({ name, price, category, inStock }) {
    return `Product: laptop\nCategory: electronics\nPrice: 65000\nAvailable: ${inStock ? "Yes" : "No"}`;
}


console.log("\nFormatted Product Details:");
console.log(formatProductDetails(product));
