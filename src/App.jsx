import React, { useState } from 'react'

export default function App() {

  const [results, setResults] = useState([]);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const res = await fetch("https://booklify-backend.vercel.app/api/analyze", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResults(data);
  };



  return (
    <section className='h-screen w-full'>
      <nav className='p-8 bg-orange-950'><h1 className='text-white font-extrabold text-4xl'>Booklify</h1></nav>
      <form onSubmit={handleSubmit} className='h-full md:h-4/5 w-full p-2 md:p-10 flex flex-col md:flex-row gap-10 md:gap-0'>
        {/* Input Picture */}

        <label className="w-full md:w-1/2 h-2/3 md:h-full border text-xl border-white bg-zinc-900 hover:bg-zinc-800 rounded-2xl p-4 text-white cursor-pointer flex items-center justify-center relative overflow-hidden">

          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="absolute inset-0 w-full h-full object-cover rounded-2xl"
            />
          ) : (
            "Choose Image"
          )}

          <input
            name="uploadedImage"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
            required
          />
        </label>

        <div className='w-full md:w-1/2 h-full'>
          {/* Interest Section */}
          <div className='w-full h-1/3 flex flex-col gap-4 md:ps-4'>
            <textarea required name="interests" id="" placeholder='Enter interests seperated by Comma.' className='border rounded-2xl p-4 h-full' />
            <button className='w-fit px-6 py-2 bg-orange-900 text-white font-bold rounded-lg hover:bg-blue-500 cursor-pointer'>Submit</button>
          </div>
          <div className='ps-4 pt-4 h-1/2'>
            {/* Result Window */}
            <h1>Results:</h1>
            <hr />
            <div className='h-full overflow-y-auto'>
              {
                results.length > 0 ? results.map((result, index) => {
                  return (
                    <div key={index} className='border rounded-lg p-4 my-4'>
                      <h2 className='text-xl font-bold'>{result.title}</h2>
                      <p>{result.description}</p>
                    </div>

                  )
                }) : <p >No results yet. Please upload an image and submit your interests.</p>
              }
            </div>
          </div>
        </div>
      </form>
    </section>


  )
}
