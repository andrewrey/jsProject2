const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

let ticketPrice = +movieSelect.value;
///// Functions //////

// update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  // get an array of selected-seats' indexes
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  // set array of seat index to local storage
  localStorage.setItem("seats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// update ticket price function
function updateTicketPrice(e) {
  ticketPrice = +movieSelect.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  console.log(typeof e.target.selectedIndex);
  updateSelectedCount();
}

// Save selected movie and price to LS
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

///// Event Listeners //////

// Seat Click Event Listener
container.addEventListener("click", (e) => {
  if (e.target.classList.contains("seat") && !e.target.classList.contains("occupied")) {
    e.target.classList.toggle("selected");

    updateSelectedCount();
  }
});

// Change movie event listener
movieSelect.addEventListener("change", updateTicketPrice);

// Onload event listener
// document.addEventListener("DOMContentLoaded", checkLS);
