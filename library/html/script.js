// Sample book data
const books = [
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Fiction", borrowed: false },
    { title: "To Kill a Mockingbird", author: "Harper Lee", category: "Fiction", borrowed: false },
    { title: "1984", author: "George Orwell", category: "Dystopian", borrowed: false },
    // Add more books as needed
];

let history = [];

// Function to display books
function displayBooks(filteredBooks = books) {
    const bookList = document.getElementById("bookList");
    bookList.innerHTML = '';
    filteredBooks.forEach((book, index) => {
        const bookItem = document.createElement("div");
        bookItem.className = "book";
        bookItem.textContent = `${book.title} by ${book.author}`;
        bookItem.addEventListener("click", () => showDetails(index));
        bookList.appendChild(bookItem);
    });
}

// Function to show details of a book
function showDetails(index) {
    const detailsContent = document.getElementById("detailsContent");
    const book = books[index];
    detailsContent.innerHTML = `
        <p>Title: ${book.title}</p>
        <p>Author: ${book.author}</p>
        <p>Category: ${book.category}</p>
        <p>Status: ${book.borrowed ? 'Borrowed' : 'Available'}</p>
    `;
    
    const borrowBtn = document.getElementById("borrowBook");
    borrowBtn.onclick = () => borrowBook(index);
}

// Function to borrow a book
function borrowBook(index) {
    const book = books[index];
    if (!book.borrowed) {
        book.borrowed = true;
        history.push(`Borrowed "${book.title}" by ${book.author} on ${new Date().toLocaleDateString()}`);
        updateHistory();
        displayBooks();
        showDetails(index);
    } else {
        alert("This book is already borrowed.");
    }
}

// Function to update history
function updateHistory() {
    const historyList = document.getElementById("historyList");
    historyList.innerHTML = '';
    history.forEach(record => {
        const listItem = document.createElement("li");
        listItem.textContent = record;
        historyList.appendChild(listItem);
    });
}

// Event listener for search bar
document.getElementById("searchBar").addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();
    const filteredBooks = books.filter(book => book.title.toLowerCase().includes(searchTerm));
    displayBooks(filteredBooks);
});

// Initial display of books
displayBooks();
