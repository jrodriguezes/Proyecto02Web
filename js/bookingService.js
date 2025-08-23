document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("ride-details-form");
  if (form) {
    setUser();
  }
});

function setUser() {
  const params = new URLSearchParams(window.location.search);
  const rideId = params.get("rideId");

  const rides = JSON.parse(localStorage.getItem("rides"));

  for (let ride of rides) {
    if (ride.rideId === rideId) {
      document.getElementById("username").value = ride.userId || "";
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("ride-details-form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      setBooking();
    });
  }
});

function setBooking() {
  const params = new URLSearchParams(window.location.search);
  const rideId = params.get("rideId");
  const rides = JSON.parse(localStorage.getItem("rides"));

  const activeUser = JSON.parse(sessionStorage.getItem("activeUser"));

  for (let ride of rides) {
    if (ride.rideId === rideId) {
      const bookingRide = {
        rideId: rideId,
        driverId: ride.userId,
        passengerId: activeUser.userId,
        accepted: null,
      };

      let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
      if (bookings) {
        bookings.push(bookingRide);
      } else {
        bookings = [bookingRide];
      }

      localStorage.setItem("bookings", JSON.stringify(bookings));
      window.location.href = "bookings.html";
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const table = document.getElementById("bookings-form");
  if (table) {
    getBookings();
  }
});

function getBookings() {
  const activeUser = JSON.parse(sessionStorage.getItem("activeUser"));
  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const tbody = document.getElementById("tbody-booking");
  const rides = JSON.parse(localStorage.getItem("rides")) || [];

  tbody.innerHTML = "";

  for (let booking of bookings) {
    if (activeUser.userId === booking.passengerId) {
      const row = document.createElement("tr");
      let driverName = "Conductor no encontrado";
      let ridePath = "";

      /* Encuentra el nombre del conductor (para que sea mas UX)*/
      for (let user of users) {
        if (user.userId === booking.driverId) {
          driverName = user.firstName;
        }
      }

      /* Encuentra la ruta del viaje */
      for (let ride of rides) {
        if (ride.rideId === booking.rideId) {
          ridePath = `${ride.departure}-${ride.arrival}`;
        }
      }

      row.innerHTML = `
        <td>${driverName}</td>
        <td>${ridePath}</td>
        <td>${
          booking.accepted === null
            ? "Pending"
            : booking.accepted
            ? "Accepted"
            : "Rejected"
        }</td>
      `;

      tbody.appendChild(row);
    } else if (activeUser.userId === booking.driverId) {
      const row = document.createElement("tr");
      let passengerName = "Pasajero no encontrado";
      let ridePath = "";

      /* Encuentra el nombre del conductor (para que sea mas UX)*/
      for (let user of users) {
        if (user.userId === booking.passengerId) {
          passengerName = user.firstName;
        }
      }

      /* Encuentra la ruta del viaje */
      for (let ride of rides) {
        if (ride.rideId === booking.rideId) {
          ridePath = `${ride.departure}-${ride.arrival}`;
        }
      }

      row.innerHTML = `
      <td><img src="img/user-icon.png" style="width:24px; height:24px; vertical-align:middle; border-radius:80%;">${passengerName}</td>
      <td>${ridePath}</td>
      <td>${
        booking.accepted === null
          ? `<button class="accept-reject-buttons" onclick="updateBookingStatus('${booking.rideId}', true)">Accept</button>
             <button class="accept-reject-buttons" onclick="updateBookingStatus('${booking.rideId}', false)">Reject</button>`
          : booking.accepted
          ? "Accepted"
          : "Rejected"
      }</td>
    `;

      tbody.appendChild(row);
    }
  }
}

function updateBookingStatus(bookingId, status) {
  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

  for (let booking of bookings) {
    if (booking.rideId === bookingId) {
      let bookingIndex = bookings.indexOf(booking);
      bookings[bookingIndex].accepted = status;
      
      localStorage.setItem("bookings", JSON.stringify(bookings));
    }
  }
}



