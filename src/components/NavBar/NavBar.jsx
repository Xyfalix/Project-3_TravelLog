import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../utilities/users-service";
import { BsFillBasket3Fill } from "react-icons/bs";

export default function NavBar({ user, setUser, hideSearchResults }) {
  let navigate = useNavigate();

  const handleLogout = (event) => {
    event.preventDefault();
    logout();
    setUser(null);
  };

  const handleNavigate = (link) => {
    navigate(link);
    hideSearchResults(); // Hide search results when navigating
  };

  return (
    <nav>
      <div className="navbar bg-base-100 bg-indigo-800 text-white h-14 flex justify-between">
        <div className="flex">
          <button className="font-semibold" onClick={() => handleNavigate("/")}>
            <span className="text-yellow-500 text-2xl">Travel</span>
            <span className="text-blue-500 text-2xl">Log</span>
          </button>
          <div className="mx-8">
            <Link to="/bucketlist" className="flex items-center">
              <span className="mr-1">
                <BsFillBasket3Fill />
              </span>
              <span>My Bucket List</span>
            </Link>
          </div>
        </div>

        <div className="flex">
          <p className="text-lg mx-5">Hi, {user.name}</p>
          <button className="btn btn-sm btn-outline btn-accen" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
}
