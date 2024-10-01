import React from 'react'

const header = ({searchTerm, handleSearch}) => {
  return (
    <>
    {/* Navbar with Search Bar */}
    <div className="flex justify-between items-center p-4 bg-gray-600 sticky top-0 z-50">
        <h1 className="text-3xl font-bold text-white">Country List</h1>
        <input 
        type="search"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search countries..."
        className="border-2 border-gray-300 rounded-md p-2" />
      </div>
    </>
  )
}

export default header