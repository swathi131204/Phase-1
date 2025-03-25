let person =  {
    name: "Swathi",
    age: 21,
    city: "Theni",
    hobbies: ["Dancing", "Traveling", "Singing"]
}

console.log("Nmae:", person.name);
console.log("age:", person.age);
console.log("city:", person.city);
console.log("hobbies:", person.hobbies.join(","));

person.age = 21;
console.log("updated Age:", person.age);

person.greet = function (){
    return 'Hello, my name is Swathi and Im a Web Developer.';
};

console.log(person.greet());

