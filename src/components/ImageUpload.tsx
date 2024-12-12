"use client"
import React, { useState, ChangeEvent, FormEvent } from 'react';

const classIdMap: { [key: number]: string } = {
    0: "Speed limit (5km/h)",
    1: "Speed limit (40km/h)",
    2: "Speed limit (60km/h)",
    3: "Speed limit (80km/h)",
    4: "Don't go left",
    5: "Don't overtake from left",
    6: "No car",
    7: "No horn",
    8: "Keep right",
    9: "Watch out for cars",
    10: "Bicycles crossing",
    11: "Zebra Crossing",
    12: "No stopping",
    13: "No entry",
    14: "Unknown",
  };

export default function ImageUpload() {
    // return a form that allows user to upload image
    // have an upload button and a confirm button
    const [image, setImage] = useState<File | null>(null);
    const [createObjectURL, setCreateObjectURL] = useState<string | null>(null);
    const [prediction, setPrediction] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!image) {
            return;
        }
        setLoading(true);
        const formData = new FormData();
        formData.append('file', image);
        try {
            const response = await fetch('https://trafficrender.onrender.com/predict', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            if (response.ok) {
                setPrediction(data.class_id);
            }
            else {
                setPrediction('Error: ' + (data.error || 'unknown'));
            }
            console.log("success");
        } catch (error) {
            console.error('Upload failed: ', error);
            setPrediction('Error: failed to connect to backend');
        }
        finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);
            setCreateObjectURL(URL.createObjectURL(file));
        }
    };

    return  (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" accept="image/png" onChange={handleFileChange} />
                <button type="submit" disabled={loading}>Upload</button>
            </form>
            {createObjectURL && (
                <img src={createObjectURL} alt="Upload" width={200} />
            )}
            {loading && <p>Making prediction, may take a minute...</p>}
            {prediction && <p>Prediction: {classIdMap[prediction]}</p>}
        </div>
    );
};