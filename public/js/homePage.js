const areYouSure = () => {
  document.getElementById('areYouSureDiv').classList.remove('hidden');
}

const no = () => {
  document.getElementById('areYouSureDiv').classList.add('hidden');
}

const maxQuordleplean = () => {
  document.getElementById('douglasAdamsButton').textContent = "Please do not press this button again";
}

const pageData = () => {
  const booksPerPage = document.getElementById('selectNumber').value;
  const bookArray = Array.from(document.querySelectorAll('tr.book'));
  const pages = Math.ceil(bookArray.length / booksPerPage);
  return {
    booksPerPage,
    bookArray,
    pages
  }
}

const showPage = (page) => {
  const books = pageData().bookArray;
  console.log(books);
  const booksPerPage = pageData().booksPerPage;
  books.forEach(book => {
    book.classList.add('hidden');
  })
  const start = booksPerPage * (page - 1);
  const end = (booksPerPage * page) < books.length ? booksPerPage * page : books.length;
  console.log(pageData().booksPerPage); 
  console.log("page: ", page, "books.length: ", books.length);
  console.log("start: ",start, "end: ", end);
  for (let i=start; i < end; i++) {
    books[i].classList.remove('hidden');
  }
}


const appendPaginationLinks = () => {
  const linkDiv = `
    <div id="linkDiv" class="linkDiv">
      <ul id="linkUl">
      </ul>
    </div>
  `
  document.getElementById('wrapper')
          .insertAdjacentHTML('beforeend',linkDiv);

  const pages = pageData().pages;
  // create the pagination div with the ul inside it.
  for (i=1; i<=pages; i++) {
    const li = document.createElement('li');
    li.innerHTML = `<a href="#">${i}</a>`
    li.addEventListener('click',(event) => {
      showPage(event.target.textContent);
    });
    document.getElementById('linkUl').appendChild(li);
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

if (pageData().bookArray.length > 0) {
  appendPaginationLinks();
  // showPage(1);
}  


