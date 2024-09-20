// Array of books
const books = [
    { id: 1, title: "Book One", author: "Author One", price: 12.99, img: "1.jpeg" },
    { id: 2, title: "Book Two", author: "Author Two", price: 9.99, img: "2.jpg" },
    { id: 3, title: "Book Three", author: "Author Three", price: 15.49, img: "3.webp" },
    { id: 4, title: "Book Four", author: "Author Four", price: 7.99, img: "4.jpg" }
];

// Search functionality
document.getElementById('search-button')?.addEventListener('click', () => {
    const query = document.getElementById('search-input').value.toLowerCase();
    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query)
    );
    displayBooks(filteredBooks);
});

// Populate the book catalog on the main page
function displayBooks(booksToDisplay) {
    const bookList = document.getElementById('book-list');
    if (!bookList) return;
    
    bookList.innerHTML = ''; // Clear previous list
    booksToDisplay.forEach(book => {
        const bookItem = document.createElement('div');
        bookItem.classList.add('book-item');
        bookItem.innerHTML = `
            <img src="${book.img}" alt="${book.title}">
            <h3>${book.title}</h3>
            <p>By ${book.author}</p>
            <p>$${book.price.toFixed(2)}</p>
            <button onclick="addToCart(${book.id})">Add to Cart</button>
        `;
        bookList.appendChild(bookItem);
    });
}

// Load books on page load
document.addEventListener('DOMContentLoaded', () => {
    displayBooks(books);
});

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add book to cart
function addToCart(bookId) {
    const book = books.find(b => b.id === bookId);
    if (book) {
        cart.push(book);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${book.title} has been added to the cart.`);
    }
}

// Display cart on cart page
function displayCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPriceEl = document.getElementById('total-price');
    if (!cartItems || !totalPriceEl) return;
    
    cartItems.innerHTML = ''; // Clear previous cart items
    let totalPrice = 0;
    cart.forEach((book, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <h3>${book.title}</h3>
            <p>$${book.price.toFixed(2)}</p>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItems.appendChild(cartItem);
        totalPrice += book.price;
    });
    totalPriceEl.textContent = totalPrice.toFixed(2);
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

// Redirect to checkout page on button click
document.getElementById('checkout-button')?.addEventListener('click', function() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
    } else {
        window.location.href = 'checkout.html';
    }
});

// Load cart on cart page
if (window.location.pathname.includes('cart.html')) {
    displayCart();
}