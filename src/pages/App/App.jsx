import debug from "debug";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css"
import AuthPage from "../AuthPage/AuthPage";
import OrderHistoryPage from "../OrderHistoryPage/OrderHistoryPage";
import NavBar from "../../components/NavBar";
import { getUser } from "../../utilities/users-service";
import BucketListPage from "../BucketListPage/BucketListPage";

const log = debug("mern:src:App");
localStorage.debug = "mern:*";

log("Start React App");

export default function App() {
  const [user, setUser] = useState(getUser);

  return (
    <main className="App">
      { user ? (
        <>
          <NavBar user={user} setUser={setUser}/>
          <Routes>
            <Route path="/bucketlist" element={<BucketListPage />} />
            <Route path="/orders" element={<OrderHistoryPage />} />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser}/>
      )}
    </main>
  );
}
