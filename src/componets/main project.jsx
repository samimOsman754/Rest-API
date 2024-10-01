import { useEffect, useState } from "react";
import Country from "./country";
import Header from "./header";
// import Footer from "./footer";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      const fetchData = await fetch("https://restcountries.com/v3.1/all");
      const data = await fetchData.json();

      // Exclude countries in Americas, Europe, India, and Israel
      const filteredData = data.filter((country) => {
        const excludedRegion = ["Americas", "Europe"];
        const excludedCountries = ["India", "Israel"];

        return (
          !excludedRegion.includes(country.region) &&
          !excludedCountries.includes(country.name.common)
        );
      });

      setCountries(filteredData);
      setFilteredCountries(filteredData);
    };
    fetchCountries();
  }, []);

  const handleCountry = (country) => {
    const countryCurrencies = Object.entries(country?.currencies || {}).map(
      (currency) => {
        const [code, { name, symbol }] = currency;
        return { code, name, symbol };
      }
    );

    setCountry({
      ...country,
      flag: country?.flags?.svg,
      population: country?.population,
      region: country?.region,
      capital: country?.capital?.[0],
      currency: countryCurrencies,
    });

    setIsModalOpen(true);
  };

  //Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  //Handle search input
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(value)
    );
    setFilteredCountries(filtered);
  };

  return (
    <>
      <Header handleSearch={handleSearch} searchTerm={searchTerm} />
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-90 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-gray-200 p-5 pl-14 rounded-lg max-w-xl  shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold  shadow-lg p-2 text-gray-800 ">{country?.name?.common}</h2>
              <button
                className="text-gray-500 hover:text-gray-800 bg-red-400 w-10 h-10 rounded-full"
                onClick={closeModal}
              >
                X
              </button>
            </div>
            <div className="mt-4 space-y-2 ">
              <img className="w-1/2" src={country?.flag} alt="Country flag" />
              <p>
                <strong>Population:</strong> {country?.population}
              </p>
              <p>
                <strong>Region:</strong> {country?.region}
              </p>
              <p>
                <strong>Capital:</strong>{" "}
                {country?.capital ? country?.capital : "Capital not available"}
              </p>
            </div>

            {/* Display Currency Dynamically */}
            <div className="mt-1 flex gap-1">
              <strong>Currency:</strong>
              <ul>
                {country?.currency?.length > 0 ? (
                  country.currency.map(({ code, name, symbol }) => (
                    <li key={code}>
                      {name} ({symbol}) - {code}
                    </li>
                  ))
                ) : (
                  <p>Currency not available</p>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Country list */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:mx-6 pl-16  mt-20 ">
        {filteredCountries
          .sort((a, b) => b.population - a.population)
          .map((country) => (
            <Country
              key={country.ccn3}
              country={country}
              handleCountry={handleCountry}
            />
          ))}
      </div>
      {/* Footer section */}
    </>
  );
};

export default Countries;
