'use client'
import { useState } from 'react';
import RoundedLoading from './components/loading/rounded-loading';

export default function Home() {
  const [animal, setAnimal] = useState('');
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerateImage = async () => {
    if (!animal || !text) {
      setError('Please select an animal and provide some text');
      return;
    }

    if (animal.length > 16) {
      setError('Animal name should be less than 16 characters');
      return;
    }

    if (text.length > 20) {
      setError('Text should be less than 20 characters');
      return;
    }

    try {
      setImageUrl(null);
      setError(null);
      setLoading(true);
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ animal, text }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate image');
      }

      const data = await response.json();

      setImageUrl(data.data.image_url);

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[300px] p-4 border-2 border-orange-400 rounded-xl text-center">
      <h1 className="text-xl font-semibold text-orange-500 mb-4">Pet Tee Generator</h1>

      <select
        className="w-full p-2 border rounded mb-2"
        value={animal}
        onChange={(e) => setAnimal(e.target.value)}
      >
        <option value="">Select an animal</option>
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
        <option value="gorilla">Gorilla</option>
      </select>

      <input
        type="text"
        placeholder="Your text"
        className="w-full p-2 border rounded mb-2"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={handleGenerateImage}
        className="w-full p-2 border rounded mb-4 hover:bg-orange-100"
      >
        Generate Image
      </button>

      {/* button for page history */}
      <button
        onClick={() => window.location.href = '/history'}
        className="w-full p-2 border rounded mb-4 hover:bg-orange-100"
      >
        View History
      </button>

      {loading && 
      <div className="flex justify-center items-center">
        <RoundedLoading />
      </div>
      }
      {error && <p className="text-red-500">{error}</p>}

      {imageUrl && (
        <img src={imageUrl} alt="Generated" className="w-full rounded" />
      )}
    </div>
  );
}
