import Book from './book.js';

class BookList {
  constructor() {
    this.books = JSON.parse(localStorage.getItem('books')) || [];
    this.booksCounter = document.querySelector('.books-counter');
    this.displayBooks();
  }

  displayBooks() {
    this.booksCounter.innerHTML = '';

    this.books.forEach((book) => {
      this.li = document.createElement('li');
      this.titleSpan = document.createElement('span');
      this.titleSpan.innerText = book.title;

      this.authorSpan = document.createElement('span');
      this.authorSpan.innerText = book.author;

      this.removeBtn = document.createElement('button');
      this.removeBtn.innerText = 'Remove';
      this.removeBtn.classList.add('remove-btn');
      this.removeBtn.setAttribute('data-id', book.id);

      this.removeBtn.addEventListener('click',
        this.removeBook.bind({ btn: this.removeBtn, books: this.books }));

      this.li.appendChild(this.titleSpan);
      this.li.appendChild(this.authorSpan);
      this.li.appendChild(this.removeBtn);
      this.booksCounter.appendChild(this.li);
    });
  }

  addBook(newBook) {
    this.books.push(newBook);
    localStorage.setItem('books', JSON.stringify(this.books));
    this.displayBooks();
  }

  removeBook() {
    this.li = this.btn.parentNode;
    this.ul = this.li.parentNode;
    this.ul.removeChild(this.li);

    const id = this.btn.getAttribute('data-id');
    const parseId = parseInt(id, 10);

    const index = this.books.findIndex((book) => book.id === parseId);
    this.books.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(this.books));
  }
}

const bookList = new BookList();

// function to add a new book to the collection
const form = document.querySelector('#form-books');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = form.title.value;
  const author = form.author.value;
  const newBook = new Book(title, author);
  bookList.addBook(newBook);
  form.reset();
});
