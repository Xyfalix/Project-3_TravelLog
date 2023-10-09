import debug from "debug";
import { Route, Routes } from "react-router-dom";
import "./App.css"
import AuthPage from "../AuthPage/AuthPage";
import FlightPage from "../FlightPage/FlightPage";
import NavBar from "../../components/NavBar/NavBar";
import { getUser } from "../../utilities/users-service";
import BucketListPage from "../BucketListPage/BucketListPage";
import AttractionPage from "../AttractionPage/AttractionPage";
import { getCities } from "../../utilities/users-service";
import { useState, useEffect } from "react";
import AttractionCard from "../../components/AttractionCard/AttractionCard";
import ReviewPage from "../ReviewPage/ReviewPage";

const log = debug("mern:src:App");
localStorage.debug = "mern:*";

log("Start React App");

export default function App() {
  const [user, setUser] = useState(getUser);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getCities();
        console.log(data);
        setCities(data);
      } catch (error) {
        console.log("The error is", error);
      }
    }
    fetchData();
  }, []);


  // Fetch API for Google City

  return (
    <main className="App">
      { user ? (
        <>
          <NavBar user={user} setUser={setUser}/>
          <>Search Bar</>
          <Routes>
            <Route path="/bucketlist" element={<BucketListPage cities={cities}/>} />
            <Route path="/bucketlist/:cityId" element={<AttractionPage cities={cities} />} />
            <Route path="/bucketlist/:cityId" element={<AttractionCard cities={cities} />} />
            <Route path="/bucketlist/:cityId/:attractionId" element={<ReviewPage cities={cities} />} />
            <Route path="/flight" element={<FlightPage />} />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser}/>
      )}
    </main>
  );
}
