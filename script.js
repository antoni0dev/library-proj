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

        const books = Storage.getBooks();
        books.forEach(book => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');
        row.innerHTML = `<td>${book.title}</td>
                         <td>${book.author}</td>
                         <td>${book.isbn}</td>
                         <td><a href="#" style="color: black; text-decoration: none" class="delete">X</a></td>`;

        list.appendChild(row);
    }

    static deleteBook(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static clearForm() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    };

    static showAlert(message) {

        const div = document.createElement('div');
        div.className = 'alert';
        div.appendChild(document.createTextNode(message));
        div.style.height = '50px';
        div.style.width = '375px'
        div.style.textAlign = 'left';
        div.style.padding = '15px';
        div.style.color = '#black';
        div.style.fontFamily = 'inherit';

        if (message.includes('Error')) {
            div.style.backgroundColor = '#ff6961';
        } else if (message.includes('Success')) {
            div.style.backgroundColor = '#90EE90';
        } else {
            div.style.backgroundColor = '#34bbfa';         
        }

        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        
        container.insertBefore(div, form);

        // Remove alert after 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
}

// Storage Functionality

class Storage {
    static getBooks() {
        let books;

        if (!localStorage.getItem('books') === null) {
            books = []
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book) {
        const books = Storage.getBooks();
        
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static deleteBook(isbn) {
        const books = Storage.getBooks();

        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        })

        localStorage.setItem('books', JSON.stringify(books));
    }
}

// Events - submit book, remove book, display books

// Display Books at Page Load
document.addEventListener('DOMContentLoaded', UI.displayBooks());

// Read Form Data and Submit Book to List and Storage
const form = document.querySelector('#book-form');
form.addEventListener('submit', e => {
    e.preventDefault();

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    if (title === '' || author === '' || isbn === '') {
        // Show error message
        UI.showAlert('Error: Please fill in all fields!');
    } else {
        const book = new Book(title, author, isbn);

        // Add New Book to List
        UI.addBookToList(book);

        // Clear Form
        UI.clearForm();

        // Add Book to Local Storage
        Storage.addBook(book);

        // Show success message
        UI.showAlert('Success!');
    }
});

// Delete Book from List
document.querySelector('#book-list').addEventListener('click', e => {
    UI.deleteBook(e.target); 

    Storage.deleteBook(e.target.parentElement.previousElementSibling.textContent);

    UI.showAlert('Book was successfully removed!');
});