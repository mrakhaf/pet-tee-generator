'use client'
import React, { useState, useEffect } from 'react';

const ImageHistoryList = () => {
  const [imageHistory, setImageHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImageHistory = async () => {
      try {
        const response = await fetch('/api/history');
        const data = await response.json();

        setImageHistory(data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching image history:', error);
        setLoading(false);
      }
    };

    fetchImageHistory();
   
  }, []);


  return (
   <div className="max-w-md mx-auto p-4">
    <h1 className="text-3xl font-bold mb-4">Image History</h1>
    {loading ? (
      <p className="text-gray-600">Loading...</p>
    ) : (
      <ul className="list-none p-0 m-0">
        {
          imageHistory.length === 0 ? (
            <p className="text-gray-600">No image history found.</p>
          ) : (
            imageHistory.map((history) => (
              <li key={history.id} className="flex items-center p-8 border-b border-gray-200">
                <img
                  src={history.imageUrl}
                  alt="Generated Image"
                  className="w-32 h-32 object-cover rounded mr-8"
                />
                <div>
                  <h2 className="text-lg font-semibold mb-2">Animal</h2>
                  <p className="text-gray-600 text-lg">{history.animal}</p>
                  <br />
                  <h2 className="text-lg font-semibold mb-2">Slogan</h2>
                  <p className="text-gray-600 text-lg">{history.slogan}</p>
                </div>
              </li>
            ))
          )
        }
      </ul>
    )}

    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
      <a href="/">Back to Home</a>
    </button>
  </div>
  );
};

export default ImageHistoryList;