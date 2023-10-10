import { useState } from 'react';
import * as usersService from '../../utilities/users-service'; // Update the path to your users-service.js file

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      // Call your searchAttractions function to search using Google Places API
      const attractions = await usersService.searchAttractions(searchInput);
      if (attractions) {
        // Update search results state with cities data
        console.log(attractions);
        setSearchResults(attractions);
      } else {
        console.error('Error searching cities');
      }
    } catch (error) {
      console.error('Error performing search:', error);
    }
  };

  const handleAddToBucketList = async (attraction) => {
    try {
      // Call your addCityToBucketList function to add the city to the bucket list
      const addedAttraction = await usersService.addAttractionToBucketList(attraction);
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
      <div>
        {searchResults.map((result) => (
          <div key={result.place_id}>
            <h3>{result.name}</h3>
            <p>{result.formatted_address}</p>
            {/* Include any additional fields you want to display */}
            <button onClick={() => handleAddToBucketList(result)}>Add to Bucket List</button>
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

      {/* Display search results */}
      {renderSearchResults()}
    </div>
  );
};

export default SearchBar;
