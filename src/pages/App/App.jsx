import debug from "debug";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css"
import AuthPage from "../AuthPage/AuthPage";
import FlightPage from "../FlightPage/FlightPage";
import NavBar from "../../components/NavBar/NavBar";
import { getUser } from "../../utilities/users-service";
import BucketListPage from "../BucketListPage/BucketListPage";

const log = debug("mern:src:App");
localStorage.debug = "mern:*";

log("Start React App");

export default function App() {
  const [user, setUser] = useState(getUser);


  // Fetch API for Google City

  return (
    <main className="App">
      { user ? (
        <>
          <NavBar user={user} setUser={setUser}/>
          <>Search Bar</>
          <Routes>
            <Route path="/bucketlist" element={<BucketListPage />} />
            <Route path="/flight" element={<FlightPage />} />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser}/>
      )}
    </main>
  );
}
