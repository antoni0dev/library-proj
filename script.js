// Book Class - used to instantiate books

class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    };
}

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
}

// UI Functionality - display books, add books, remove books , clearForm, showAlerts

// Events - submit book, remove book, display books

// Display Books at Page Load

document.addEventListener('DOMContentLoaded', UI.displayBooks());