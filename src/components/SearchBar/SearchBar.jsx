import { useState } from 'react';
import { searchAttractions, addAttractionToBucketList } from '../../utilities/users-service';

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [attractionType, setAttractionType] = useState('Attractions'); // Default value

  const handleSearch = async () => {
    try {
      const attractions = await searchAttractions(searchInput+attractionType);
      console.log("attractions", attractions);
      if (attractions) {
        setSearchResults(attractions);
      } else {
        console.error('Error searching attractions');
      }
    } catch (error) {
      console.error('Error performing search:', error);
    }
  };

  const handleAddAttractionToBucketList = async (attraction) => {
    try {
      const addedAttraction = await addAttractionToBucketList(attraction);
      if (addedAttraction) {
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
                  onClick={() => handleAddAttractionToBucketList(result)}
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
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-semibold mb-4">Search Attractions</h1>
      <div className="flex items-center space-x-2 mb-4">
        <input
          type="text"
          placeholder="Search for places, descriptions, and photos"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="border rounded-lg py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
        />
        <select
          value={attractionType}
          onChange={(e) => setAttractionType(e.target.value)}
          className="bg-gray-500 border rounded-lg py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="Attractions">Attractions</option>
          <option value="Cafe">Cafe</option>
          <option value="Eatery">Eatery</option>
          <option value="Natural Park">Natural Park</option>
          <option value="Restaurants">Restaurants</option>
          <option value="Museum">Museum</option>
          <option value="Beach">Beach</option>
          <option value="Theater">Theater</option>
          {/* Add more options here */}
        </select>
        <button
          onClick={() => handleSearch(searchInput, attractionType)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Search
        </button>
      </div>

      {renderSearchResults()}
    </div>
  );
};

export default SearchBar;
