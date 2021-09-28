// const areYouSure = () => {
//   document.getElementById('areYouSureDiv').classList.remove('hidden');
// }

// const no = () => {
//   document.getElementById('areYouSureDiv').classList.add('hidden');
// }

// const maxQuordleplean = () => {
//   document.getElementById('douglasAdamsButton').textContent = "Please do not press this button again";
// }

const booksPerPage = document.getElementById('selectNumber').value;
const bookArray = Array.from(document.getElementsByTagName('tr'));

const showPage = (page) => {
  
}


const paginate = () => {
  const pages = Math.ceil(bookArray.length / booksPerPage);
  for (i=1; i<=pages; i++) {

  }
  /*
  Get an array of all the books fae the back end. This is piped in.
  Get the number of pages with length / perPage
  Set up a loop:
   - Create a page button with i+1 on it
   - add an event-listener to it with a function that
    - hide all the bookArray elements
    - display the ones corresponding to the current page
    - set all the page numbers to inactive
    - set the current yin to active
  Set page 1 button to active and display the first page (using the event-listener function)
  
  Doing this on load:

  */
}

if (bookArray.length > 0) {
  paginate();
  // showPage(1);
}  


