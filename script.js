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
        let books;

        // books = Store.getBooks();

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