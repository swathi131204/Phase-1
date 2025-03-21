import React from "react";
import useLocalStorage from "./useLocalStorage";

function ExampleComponent() {
    const [name, setName] = useLocalStorage("username", "");

    return (
        <div>
            <h2>Persistent Input</h2>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
            />
            <p>Stored Name: {name}</p>
        </div>
    );
}

export default ExampleComponent;

