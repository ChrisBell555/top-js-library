const myLibrary = []

function Book(name, author, pages, isRead) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

function addToLibrary(name, author, pages, isRead) {

    const book = new Book(name, author, pages, isRead);

    myLibrary.push(book);

}


addToLibrary("The Hobbit", "J.R.R Tolkien", 192, true);
addToLibrary("Helsreach", "Aaron Dembski-Bowden", 256, true);