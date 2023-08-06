/* main.js */
const myLibrary = [];

class Book {
    constructor(title, author, pages, genre, read = false) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.genre = genre;
        this.read = read;
    }

    renderCard() {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <div class="header truncate">
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
                <div class="info-group">
                    <span class="label">Genre:</span>
                    <span class="genre">${this.genre}</span>
                </div>
                <div class="info-group">
                    <span class="label">Status:</span>
                    <span class="status">${this.read ? 'Read' : 'Not Read'}</span>
                </div>
            </div>
            <div class="footer">
                <div class="btn" id="read-book">
                    <i class="fa-regular fa-bookmark ${this.read ? 'fas' : ''}"></i>
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

            if (e.target.closest('#read-book')) {
                e.target.closest('i').classList.toggle('fas');
                this.read = !this.read;
                card.querySelector('.status').textContent = this.read ? 'Read' : 'Not Read';
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

    myLibrary.push(new Book('To Kill a Mockingbird', 'Harper Lee', 281, 'Southern Gothic', false));
    myLibrary.push(new Book('A Brief History of Time', 'Stephen Hawking', 256, 'Popular Science', true));
    myLibrary.push(new Book('The Name of the Wind', 'Patrick Rothfuss', 662, 'Fantasy', true));

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
                <input type="text" name="genre" id="genre" placeholder="Genre" required>
            </div>
            <div class="footer">
                <button type="submit" class="form-btn" id="submit-book">Confirm</button>
            </div>
        `;

        formCard.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = e.target.querySelector('#title').value;
            const author = e.target.querySelector('#author').value;
            const pages = e.target.querySelector('#pages').value;
            const genre = e.target.querySelector('#genre').value;

            const book = new Book(title, author, pages, genre);
            addBookToLibrary(book);
            myLibrary.forEach(book => {
                main.appendChild(book.renderCard());
            });

            formCard.remove();
        });

        main.appendChild(formCard);
    });
});