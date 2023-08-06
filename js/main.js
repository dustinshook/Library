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

        card.innerHTML = `
            <div class="header">
                <span class="title">${this.title}</span>
            </div>
            <div class="body">
                <div class="info-group">
                    <span class="label">Author:</span>
                    <span class="author">${this.author}</span>
                </div>
                <div class="info-group">
                    <span class="label">Pages:</span>
                    <span class="pages">${this.pages}</span>
                </div>
            </div>
            <div class="footer">
                <div class="btn" id="edit-book">
                    <i class="fa-regular fa-pen-to-square"></i>
                </div>
                <div class="btn" id="remove-book">
                    <i class="fa-regular fa-trash-can"></i>
                </div>
            </div>
        `;

        card.addEventListener('click', (e) => {
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
        main.querySelectorAll('.card').forEach(card => card.remove());

        const formCard = document.createElement('form');
        formCard.classList.add('card');
        formCard.innerHTML = `
            <div class="header">
                <span class="title">Add Book</span>
            </div>
            
            <div class="body">
                <input type="text" name="title" id="title" placeholder="Title" required>
                <input type="text" name="author" id="author" placeholder="Author" required>
                <input type="number" name="pages" id="pages" placeholder="Pages" required>
            </div>
            <div class="footer">
                <button type="submit" class="form-btn" id="submit-book">Add Book</button>
            </div>
        `;

        formCard.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = e.target.querySelector('#title').value;
            const author = e.target.querySelector('#author').value;
            const pages = e.target.querySelector('#pages').value;

            const book = new Book(title, author, pages);
            addBookToLibrary(book);
            myLibrary.forEach(book => {
                main.appendChild(book.renderCard());
            });

            formCard.remove();
        });

        main.appendChild(formCard);
    });
});