const elementFromHTML = (html) => {
    const template = document.createElement('template');

    template.innerHTML = html.trim();
    return template.content.firstChild;
};

class Library {
    constructor(book) {
        this._book = book;
        
        this._createLib();
    };

    // getters/setters

    // public methods

    // private methods
    _createLib() {
        const library = document.querySelector('.library > .g-card');
        const books = elementFromHTML(
            `
                <div id="${this._book.title}" class="card">
                    <img src="${this._book.cover}" alt="" class="card__img-top" />

                    <div class="card__body">
                        <h5 class="card__title">${this._book.title}</h5>
                        <p class="card__text">${this._book.author}</p>
                        <p class="card__text">${this._book.page} pages</p>

                        <div style="margin: .5rem 0";>
                            <button type="button" class="status-btn" data-jsx-status="" value="${this._book.is_read}"></button>
                        </div>
                        
                        <span class="d-flex gap flex-direction" style="--gap-sz: .5rem; --flex-direction: row;">
                            <button type="button" data-jsx-delete="">
                                <i class="bi bi-trash3-fill"></i>
                            </button>
                            <button type="button" data-jsx-update="" data-jsx-toggle="modal" data-jsx-target="#updateBook">
                                <i class="bi bi-pencil-fill"></i>
                            </button>
                        </span>
                    </div>
                </div>
            `
        );

        library.appendChild(books);
    }

    // static methods
};


class Book {
    constructor(cover, title, author, page, isRead) {
        this._cover = cover;
        this._title = title;
        this._author = author;
        this._page = page;
        this._isRead = isRead;

        this._initLibrary();
    };

    // getters/setters

    // public methods

    // private methods
    _initLibrary() {
        return new Library({
            cover: this._cover,
            title: this._title,
            author: this._author,
            page: this._page,
            is_read: this._isRead
        });
    }

    // static methods
    static clickHandler(event) {
        const cover = document.querySelector('[data-jsx-input-for="cover"]');
        const title = document.querySelector('[data-jsx-input-for="title"]');
        const author = document.querySelector('[data-jsx-input-for="author"]');
        const page = document.querySelector('[data-jsx-input-for="page"]');
        const isRead = document.querySelector('[data-jsx-input-for="is_read"]');

        event.preventDefault();
        new Book(cover.value, title.value, author.value, page.value, isRead.checked);

        cover.value = '';
        title.value = '';
        author.value = '';
        page.value = '';
        isRead.checked = false;
    }

    static deleteHandler(event) {
        event.preventDefault();

        this.closest('.card').remove();
    }
};

document.querySelector('.btn').addEventListener('click', Book.clickHandler);

const books = [
    {
        cover: 'https://upload.wikimedia.org/wikipedia/en/9/93/AGameOfThrones.jpg',
        title: 'A Game of Thrones',
        author: 'George R. R. Martin.',
        page: 2,
        isRead: false,
    },
    {
        cover: 'https://upload.wikimedia.org/wikipedia/en/3/39/AClashOfKings.jpg',
        title: 'A Clash of Kings',
        author: 'George R. R. Martin.',
        page: 4,
        isRead: true
    },
    {
        cover: 'https://upload.wikimedia.org/wikipedia/en/2/24/AStormOfSwords.jpg',
        title: 'A Storm of Swords',
        author: 'George R. R. Martin.',
        page: 6,
        isRead: false
    },
    {
        cover: 'https://upload.wikimedia.org/wikipedia/en/a/a3/AFeastForCrows.jpg',
        title: 'A Feast for Crows',
        author: 'George R. R. Martin.',
        page: 8,
        isRead: true
    },
    {
        cover: 'https://upload.wikimedia.org/wikipedia/en/5/5d/A_Dance_With_Dragons_US.jpg',
        title: 'A Dance with Dragons',
        author: 'George R. R. Martin.',
        page: 10,
        isRead: false
    }
];

window.addEventListener('load', () => {
    for (const book of books) {
        new Book(book.cover, book.title, book.author, book.page, book.isRead);
    }

    document.querySelectorAll('[data-jsx-delete]')
        .forEach((selector) => {
            selector.addEventListener('click', Book.deleteHandler);
        });

    document.querySelectorAll('.status-btn')
        .forEach((selector) => {
            if (selector.value === 'true') {
                selector.setAttribute('data-jsx-status', 'Read');
            } else {
                selector.setAttribute('data-jsx-status', 'Not read');
            }

            selector.addEventListener('click', (event) => {
                event.preventDefault();

                const target = event.target.closest('.status-btn');

                if (target.value === 'true') {
                    target.value = false;
                    target.setAttribute('data-jsx-status', 'Read');
                } else {
                    target.value = true;
                    target.setAttribute('data-jsx-status', 'Not read');
                }
            });
        });
});


// modal
document.querySelectorAll('[data-jsx-toggle="modal"]')
    .forEach((selector) => {
        selector.addEventListener('click', (event) => {
            const THIS = event.target.closest('[data-jsx-toggle="modal"]');
            const target = document.querySelector(THIS.dataset.jsxTarget);

            event.preventDefault();

            target.showModal();
        });
    });

window.addEventListener('keydown', (event) => {
    if (event.key === '/') {
        event.preventDefault();
        document.querySelector('#searchBook').showModal();
    }
});

document.querySelectorAll('[data-jsx-dismiss="modal"]')
    .forEach((selector) => {
        selector.addEventListener('click', (event) => {
            const THIS = event.target.closest('[data-jsx-dismiss="modal"]');
            const target = THIS.closest(`.${THIS.dataset.jsxDismiss}`);

            event.preventDefault();

            target.close();
        });
    });
