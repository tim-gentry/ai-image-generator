import { useState, useCallback } from 'react'
import './App.css'

function App() {
  const [prompt, setPrompt] = useState('')
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await fetch('http://localhost:5001/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json()

      if (response.ok) {
        console.log("response:", data)
        if (data && data.imageUrl) {
          setLoading(false)
          setImage(data.imageUrl)
        }
      } else {
        setLoading(false)
        alert(data.message || "Error generating image")
      }
    } catch (error) {
      console.log('Error:', error)
    }
  };

  const handlePromptChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value)
  }, [])

  return (
    <div className="App min-h-screen w-max">
      <header className="bg-gray-800 text-white py-4">
        <h1 className="text-center text-2xl font-bold">AI Image Generator</h1>
      </header>
      <div className="container mx-auto p-6">
        <div className="bg-gray-800 text-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
          <p className="text-center text-lg mb-6 text-gray-300">
            Enter a text prompt to generate an image
          </p>

          {image && (
            <div className="mb-6">
              <img
                src={image}
                alt="AI generated"
                className="w-full rounded-md border border-gray-700"
              />
            </div>
          )}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <textarea
              value={prompt}
              onChange={handlePromptChange}
              placeholder="Describe your image"
              required
              className="w-full h-18 p-4 bg-gray-900 text-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <button
              type="submit"
              className="w-full py-3 bg-blue-900 text-white font-bold rounded-md hover:bg-blue-700 transition duration-200"
            >
              Generate Image
            </button>
            {loading && (
              <div className="flex items-center justify-center mt-4">
                <svg
                  className="animate-spin h-6 w-6 text-blue-500 mr-2"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
                <span className="text-blue-500">Generating image...</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

export default App
