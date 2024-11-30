import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import logo_icon from "../Assets/logo.png";

export default function Navbar(props) {
  const location = useLocation();

  // State to store user data
  const [userData, setUserData] = useState({
    photo: null,
    name: null,
  });

  useEffect(() => {
    // Fetch user data when the component mounts
    const fetchUserData = async () => {
      try {
        const response = await fetch("https://your-backend-endpoint/api/user", {
          method: "GET",
          credentials: "include", // If cookies or tokens are used for authentication
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data.");
        }

        const data = await response.json();
        setUserData({
          photo: data.photo, // URL of the user's photo
          name: data.name, // User's name
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const allowedRoutes = [
    "/reservations",
    "/revenuegrounddetails",
    "/help",
    "/viewprofile",
  ];

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <img src={logo_icon} alt="Logo" />
          <h1>{props.title}</h1>
        </div>

        {allowedRoutes.includes(location.pathname) && (
          <div className="pages">
            <a href="/reservations">Reservations</a>
            <a href="/revenuegrounddetails">Ground Management</a>
            <a href="/help">Help</a>
          </div>
        )}

        <div className="button-owner-auth">
          <div className="dropdown owner-image">
            <button
              className="dropdown btn-back"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src={userData.photo || "default-placeholder-url"} // Use placeholder if photo is null
                alt="Owner"
              />
            </button>
            <ul className="dropdown-menu dropdown-menu-end mt-2 mx-5">
              <li>
                <div className="px-5 pt-2 view-profile">
                  <img
                    src={userData.photo || "default-placeholder-url"} // Use placeholder if photo is null
                    alt="Owner"
                  />
                  <div className="owner-name-edit">
                    <h6
                      className="owner-name my-4 text-center"
                      style={{ color: "#0d705c" }}
                    >
                      {userData.name || "Owner Name"}{" "}
                      {/* Fallback to placeholder */}
                    </h6>
                  </div>
                </div>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <div className="signup text-center">
                  <Link to="./viewprofile" className="btn-sign">
                    View Profile
                  </Link>
                </div>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <div className="logIn text-center">
                  <Link to="/" className="btn-log">
                    SignOut
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
