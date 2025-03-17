import React, { useEffect, useState } from "react";

const API_URL = "https://jsonplaceholder.typicode.com/users";

function App() {
    const [students, setStudents] = useState([]);
    const [student, setStudent] = useState({ name: "", email: "" });
    const [editing, setEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    // Fetch students
    const fetchStudents = async () => {
        const res = await fetch(API_URL);
        const data = await res.json();
        setStudents(data);
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    // Create or Update student
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editing) {
            await fetch(`${API_URL}/${editId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(student),
            });
            setEditing(false);
            setEditId(null);
        } else {
            const res = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(student),
            });
            const newStudent = await res.json();
            setStudents([...students, newStudent]);
        }
        setStudent({ name: "", email: "" });
    };

    // Delete student
    const handleDelete = async (id) => {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        setStudents(students.filter((stu) => stu.id !== id));
    };

    // Edit student
    const handleEdit = (stu) => {
        setStudent({ name: stu.name, email: stu.email });
        setEditing(true);
        setEditId(stu.id);
    };

    return (
        <div className="App">
            <h1>CURD Operations </h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" value={student.name} onChange={(e) => setStudent({ ...student, name: e.target.value })} required />
                <input type="email" placeholder="Email" value={student.email} onChange={(e) => setStudent({ ...student, email: e.target.value })} required />
                <button type="submit">{editing ? "Update" : "Add"}</button>
            </form>
            <h2> List</h2>
            <ul>
                {students.map((stu) => (
                    <li key={stu.id}>
                        {stu.name} - {stu.email}
                        <button onClick={() => handleEdit(stu)}>Edit</button>
                        <button onClick={() => handleDelete(stu.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
