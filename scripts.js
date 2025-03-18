const myLibrary = []
let isLibraryOpen = false;

class Book {

    constructor(name, author, pages, isRead) {
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }

    changeReadValue() {
        this.isRead = !this.isRead;
    }
}



function addToLibrary(name, author, pages, isRead) {
    // Creates a new Book object and adds it to the global myLibrary array
    // TODO: Separate out the creation and push of Books
    const book = new Book(name, author, pages, isRead);

    myLibrary.push(book);
}

function changeLibraryView() {
    // Checks if library is open or closed and changes the view
    if (!isLibraryOpen) {
        openLibrary();
        isLibraryOpen = true;
    }
    else {
        closeLibrary();
        isLibraryOpen = false;
    }
}

function openLibrary() {
    // Iterates through each Book and calls function to display on page
    for (existingBook of myLibrary) {
        displayBook(existingBook);
    }

    libraryViewer.textContent = "Close Library";
}

function closeLibrary() {
    // Removes all elements within the library container
    const contentContainer = document.querySelector(".content");
    contentContainer.replaceChildren();

    libraryViewer.textContent = "View Library";
}

function displayBook(book) {
    // Adds a single Book to the page to be displayed
    const bookDiv = document.createElement("div");
    bookDiv.setAttribute("data-index", myLibrary.indexOf(book));
    bookDiv.classList.add("book");


    const bookButtonsDiv = document.createElement("div");
    bookButtonsDiv.classList.add("book-buttons");

    const bookImg = document.createElement("input");
    bookImg.type = "image";
    bookImg.src = "images/book.png";
    bookImg.classList.add("read-book")

    const deleteImg = document.createElement("input");
    deleteImg.type = "image";
    deleteImg.src = "images/delete.png";
    deleteImg.classList.add("delete-book");

    bookImg.addEventListener("click", updateBookReadValue);
    deleteImg.addEventListener("click", deleteBook);


    bookButtonsDiv.appendChild(bookImg);
    bookButtonsDiv.appendChild(deleteImg);


    const nameP = document.createElement("p");
    nameP.classList.add("name");
    nameP.textContent = book.name;
    const authorP = document.createElement("p");
    authorP.classList.add("author");
    authorP.textContent = book.author;
    const pagesP = document.createElement("p");
    pagesP.classList.add("pages");
    pagesP.textContent = `${book.pages} pages`;
    const isReadP = document.createElement("p");
    isReadP.classList.add("is-read");
    isReadP.textContent = `${book.isRead ? "Read" : "Not read"}`;

    

    bookDiv.appendChild(bookButtonsDiv);
    bookDiv.appendChild(nameP);
    bookDiv.appendChild(authorP);
    bookDiv.appendChild(pagesP);
    bookDiv.appendChild(isReadP);
    

    contentContainer.appendChild(bookDiv);
}


function newBookSubmit(event) {
    // On submit will create a new Book object and displays it if the library is currently open
    event.preventDefault();    

    const formData = new FormData(event.target);
    const formProps = Object.fromEntries(formData);

    addToLibrary(formProps.name, formProps.author, formProps.pages, formProps.isRead);

    if (isLibraryOpen) {
        displayBook(myLibrary[myLibrary.length - 1]);
    }

    newBookForm.reset();
    newBookModal.style.display = "none";
}

function deleteBook(event) {

    const divToDelete = event.target.parentElement.parentElement;
    const bookToDelete = divToDelete.getAttribute("data-index");

    myLibrary.splice(bookToDelete, 1);
    divToDelete.remove();

    // Needed to prevent incorrect data-index on elements
    if (isLibraryOpen) {
        closeLibrary();
        openLibrary();
    }
}

function updateBookReadValue(event) {
    const divToUpdate = event.target.parentElement.parentElement;
    const bookToUpdate = divToUpdate.getAttribute("data-index");

    myLibrary[bookToUpdate].changeReadValue();

    // Needed to update the displayed data
    if (isLibraryOpen) {
        closeLibrary();
        openLibrary();
    }
}



const contentContainer = document.querySelector(".content");

const newBookForm = document.querySelector(".modal-form");
newBookForm.addEventListener("submit", newBookSubmit)

const libraryViewer = document.querySelector('#library');
libraryViewer.addEventListener("click", changeLibraryView);





// Modal behaviour

const newBookButton = document.querySelector("#new-book");
const newBookModal = document.querySelector(".modal");
const newBookClose = document.querySelector(".close");
newBookButton.onclick = function() {
    newBookModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
newBookClose.onclick = function() {
    newBookModal.style.display = "none";
  }

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == newBookModal) {
        newBookModal.style.display = "none";
    }
  }




addToLibrary("The Hobbit", "J.R.R Tolkien", 192, false);
addToLibrary("Helsreach", "Aaron Dembski-Bowden", 256, true);