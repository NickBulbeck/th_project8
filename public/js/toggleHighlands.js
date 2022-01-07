const toggleHighlands = () => {
  const bookstore = document.getElementById("bookstore");
  const toggleSpan = document.getElementById("toggleText");
  const showBookstore = " to re-display the data fields.";
  const hideBookstore = " to hide the Bookstore and admire the Scottish Highlands."
  if (toggleText.textContent.includes("hide")) {
    toggleSpan.textContent = showBookstore;
    bookstore.classList.add("transparent");
  } else {
    toggleSpan.textContent = hideBookstore;
    bookstore.classList.remove("transparent");
  }
}