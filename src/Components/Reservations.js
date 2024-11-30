import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Calendar from "./Calender";

export default function Reservations() {
  const location = useLocation();
  const [selectedDate, setSelectedDate] = useState(null);
  const [showFilteredBookings, setShowFilteredBookings] = useState(false);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [bookings, setBookings] = useState([]);

  // Fetch bookings from the database on component mount
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("/api/bookings"); // Replace with your API endpoint
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    fetchBookings();
  }, []);

  const formatDate = (date) => {
    return `${date.getDate()} ${date.toLocaleString("default", {
      month: "short",
    })} ${date.getFullYear()}`;
  };

  const parseTime = (timeString) => {
    const [time, meridian] = timeString.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (meridian === "PM" && hours !== 12) hours += 12;
    if (meridian === "AM" && hours === 12) hours = 0;
    return new Date(0, 0, 0, hours, minutes);
  };

  const today = new Date();
  const formattedToday = formatDate(today);

  const upcomingBookings = bookings.filter((booking) => {
    const bookingDate = new Date(booking.date);
    const todayDate = new Date(formattedToday);
    return bookingDate >= todayDate;
  });

  const sortedBookings = upcomingBookings.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    if (dateA - dateB === 0) {
      return (
        parseTime(a.timing.split(" - ")[0]) -
        parseTime(b.timing.split(" - ")[0])
      );
    }
    return dateA - dateB;
  });

  const handleShowSlotsClick = () => {
    if (selectedDate) {
      const formattedDate = formatDate(selectedDate);
      const filtered = bookings
        .filter((booking) => booking.date === formattedDate)
        .sort(
          (a, b) =>
            parseTime(a.timing.split(" - ")[0]) -
            parseTime(b.timing.split(" - ")[0])
        );
      setFilteredBookings(filtered);
      setShowFilteredBookings(true);
    } else {
      alert("Please select a date from the calendar!");
    }
  };

  const handlePaymentStatusChange = async (id, newStatus) => {
    try {
      // Send an update request to the backend
      await axios.patch(`http://localhost:5000/api/bookings/${id}`, {
        payment: newStatus,
      });

      // Update the local state
      const updatedBookings = bookings.map((booking) =>
        booking.id === id ? { ...booking, payment: newStatus } : booking
      );
      setBookings(updatedBookings);
    } catch (error) {
      console.error("Error updating payment status:", error);
    }
  };

  return (
    <>
      <div className="nav-style">
        <div className="nav-underline"></div>
      </div>

      {location.pathname !== "/authpageownerlogin" &&
        location.pathname !== "/authpageownersignup" &&
        location.pathname !== "/revenuegrounddetails" &&
        location.pathname !== "/viewprofile" &&
        location.pathname !== "/help" && (
          <>
            <div className="container my-5">
              <h2 className="pt-5" style={{ color: "#55ad9b" }}>
                Upcoming Bookings
              </h2>
              <div className="reservations">
                <div className="reservations-list">
                  {sortedBookings.length > 0 ? (
                    sortedBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="upcoming-booking p-3 border mb-2"
                      >
                        <h5 style={{ color: "#55ad9b" }}>{booking.pitch}</h5>
                        <span>
                          <b>Timing:</b> {booking.timing}
                          <br />
                        </span>
                        <span>
                          <b>Date:</b> {booking.date}
                          <br />
                        </span>
                        <span>
                          <b>Booked By:</b> {booking.bookedBy}
                          <br />
                        </span>
                        <span>
                          <b>Contact:</b> {booking.contact}
                          <br />
                        </span>
                        <span>
                          <b>Status:</b>{" "}
                          {booking.payment ? (
                            <span>{booking.payment}</span>
                          ) : (
                            <>
                              <button
                                onClick={() =>
                                  handlePaymentStatusChange(booking.id, "Paid")
                                }
                                className="btn btn-success btn-sm me-2"
                              >
                                Paid
                              </button>
                              <button
                                onClick={() =>
                                  handlePaymentStatusChange(
                                    booking.id,
                                    "UnPaid"
                                  )
                                }
                                className="btn btn-warning btn-sm"
                              >
                                UnPaid
                              </button>
                            </>
                          )}
                          <br />
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="no-booking-message text-center mt-3">
                      <h5 style={{ color: "#0d705c" }}>No upcoming Booking!</h5>
                    </div>
                  )}
                </div>
                <div className="calender">
                  <h2 className="mb-5" style={{ color: "#55ad9b" }}>
                    Check Upcoming Bookings
                  </h2>
                  <Calendar
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                  />
                  <div className="booked-slots">
                    <button
                      className="my-5 slots-button dropdown btn-back"
                      onClick={handleShowSlotsClick}
                    >
                      SHOW SLOTS STATUS
                    </button>
                  </div>

                  {/* Filtered Bookings Popup */}
                  {showFilteredBookings && (
                    <div className="overlay-bookings">
                      <div className="dropdown-bookings mt-3">
                        <button
                          className="close-button"
                          onClick={() => setShowFilteredBookings(false)}
                        >
                          &times;
                        </button>
                        {filteredBookings.length > 0 ? (
                          filteredBookings.map((booking, index) => (
                            <div
                              key={index}
                              className="upcoming-booking p-2 border"
                            >
                              <h5 style={{ color: "#55ad9b" }}>
                                {booking.pitch}
                              </h5>
                              <span>
                                <b>Timing:</b> {booking.timing}
                                <br />
                              </span>
                              <span>
                                <b>Date:</b> {booking.date}
                                <br />
                              </span>
                              <span>
                                <b>Booked By:</b> {booking.bookedBy}
                                <br />
                              </span>
                              <span>
                                <b>Contact:</b> {booking.contact}
                                <br />
                              </span>
                              <span>
                                <b>Status:</b>{" "}
                                {booking.payment ? (
                                  // If "payment" has a value, display it as plain text
                                  <span>{booking.payment}</span>
                                ) : (
                                  // If "payment" is empty, show two Unpaid
                                  <span>{"UnPaid"}</span>
                                )}
                                <br />
                              </span>
                            </div>
                          ))
                        ) : (
                          <p>No bookings found for the selected date.</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
    </>
  );
}
