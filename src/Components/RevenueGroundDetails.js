import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaMapMarkerAlt, FaEdit } from "react-icons/fa";
import std_icon from "../Assets/sign_Bg.jpeg";
import stdd_icon from "../Assets/login_Bg.jpeg";

export default function RevenueGroundDetails() {
  const [ownerData, setOwnerData] = useState({});
  const [stadiumData, setStadiumData] = useState({});
  const [revenueData, setRevenueData] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const ownerResponse = await axios.get("http://localhost:5000/api/owner");
        const stadiumResponse = await axios.get(
          "http://localhost:5000/api/stadium"
        );
        const revenueResponse = await axios.get(
          "http://localhost:5000/api/revenue"
        );

        setOwnerData(ownerResponse.data);
        setStadiumData(stadiumResponse.data);
        setRevenueData(revenueResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="container d-flex flex-column justify-content-center align-items-center">
        {/* Owner Details */}
        <div className="owner-img-name-edit my-5">
          <div className="owner-name-edit">
            <h2 className="owner-name" style={{ color: "#0d705c" }}>
              Hi! {ownerData.name}
            </h2>
          </div>
        </div>

        {/* Stadium Details */}
        <div className="edit-ground-details">
          <h2 className="py-3" style={{ color: "#55ad9b", fontSize: "45px" }}>
            Stadium Details
          </h2>
          <div className="info-specific-ground">
            <div className="info-text-ground">
              <div className="name-rev">
                <div className="name-rating-ground">
                  <h3>{stadiumData.name}</h3>
                </div>
                <div className="rating-ground">
                  <span>{stadiumData.rating}/5⭐</span>
                </div>
              </div>
              <div className="venue">
                <p>Stadium Type: {stadiumData.type}</p>
                <p>Sports Hours: {stadiumData.sportsHours}</p>
              </div>
              <div className="loc">
                <FaMapMarkerAlt className="icon" />
                <p>{stadiumData.address}</p>
                <br />
              </div>
            </div>
            <div className="pitch-pictures-edit">
              <div id="carouselExampleIndicators" className="carousel slide">
                <div className="carousel-indicators">
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="0"
                    className="active"
                    aria-current="true"
                    aria-label="Slide 1"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="2"
                    aria-label="Slide 3"
                  ></button>
                </div>
                <div className="carousel-inner">
                  <div className="carousel-item active image-slide">
                    <img src={std_icon} className="d-block w-100" alt="..." />
                  </div>
                  <div className="carousel-item image-slide">
                    <img src={stdd_icon} className="d-block w-100" alt="..." />
                  </div>
                  <div className="carousel-item image-slide">
                    <img src={std_icon} className="d-block w-100" alt="..." />
                  </div>
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Details */}
        <div className="revenue my-5">
          <h2>Revenue Details</h2>
          <div className="revenue-data">
            <div
              style={{ borderBottom: "3px dashed #55ad9b" }}
              className="revenue-data-specific pt-1 pb-4"
            >
              <span>
                <b>No. of Bookings Last Month:</b> {revenueData.lastMonthBookings}
              </span>
              <span>
                <b>Revenue Last Month:</b> Rs.{revenueData.lastMonthRevenue}
              </span>
            </div>
            <div
              style={{ borderBottom: "3px dashed #55ad9b" }}
              className="revenue-data-specific pt-1 pb-4"
            >
              <span>
                <b>No. of Bookings this Month:</b> {revenueData.currentMonthBookings}
              </span>
              <span>
                <b>Revenue this Month:</b> Rs.{revenueData.currentMonthRevenue}
              </span>
            </div>
            <div className="revenue-data-specific pt-1 pb-1">
              <span>
                <b>Total No. of Bookings:</b> {revenueData.totalBookings}
              </span>
              <span>
                <b>Total Revenue:</b> Rs.{revenueData.totalRevenue}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
