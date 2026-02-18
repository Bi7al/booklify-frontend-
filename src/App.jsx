import React from 'react'

export default function App() {




  const [results, setResults] = React.useState();


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
    // Two Sections: 1.Upload Window, 2. Interest Window, 3. Result Window


    <form onSubmit={handleSubmit} className='h-screen w-full p-10 flex'>
      {/* Input Picture */}
      <label className="w-1/2 h-full border border-white bg-zinc-900 hover:bg-zinc-800 rounded-2xl p-4 text-white cursor-pointer flex items-center justify-center">
        Choose Image
        <input
          name='uploadedImage'
          type="file"
          accept="image/*"
          className="hidden"
        />
      </label>
      <div className='w-1/2 h-full'>
        {/* Interest Section */}
        <div className='w-full h-1/3 flex flex-col gap-4 ps-4'>
          <textarea name="interests" id="" placeholder='Enter interests seperated by Comma.' className='border rounded-2xl p-4 h-full' />
          <button className='w-fit px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 cursor-pointer'>Submit</button>
        </div>
        <div className='ps-4 pt-4 h-1/2'>
          {/* Result Window */}
          <h1>Results:</h1>
          <hr />
          <div className='h-full overflow-y-auto'>
            {
              results.map((result, index) => {
                return (
                  <div key={index} className='border rounded-lg p-4 my-4'>
                    <h2 className='text-xl font-bold'>{result.title}</h2>
                    <p>{result.description}</p>
                  </div>

                )
              })
            }
          </div>
        </div>
      </div>
    </form>


  )
}
