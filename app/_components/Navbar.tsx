import React from 'react'

const Navbar = () => {
  return (
    <div className='w-full h-16 bg-blue-500 flex justify-start  items-center' > 
    <h1 className='ml-4 font-semibold text-white text-xl cursor-pointer rounded-md p-2 hover:text-neutral-200' >Login</h1>
    <h1 className='ml-4 font-semibold text-white text-xl cursor-pointer' > Please login/signup to continue </h1>
    </div>
  )
}

export default Navbar