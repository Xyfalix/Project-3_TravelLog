import { useState } from 'react';
import { searchAttractions, addAttractionToBucketList } from '../../utilities/users-service'; // Update the path to your users-service.js file

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      // Call your searchAttractions function to search using Google Places API
      const attractions = await searchAttractions(searchInput);
      console.log("attractions", attractions);
      if (attractions) {
        // Update search results state with cities data
        setSearchResults(attractions);
      } else {
        console.error('Error searching attractions');
      }
    } catch (error) {
      console.error('Error performing search:', error);
    }
  };

  const handleAddToBucketList = async (attraction) => {
    try {
      // Call your addCityToBucketList function to add the city to the bucket list
      const addedAttraction = await addAttractionToBucketList(attraction);
      if (addedAttraction) {
        // Handle success (e.g., show a confirmation message)
        console.log(`Added "${addedAttraction.name}" to the bucket list`);
      } else {
        console.error('Error adding attraction to the bucket list');
      }
    } catch (error) {
      console.error('Error adding attraction to the bucket list:', error);
    }
  };

  const renderSearchResults = () => {
    if (searchResults.length === 0) {
      return <p>No results found.</p>;
    }

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          {searchResults.map((result) => (
            <div key={result.place_id} className="card w-96 bg-base-100 shadow-xl image-full">
              <figure><img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt={result.name} /></figure>
              <div className="card-body">
                <h2 className="card-title">{result.name}</h2>
                <p>{result.formatted_address}</p>
                <div className="card-actions justify-between">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleAddToBucketList(result)}
                  >
                    Add to Bucket List
                  </button>
                  <button className="btn btn-secondary">Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    };
  
    return (
      <div>
        <h1>SearchBar</h1>
        <div>
          <input
            type="text"
            placeholder="Search for places, descriptions, and photos"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
          >
            Search
          </button>
        </div>
  
        {renderSearchResults()}
      </div>
  );
};

export default SearchBar;
