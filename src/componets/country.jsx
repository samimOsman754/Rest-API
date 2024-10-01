import React, { useState } from "react";

const output = ({ country, handleCountry }) => {
  //Toggling
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [toggle,setToggle] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [visited, setVisited] = useState(false);

  const handleButtonClick = () => {
    setToggle(!toggle);
    handleCountry(country)
    setVisited(true);
  }

  return (
    <div className="border-2 bg-gray-200 p-5 shadow-lg rounded-lg w-64 h-70">
      <div className="flex flex-col justify-between h-full">
        <div className="space-y-3">
          <h1 className="text-xl font-bold">{country?.name?.common}</h1>
          <img
            className="w-60 "
            src={country?.flags?.svg}
            alt={country?.flags?.alt}
          />
          <h2>
            <span className="font-semibold">Capital: </span>
            {country?.capital}
          </h2>
          <h3>
            <span className="font-semibold">Population: </span>
            {country?.population}
          </h3>
        </div>
        <div>
          <button
            className={`px-4 py-2 w-full font-semibold text-white rounded-md ${
             visited ? 'bg-red-500 cursor-not-allowed' : 'bg-gray-500 hover:bg-blue-700'
            }`} disabled={visited}
           
            onClick={handleButtonClick}
            
          >
            {
              toggle? "Visited" : "Details"
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default output;
