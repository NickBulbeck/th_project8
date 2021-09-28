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
  // unlike with Project 2, the array is always all the table rows in the app.
  // This is because the search is always handled at the back end.
}


const appendPaginationLinks = () => {
  const pageLink = (event) => {
    // event listener
  }
// Target HTML is here:
// <div id="linkDiv" class="pagination">
//   <ul>
//     <li><a href="#" class="active">1</a></li>
//     <li><a href="#">2</a></li>
//     <li><a href="#">3</a></li>
//     <li><a href="#">4</a></li>
//     <li><a href="#">5</a></li>
//     <li><a href="#">6</a></li>
//     <li><a href="#">7</a></li>
//   </ul>
// </div>
  const pages = Math.ceil(bookArray.length / booksPerPage);
  // create the pagination div with the ul inside it.
  for (i=1; i<=pages; i++) {
    // create the <li> and add the event-listener to it.
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


