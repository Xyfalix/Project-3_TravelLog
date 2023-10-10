import debug from "debug";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css"
import AuthPage from "../AuthPage/AuthPage";
import FlightPage from "../FlightPage/FlightPage";
import NavBar from "../../components/NavBar/NavBar";
import { getUser } from "../../utilities/users-service";
import BucketListPage from "../BucketListPage/BucketListPage";
import { getAttractions } from "../../utilities/users-service";
import { useState, useEffect } from "react";
import AttractionCard from "../../components/AttractionCard/AttractionCard";
import ReviewPage from "../ReviewPage/ReviewPage";
import SearchBar from "../../components/SearchBar/SearchBar";

const log = debug("mern:src:App");
localStorage.debug = "mern:*";

log("Start React App");

export default function App() {
  const [user, setUser] = useState(getUser);
  const [attractions, setAttractions] = useState([]);
  const [searchResultsVisible, setSearchResultsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAttractions();
        console.log(data);
        setAttractions(data);
      } catch (error) {
        console.log("The error is", error);
      }
    }
    fetchData();
  }, [location.pathname]);


  const hideSearchResults = () => {
    setSearchResultsVisible(false);
  };

  return (
    <main className="App">
      { user ? (
        <>
          <NavBar user={user} setUser={setUser} hideSearchResults={hideSearchResults}/>
          {(location.pathname === '/' || searchResultsVisible) && <SearchBar />}
          <Routes>
            <Route path="/bucketlist" element={<BucketListPage attractions={attractions}/>} />
            <Route path="/bucketlist/:attractionId" element={<AttractionCard attractions={attractions} setAttractions={setAttractions} />} />
            <Route path="/bucketlist/:attractionId/reviews" element={<ReviewPage attractions={attractions} user={user} />} />
            <Route path="/flight" element={<FlightPage />} />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser}/>
      )}
    </main>
  );
}
