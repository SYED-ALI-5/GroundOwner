import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function GroundSelection() {
  const [grounds, setGrounds] = useState([]);  // State to store ground data
  const location = useLocation();

  useEffect(() => {
    // Fetch ground data from the backend
    const fetchGrounds = async () => {
      try {
        const response = await fetch("/api/grounds");  // Replace with your endpoint
        const data = await response.json();  // Parse JSON data
        setGrounds(data);  // Update state with fetched data
      } catch (error) {
        console.error("Error fetching ground data:", error);
      }
    };

    fetchGrounds();  // Invoke the function
  }, []);  // Empty dependency array to run only on mount

  return (
    <>
      <div className="nav-style">
        <div className="nav-underline"></div>
      </div>
      {location.pathname !== "/authpageownerlogin" &&
        location.pathname !== "/authpageownersignup" &&
        location.pathname !== "/revenuegrounddetails" &&
        location.pathname !== "/reservations" &&
        location.pathname !== "/viewprofile" &&
        location.pathname !== "/help" && (
          <div className="container my-4">
            <h1 className="email mb-5" style={{ color: "rgb(57 171 148)" }}>
              Select Ground
            </h1>
            <div className="d-flex flex-column justify-content-center align-items-center">
              {grounds.map((ground) => (
                <div
                  key={ground.id}  // Unique key for each ground
                  className="ground-data my-3 px-5 py-3 d-flex flex-row justify-content-center align-items-center"
                >
                  <img
                    src={ground.photos[0]}  // Display only the first photo
                    className="image-ground-selection"
                    alt={ground.name}
                  />
                  <div className="d-flex flex-column justify-content-center align-items-start px-5">
                    <div className="signup text-center">
                      <Link to={`/reservations/${ground.id}`} className="btn-ground">
                        <b>{ground.name}</b>  {/* Ground name from data */}
                      </Link>
                    </div>
                    <div className="loc">
                      <p>{ground.location}</p>  {/* Ground location */}
                      <FaMapMarkerAlt className="icon ms-2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
    </>
  );
}
