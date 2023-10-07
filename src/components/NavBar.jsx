// Don't forget the import
import { Link } from "react-router-dom";
import { logout } from "../utilities/users-service";

export default function NavBar({user, setUser}) {

   const handleLogout = (event) => {
    event.preventDefault();
    logout();
    setUser(null);
  };

  return (
    <nav>
      <p className="text-2xl mb-2 text-center">Hi, {user.name}, {user.email}</p>
      <Link to="/orders">Order History</Link>
      &nbsp; | &nbsp;
      <Link to="/orders/new">New Order</Link>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}