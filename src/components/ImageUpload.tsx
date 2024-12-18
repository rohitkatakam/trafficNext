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
            setPrediction(null);
            setImage(file);
            setCreateObjectURL(URL.createObjectURL(file));
        }
    };

    return  (
        <div className="bg-gray-300 p-6 rounded-lg shadow-md">
            <div className="flex flex-wrap items-start gap-4">
                <div className="flex-grow">
                    <form onSubmit={handleSubmit} className="flex items-center gap-4">
                        <label className="cursor-pointer bg-blue-500 text-gray-300 py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
                        Choose File
                        <input type="file" accept="image/png" onChange={handleFileChange} className="hidden" />
                        </label>
                        <button type="submit" disabled={loading || !image} className="bg-green-500 text-gray-300 py-2 px-4 rounded hover:bg-green-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                        {loading ? 'Uploading...' : 'Upload'}
                        </button>
                    </form>
                    {loading && <p className="mt-2 text-sky-800">Making prediction, may take a minute...</p>}
                    {prediction && (
                        <div className="mt-4 bg-gray-400 p-4 rounded-lg shadow-inner">
                        <p className="text-sky-800 font-[family-name:var(--font-geist-mono)] text-sm">
                            Prediction: {classIdMap[Number(prediction)]}
                        </p>
                        </div>
                    )}
                </div>
                {createObjectURL && (
                <div className="flex-shrink-0">
                    <img src={createObjectURL} alt="Upload Preview" className="max-w-xs rounded-lg shadow-md" />
                </div>
                )}
            </div>
        </div>
    );
};