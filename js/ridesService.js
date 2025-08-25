document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("new-ride-form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      storeRides();
    });
  }
});

function storeRides() {
  const user = JSON.parse(sessionStorage.getItem("activeUser"));
  const userId = user.userId;

  const departure = document.getElementById("departure").value;
  const arrival = document.getElementById("arrival").value;
  const days = [
    document.getElementById("monday").checked,
    document.getElementById("tuesday").checked,
    document.getElementById("wednesday").checked,
    document.getElementById("thursday").checked,
    document.getElementById("friday").checked,
    document.getElementById("saturday").checked,
    document.getElementById("sunday").checked,
  ];
  const time = document.getElementById("time").value;
  const seats = document.getElementById("seats").value;
  const fee = document.getElementById("fee").value;
  const make = document.getElementById("make").value;
  const model = document.getElementById("model").value;
  const year = document.getElementById("year").value;

  const rideDetails = {
    rideId: Math.random().toString(36).substring(2, 15),
    userId: userId,
    departure: departure,
    arrival: arrival,
    days: days,
    time: time,
    seats: seats,
    fee: fee,
    make: make,
    model: model,
    year: year,
  };

  if (departure && arrival && time && seats && fee && make && model && year) {
    let rides = JSON.parse(localStorage.getItem("rides"));
    if (rides) {
      rides.push(rideDetails);
    } else {
      rides = [rideDetails];
    }
    localStorage.setItem("rides", JSON.stringify(rides));
    window.location.href = "myRides.html";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const table = document.getElementById("rides-table");
  if (table) {
    setUserRides();
  }
});

