import React, { useState, useEffect } from "react";

function fetchDataPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const mockData = [
                { id: 1, name: "Swathi" },
                { id: 2, name: "Sriram" },
                { id: 3, name: "Swetha" }
            ];
            resolve(mockData); 
        }, 2000);
    });
}

async function fetchDataAsync() {
    try {
        const data = await fetchDataPromise(); 
        console.log("Data received:", data);
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}

const AsyncAwaitExample = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const fetchedData = await fetchDataAsync();
            setData(fetchedData);
        }
        fetchData();
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

export default AsyncAwaitExample;
