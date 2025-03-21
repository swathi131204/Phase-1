import React from "react";
import useInput from "./useInput";

function ExampleComponent() {
    const inputProps = useInput("");

    return (
        <div>
            <input {...inputProps} placeholder="Type something..." />
            <p>Current Value: {inputProps.value}</p>
        </div>
    );
}

export default ExampleComponent;