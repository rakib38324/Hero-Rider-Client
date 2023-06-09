import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContextProvider";
import useAdmin from "../../Hooks/UseAdmin";
import useLearner from "../../Hooks/UseLearner";

const Navbar = () => {
  const { user, logOut,loading, setLoading } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);
  const [isLearner] = useLearner(user?.email);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const handleLogOut = () => {
    setLoading(true)
    logOut()
      .then(() => {
        localStorage.removeItem("accessToken");
        toast.success("Log Out Successfully");

        navigate(from, { replace: true });
        setLoading(false)
      })
      .catch((err) => {
        console.log(err);
        setLoading(false)
      });
  };

  return (
    <div className=" ">
      <div className="navbar bg-base-200">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {user?.email ? (
                <div>
                  <li>
                    <button
                      onClick={handleLogOut}
                      className="text-xl font-semibold"
                    >
                      Log Out
                    </button>
                  </li>

                  <li>
                    <Link to="/profile" className="text-xl font-semibold">
                      Profile
                    </Link>
                  </li>

                  {isAdmin && (
                    <li>
                      <Link to="/users" className="text-xl font-semibold">
                        Users
                      </Link>
                    </li>
                  )}
                </div>
              ) : (
                <div className="lg:flex">
                  <li>
                    <Link to="/login" className="text-xl font-semibold">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/signup" className="text-xl font-semibold">
                      Sign Up
                    </Link>
                  </li>

                 
                  {isLearner && (
                    <li>
                      <Link to="/courses" className="text-xl font-semibold">
                        Courses
                      </Link>
                    </li>
                  )}
                </div>
              )}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost normal-case text-2xl font-bold">
            Hero Rider
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {user?.email ? (
              <div className="lg:flex">
                <li>
                  <button
                    onClick={handleLogOut}
                    className="text-xl font-semibold"
                  >
                    Log Out
                  </button>
                </li>
                <li>
                  <Link to="/profile" className="text-xl font-semibold">
                    Profile
                  </Link>
                </li>
              </div>
            ) : (
              <div className="lg:flex">
                <li>
                  <Link to="/login" className="text-xl font-semibold">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/signup" className="text-xl font-semibold">
                    Sign Up
                  </Link>
                </li>
              </div>
            )}

            {isAdmin && (
              <li>
                <Link to="/users" className="text-xl font-semibold">
                  Users
                </Link>
              </li>
            )}
            {isLearner && (
              <li>
                <Link to="/courses" className="text-xl font-semibold">
                  Courses
                </Link>
              </li>
            )}
          </ul>
        </div>
        
      </div>
    </div>
  );
};

export default Navbar;
