// import { useState, useEffect } from 'react-router-dom';
// import { getCities } from '../../utilities/users-service';

// const SearchBar = () => {
//     const [cities, setCities] = useState([])
//     const [searchInput, setSearchInput] = useState("");
//     const [searchResult, setSearchResult] = useState(null);
//     const citiesData = [
//         { name: "Singapore", symbol: "sss"}
//     ]

//     useEffect(()=> {
//         async function fetchData() {
//             try{
//                 const data = await getCities();
//                 console.log(data);
//                 setCities(data);
//             } catch (error) {
//                 console.log('The error is', error);
//             }
//           }
//           fetchData(); 
//         }, []);

//     const handleSearch = () => {
//         // Filter the coinData based on the searchInput
//         const result = citiesData.find((city) =>
//           city.name.toLowerCase() === searchInput.toLowerCase() ||
//           city.symbol.toLowerCase() === searchInput.toLowerCase()
//         );
//         if (result) {
//           setSearchResult(result);
//         } else {
//           setSearchResult(null);
//         }
//       };

//     return (

//     <div>
//         <h1>SearchBar</h1>
//             <div>
//                 <input
//                 type="text"
//                 placeholder="Search for the city"
//                 value={searchInput}
//                 onChange={(e) => setSearchInput(e.target.value)}
//                  />
//                 <button
//                 onClick={handleSearch}
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
//                 />
//             </div>

//     </div>
//   )
// }

// export default SearchBar