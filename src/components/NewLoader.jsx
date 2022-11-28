import React from 'react'
import './NewLoader.css';
const NewLoader = () => {
  return (
    <div>
        <div className='fixed top-0 left-0 bottom-0 right-0 w-full h-full z-50 overflow-hidden bg-gray-300 opacity-10 flex flex-col items-center justify-center'>
           <div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
	          <h2 class="text-center text-white text-xl font-semibold">Loading...</h2>
	       <p class="w-1/3 text-center text-white">This may take a few seconds, please don't close this page.</p>
        </div>
    </div>
  )
}

export default NewLoader;