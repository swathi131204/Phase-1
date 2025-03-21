import React, { useState, useEffect } from "react";

function fetchData(callback) {
    setTimeout(() => {
        const mockData = [
            { id: 1, name: "Swathi" },
            { id: 2, name: "Sriram" },
            { id: 3, name: "Swetha" }
        ];
        callback(mockData);
    }, 2000);
}

const CallbackExample = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData((fetchedData) => {
            console.log("Data received:", fetchedData);
            setData(fetchedData); 
        });
    }, []);

    return (
        <div>
            <h2>Fetched Data:</h2>
            {data.length === 0 ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {data.map((item) => (
                        <li key={item.id}>{item.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CallbackExample;

