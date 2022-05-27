// Book Class - used to instantiate books
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    };
}

// UI Functionality - display books, add books, remove books , clearForm, showAlerts
class UI {
    static displayBooks() {
        const storedBooks = [
            {
                title: 'Book 1',
                author: 'John Doe',
                isbn: '54123'
            },
            {
                title: 'Book 2',
                author: 'Joe Doe',
                isbn: '24123'
            }
        ];

        // books = Store.getBooks();
        let books = storedBooks;

        books.forEach(book => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');
        row.innerHTML = `<td>${book.title}</td>
                         <td>${book.author}</td>
                         <td>${book.isbn}</td>
                         <td><a href="#" class="delete">X</a></td>`;

        list.appendChild(row);
    }

    static deleteBook(el) {
        const list = document.querySelector('#book-list');

        list.removeChild(el);
    }

    static clearForm() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    };
}

// Events - submit book, remove book, display books

// Display Books at Page Load
document.addEventListener('DOMContentLoaded', UI.displayBooks());

// Read Form Data0
const form = document.querySelector('#book-form');
form.addEventListener('submit', e => {
    e.preventDefault();

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    if (title === '' || author === '' || isbn === '') {
        // Show error message
        showAlert();
    } else {
        const book = new Book(title, author, isbn);

        // Add New Book to List
        UI.addBookToList(book);

        // Clear Form
        UI.clearForm();

        // Add Book to Local Storage

        // Show success message
        showAlert('Book successfully added!');
    }
});

// Delete Book from List
document.querySelector('#book-list').addEventListener('click', e => {
    UI.deleteBook(e.target.parentElement.parentElement); 
});