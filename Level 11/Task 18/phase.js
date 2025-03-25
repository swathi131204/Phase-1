
const students = [
    { name: "Swetha", age: 22, grades: [85, 90, 78] },
    { name: "Sriram", age: 19, grades: [75, 80, 82] },
    { name: "Sarumathi", age: 21, grades: [95, 88, 92] },
    { name: "David", age: 18, grades: [60, 70, 65] },
    { name: "Balaji", age: 23, grades: [88, 76, 90] }
];

const studentNames = students.map(student => student.name);
console.log("Student Names:", studentNames);


const olderStudents = students.filter(student => student.age > 18);
console.log("Students older than 20:", olderStudents);


const totalGrades = students.reduce((sum, student) => {
    const avgGrade = student.grades.reduce((a, b) => a + b, 0) / student.grades.length;
    return sum + avgGrade;
}, 0);

const overallAverage = totalGrades / students.length;
console.log("Average Grade for All Students:", overallAverage.toFixed(2));


const avgGradeOlderStudents = students
    .filter(student => student.age > 20) 
    .map(student => student.grades.reduce((a, b) => a + b, 0) / student.grades.length) 
    .reduce((sum, avg) => sum + avg, 0) / olderStudents.length; 

console.log("Average Grade of Students Older Than 20:", avgGradeOlderStudents.toFixed(2));
