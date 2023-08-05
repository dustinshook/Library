/* main.js */
const myLibrary = [];

class Book {
    constructor(title, author, pages, read = false) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
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

        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(read);

        return card;
    }
}

const addBookToLibrary = (book) => {
    myLibrary.push(book);
    return book;
};

/* dom loaded */
document.addEventListener('DOMContentLoaded', () => {
    const main = document.getElementById('main');

    myLibrary.push(new Book('The Hobbit', 'J.R.R. Tolkien', 295, true));
    myLibrary.push(new Book('The Fellowship of the Ring', 'J.R.R. Tolkien', 423, true));
    myLibrary.push(new Book('The Two Towers', 'J.R.R. Tolkien', 352, true));

    console.log(myLibrary);

    myLibrary.forEach(book => {
        main.appendChild(book.renderCard());

        //console.log(book.renderCard());
    });
});