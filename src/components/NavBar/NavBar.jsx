import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../utilities/users-service";
import { BsFillBasket3Fill, BsFillAirplaneFill } from "react-icons/bs";


export default function NavBar({user, setUser, hideSearchResults }) {
  let navigate = useNavigate();
  const Links = [
    {name:'Home', link: '/'},
    {name: 'My Bucket List', link: '/bucketlist'},
]

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
      <p className="text-2xl mb-2 text-center">Hi, {user.name}, {user.email}</p>
      <div className="flex flex-row-reverse">
       <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="navbar bg-base-100 bg-gray-800 text-white h-14 flex justify-center">
                    <div className="flex-1">
                            <button className='font-semibold hover:text-white hover:bg-gray-100' onClick={()=> handleNavigate('/')}>
                                <span className="text-yellow-500 text-2xl">Travel</span>
                                <span className="text-blue-500 text-2xl">Log</span>
                            </button>
                    </div>
                        <div className="dropdown">
                            <label tabIndex="0" className="btn btn-ghost btn-circle">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                            </label>
                            <ul tabIndex="0" className="menu menu-sm dropdown-content mt-3 z-[1] bg-gray-700 p-2 shadow bg-base-100 rounded-box w-52 absolute right-0 origin-top-right">
                                {
                                Links.map((link)=> (
                                    <li key={link.name}>
                                        <a onClick={() => handleNavigate(link.link)}>{link.name}</a>
                                    </li>
                                ))
                                }
                            </ul>
                        </div>
            </div>
        <div className="flex justify-center">
            <div onClick={() => handleNavigate("/bucketlist")}>
                <Link to="/bucketlist">{<BsFillBasket3Fill />}My Bucket List</Link></div>
            &nbsp;&nbsp;   &nbsp;&nbsp;   &nbsp;&nbsp;    &nbsp;&nbsp;
            <div onClick={() => handleNavigate("/bucketlist")}>
                <Link to="/flight">{<BsFillAirplaneFill />}Search Flights</Link></div>
        </div>
    </nav>
  );
}