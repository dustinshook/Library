/* main.js */
const myLibrary = [];

class Book {
    constructor(title, author, pages, read = false) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    get title() {
        return this._title;
    }

    set title(title) {
        if (typeof title !== 'string') {
            throw new Error('Title must be a string');
        }
        this._title = title;
    }

    info() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'read' : 'not read yet'}`;
    }

    renderCard() {
        const card = document.createElement('div');
        card.classList.add('card');

        const title = document.createElement('span');
        title.classList.add('title');
        title.textContent = this.title;
        
        const author = document.createElement('span');
        author.classList.add('author');
        author.textContent = this.author;

        const pages = document.createElement('span');
        pages.classList.add('pages');
        pages.textContent = `${this.pages} pages`;

        const read = document.createElement('span');
        read.classList.add('read');
        read.textContent = this.read ? 'read' : 'not read yet';

        const footer = document.createElement('div');
        footer.classList.add('footer');

        footer.innerHTML = `
            <div class="btn" id="edit-book"><i class="fa-regular fa-pen-to-square"></i></div>
            <div class="btn" id="remove-book"><i class="fa-regular fa-trash-can"></i></div>
            `;

        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(read);
        card.appendChild(footer);

        footer.addEventListener('click', (e) => {
            if (e.target.closest('#remove-book')) {
                card.remove();
                myLibrary.splice(myLibrary.indexOf(this), 1);
            } 
        });

        this.card = card;

        return this.card;
    }

}

const addBookToLibrary = (book) => {
    myLibrary.push(book);
    return book;
};

/* dom loaded */
document.addEventListener('DOMContentLoaded', () => {
    const main = document.getElementById('main');
    const addBook = document.getElementById('add-book');

    myLibrary.push(new Book('The Hobbit', 'J.R.R. Tolkien', 295, true));
    myLibrary.push(new Book('The Fellowship of the Ring', 'J.R.R. Tolkien', 423, true));
    myLibrary.push(new Book('The Two Towers', 'J.R.R. Tolkien', 352, true));

    console.log(myLibrary);

    myLibrary.forEach(book => {
        main.appendChild(book.renderCard());
    });

    addBook.addEventListener('click', () => {
        const title = prompt('Title');
        const author = prompt('Author');
        const pages = prompt('Pages');
        const read = confirm('Read?');

        const book = new Book(title, author, pages, read);
        myLibrary.push(book);
        main.appendChild(book.renderCard());
    });
});