


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
  const booksPerPage = pageData().booksPerPage;
  books.forEach(book => {
    book.classList.add('hidden');
  })
  const start = booksPerPage * (page - 1);
  const end = (booksPerPage * page) < books.length ? booksPerPage * page : books.length;
  for (let i=start; i < end; i++) {
    books[i].classList.remove('hidden');
  }
}

const appendPaginationLinks = () => {
  const existingLinks = document.getElementById('linkDiv');
  if (existingLinks) {
    existingLinks.remove();
  }
  const linkDiv = document.createElement('div');
  linkDiv.setAttribute('id','linkDiv');
  linkDiv.classList.add('linkDiv');
  linkDiv.innerHTML = `
      <ul id="linkUl">
      </ul>`
  document.getElementById('bookstore')
          .appendChild(linkDiv);
  const pages = pageData().pages;
  for (i=1; i<=pages; i++) {
    const li = document.createElement('li');
    li.innerHTML = `<a href="#bookTable">${i}</a>`
    document.getElementById('linkUl').appendChild(li);
  }
  linkDiv.addEventListener('click',(event) => {
    linkDiv.querySelectorAll('a').forEach(link => {
      link.classList.remove('active');
    })
    showPage(event.target.textContent);
    event.target.classList.add('active');
  })
  linkDiv.getElementsByTagName('A')[0]
    .classList.add('active');
}

document.getElementById('selectNumber')
        .addEventListener('change',(event) => {
          appendPaginationLinks();
          showPage(1);
        })

if (pageData().bookArray.length > 0) {
  appendPaginationLinks();
  showPage(1);
} else {
  console.log("No search results!");
}


