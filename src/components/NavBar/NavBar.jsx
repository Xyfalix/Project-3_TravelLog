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
      <div className="navbar bg-base-200 text-white h-14 flex justify-between">
        <div className="flex">
          <button className="font-semibold" onClick={() => handleNavigate("/")}>
            <span className="text-info text-xl">Travel</span>{" "}
            <span className="text-accent text-xl">Log</span>
          </button>
          <div className="mx-8">
            <Link to="/bucketlist" className="flex items-center">
              <span className="mr-1">
                <BsFillBasket3Fill />
              </span>
              <span className="text-accent">My Bucket List</span>
            </Link>
          </div>
        </div>

        <div className="flex">
          <p className="text-lg mx-5">Hi, {user.name}</p>
          <button
            className="btn btn-sm btn-outline btn-accent"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
