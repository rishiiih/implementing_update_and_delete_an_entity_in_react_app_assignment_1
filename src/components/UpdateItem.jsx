import { useState, useEffect } from "react";

const UpdateItem = () => {
    const [item, setItem] = useState(null);
    const [updatedName, setUpdatedName] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const API_URI = `http://${import.meta.env.VITE_API_URI}/doors/1`; // Fetching a specific item

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await fetch(API_URI);
                if (!response.ok) throw new Error("Failed to fetch item");
                const data = await response.json();
                setItem(data);
                setUpdatedName(data.name); // Assuming the item has a "name" field
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchItem();
    }, [API_URI]);

    const handleInputChange = (e) => {
        setUpdatedName(e.target.value);
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(API_URI, {
                method: "PUT", // or PATCH if partial update
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: updatedName }),
            });
            if (!response.ok) throw new Error("Failed to update item");
            const updatedData = await response.json();
            setItem(updatedData);
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Update Item</h2>
            {item && (
                <div>
                    <p>Current Name: {item.name}</p>
                    <input
                        type="text"
                        value={updatedName}
                        onChange={handleInputChange}
                    />
                    <button onClick={handleUpdate}>Update</button>
                </div>
            )}
        </div>
    );
};

export default UpdateItem;