// Select all elements with the class "timer"
const timers = document.querySelectorAll(".timer");

// Iterate over each timer element and call the flip function
timers.forEach((element) => {
  flip(element);
});

// Set the countdown target date (8 days from the current date and time)
const countDate = new Date();
countDate.setDate(countDate.getDate() + 8);
countDate.setHours(countDate.getHours() + 24);

// Variable to store the previous time between dates
let previousTimeBetweenDates;

// Initial update of the countdown
updateCountdown();

// Set an interval to update the countdown every 250 milliseconds
setInterval(updateCountdown, 250);

// Function to update the countdown
function updateCountdown() {
  // Get the current date and time
  const currentDate = new Date();

  // Calculate the time remaining between the target date and the current date
  const timeBetweenDates = Math.ceil((countDate - currentDate) / 1000);

  // Update the previous time variable and perform the card flipping animation
  previousTimeBetweenDates = timeBetweenDates;
  flipAllCards(timeBetweenDates);
}

// Function to flip all cards (days, hours, minutes, and seconds)
function flipAllCards(time) {
  // Calculate days, hours, minutes, and seconds from the total time
  const days = Math.floor(time / (3600 * 24));
  const hours = Math.floor((time % (3600 * 24)) / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  // Call the flip function for each card with the respective value
  flip(document.querySelector("[data-day]"), days);
  flip(document.querySelector("[data-hour]"), hours);
  flip(document.querySelector("[data-minute]"), minutes);
  flip(document.querySelector("[data-second]"), seconds);
}

// Function to perform the flip animation for a specific timer element
function flip(timer, newNum) {
  // Get the top and bottom halves of the timer element
  const topHalf = timer.querySelector(".top");
  const bottomHalf = timer.querySelector(".bottom");

  // Get the starting number from the top half of the timer
  const startNum = Number(topHalf.textContent);

  // If the new number is the same as the starting number, do nothing
  if (newNum === startNum) return;

  // Format the starting and new numbers with leading zeros if necessary
  const formatStartNum = startNum < 10 ? `0${startNum}` : startNum;
  const formatNum = newNum < 10 ? `0${newNum}` : newNum;

  // Create top and bottom flip elements
  const topFlip = document.createElement("div");
  topFlip.classList.add("top-flip");

  const bottomFlip = document.createElement("div");
  bottomFlip.classList.add("bottom-flip");

  // Set initial text content for top and bottom halves
  topHalf.textContent = formatStartNum;
  bottomHalf.textContent = formatStartNum;

  // Set text content for top and bottom flip elements
  topFlip.textContent = formatStartNum;
  bottomFlip.textContent = formatNum;

  // Event listener for the start of the top flip animation
  topFlip.addEventListener("animationstart", (e) => {
    topHalf.textContent = formatNum;
  });

  // Event listener for the end of the top flip animation
  topFlip.addEventListener("animationend", (e) => {
    topFlip.remove();
  });

  // Event listener for the end of the bottom flip animation
  bottomFlip.addEventListener("animationend", (e) => {
    bottomHalf.textContent = formatNum;
    bottomFlip.remove();
  });

  // Append top and bottom flip elements to the timer element
  timer.append(topFlip, bottomFlip);
}