function setUserRides() {
  const user = JSON.parse(sessionStorage.getItem("activeUser"));
  const rides = JSON.parse(localStorage.getItem("rides")) || [];

  const tbody = document.getElementById("rides-body");
  tbody.innerHTML = "";

  for (let ride of rides) {
    if (ride.userId === user.userId) {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${ride.departure}</td>
        <td>${ride.arrival}</td>
        <td>${ride.seats}</td>
        <td>${ride.make} ${ride.model} ${ride.year}</td>
        <td>${ride.fee}${"$"}</td>
        <td>
          <a href="editRide.html?rideId=${ride.rideId}">Edit</a> | 
          <a href="myRides.html" onclick="deleteRide('${ride.rideId}')">Delete</a>
        </td>
      `;

      tbody.appendChild(row);
    }
  }
}

function deleteRide(rideId) {
  let rides = JSON.parse(localStorage.getItem("rides")) || [];
  let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

  rides = rides.filter(ride => ride.rideId !== rideId);

  bookings = bookings.filter(booking => booking.rideId !== rideId);

  localStorage.setItem("rides", JSON.stringify(rides));
  localStorage.setItem("bookings", JSON.stringify(bookings));
}


document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("edit-ride-form");
  const form2 = document.getElementById("ride-details-form");
  if (form || form2) {
    setUserRidesEdit();
  }
});

function setUserRidesEdit() {
  const params = new URLSearchParams(window.location.search);
  const rideId = params.get("rideId");

  const rides = JSON.parse(localStorage.getItem("rides")) || [];

  for (let ride of rides) {
    if (ride.rideId === rideId) {
      document.getElementById("departure").value = ride.departure || "";
      document.getElementById("arrival").value = ride.arrival || "";
      document.getElementById("monday").checked = ride.days[0];
      document.getElementById("tuesday").checked = ride.days[1];
      document.getElementById("wednesday").checked = ride.days[2];
      document.getElementById("thursday").checked = ride.days[3];
      document.getElementById("friday").checked = ride.days[4];
      document.getElementById("saturday").checked = ride.days[5];
      document.getElementById("sunday").checked = ride.days[6];
      document.getElementById("time").value = ride.time || "";
      document.getElementById("seats").value = ride.seats || "";
      document.getElementById("fee").value = ride.fee || "";
      document.getElementById("make").value = ride.make || "";
      document.getElementById("model").value = ride.model || "";
      document.getElementById("year").value = ride.year || "";
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("edit-ride-form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      storeEditedRides();
    });
  }
});

function storeEditedRides() {
  let rides = JSON.parse(localStorage.getItem("rides"));

  const params = new URLSearchParams(window.location.search);
  const rideId = params.get("rideId");

  for (let ride of rides) {
    if (ride.rideId === rideId) {
      const departure = document.getElementById("departure").value;
      const arrival = document.getElementById("arrival").value;
      const days = [
        document.getElementById("monday").checked,
        document.getElementById("tuesday").checked,
        document.getElementById("wednesday").checked,
        document.getElementById("thursday").checked,
        document.getElementById("friday").checked,
        document.getElementById("saturday").checked,
        document.getElementById("sunday").checked,
      ];
      const time = document.getElementById("time").value;
      const seats = document.getElementById("seats").value;
      const fee = document.getElementById("fee").value;
      const make = document.getElementById("make").value;
      const model = document.getElementById("model").value;
      const year = document.getElementById("year").value;

      const rideDetails = {
        ...ride,
        departure: departure,
        arrival: arrival,
        days: days,
        time: time,
        seats: seats,
        fee: fee,
        make: make,
        model: model,
        year: year,
      };

      if (
        departure &&
        arrival &&
        time &&
        seats &&
        fee &&
        make &&
        model &&
        year
      ) {
        const index = rides.findIndex((ride) => ride.rideId === rideId);
        if (index !== -1) {
          rides[index] = rideDetails;
        }

        localStorage.setItem("rides", JSON.stringify(rides));
        window.location.href = "myRides.html";
      }
    }
  }
}

function setUserRidesSearchRides(matchedRides) {
  const user = JSON.parse(sessionStorage.getItem("activeUser"));
  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

  const tbody = document.getElementById("search-rides-table");
  tbody.innerHTML = "";

  for (let ride of matchedRides) {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td><img src="img/user-icon.png" style="width:24px; height:24px; vertical-align:middle; border-radius:80%;"> ${
        ride.userId
      }</td>
      <td>${ride.departure}</td>
      <td>${ride.arrival}</td>
      <td>${ride.seats}</td>
      <td>${ride.make} ${ride.model || ""} ${ride.year || ""}</td>
      <td>$${ride.fee}</td>
    `;

    if (ride.userId === user.userId) {
      row.innerHTML += `<td>Your ride</td>`;
    } else {
      const existingBooking = bookings.find(
        (b) => b.rideId === ride.rideId && b.passengerId === user.userId
      );

      if (existingBooking && existingBooking.accepted === null) {
        row.innerHTML += `<td>Pending</td>`;
      } else if (existingBooking && existingBooking.accepted === false) {
        row.innerHTML += `<td>Reject</td>`;
      } else if (existingBooking && existingBooking.accepted === true) {
        row.innerHTML += `<td>Accepted</td>`;
      } else {
        row.innerHTML += `<td><a href="rideDetails.html?rideId=${ride.rideId}">Request</a></td>`;
      }
    }

    tbody.appendChild(row);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("search-rides-form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      searchRidesAlgorithm();
    });
  }
});

function searchRidesAlgorithm() {
  const rides = JSON.parse(localStorage.getItem("rides")) || [];

  const departure = document.getElementById("from").value;
  const arrival = document.getElementById("to").value;
  const selectedDays = getSelectedDays();

  const matchedRides = rides.filter((ride) => {
    const sameRoute = ride.departure === departure && ride.arrival === arrival;

    const matchingDays = ride.days.some((day, i) => day && selectedDays[i]);

    return sameRoute && matchingDays;
  });

  setUserRidesSearchRides(matchedRides);
}

function getSelectedDays() {
  const dayIds = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  return dayIds.map((id) => document.getElementById(id).checked);
}
