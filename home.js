document.addEventListener('DOMContentLoaded', function () {
  const productsContainer = document.getElementById('products-container');
  const cartSummary = document.getElementById('cart-summary');
  const searchBar = document.getElementById('search-bar');
  const userInfoContainer = document.getElementById('user-info');

  let cart = { items: [] };

  function getUserInfo() {
    const { user_name: name, user_email: email } = localStorage;
    return { name, email };
  }

  function displayUserInfo() {
    const { name, email } = getUserInfo();
    if (name && email) userInfoContainer.textContent = `Welcome, ${name} | ${email}`;
  }

  function updateCartSummary() {
    cartSummary.textContent = `Cart: ${cart.items.length} items`;
  }

  function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  function addToCart(product, quantity = 1) {
    if (cart.items.length >= 10) return alert('You can only select up to 10 items.');

    const existingItem = cart.items.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ id: product.id, title: product.title, price: product.price, image: product.image, quantity });
    }

    updateCartSummary();
    saveCartToLocalStorage();
  }

  function handleProductClick(product) {
    window.location.href = `/product.html?id=${product.id}`;
  }

  function displayCart() {
    window.location.href = '/cart.html';
  }

  function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    productCard.innerHTML = `
      <div>
        <img src="${product.image}" alt="${product.title}" class="product-image">
        <div class="product-title">${product.title}</div>
        <div class="product-price">${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)}</div>
        <input type="number" class="quantity-input" value="1" min="1">
        <button class="add-to-cart">Add to Cart</button>
      </div>
    `;

    const addToCartButton = productCard.querySelector('.add-to-cart');
    const quantityInput = productCard.querySelector('.quantity-input');

    addToCartButton.addEventListener('click', () => {
      addToCart(product, parseInt(quantityInput.value, 10));
    });

    productCard.addEventListener('click', (event) => {
      const target = event.target;
      if (target.classList.contains('product-image')) handleProductClick(product);
    });

    productsContainer.appendChild(productCard);
  }

  function filterProducts(searchTerm) {
    const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    displayProducts(filteredProducts);
  }

  searchBar.addEventListener('input', () => filterProducts(searchBar.value));

  function displayProducts(products) {
    productsContainer.innerHTML = '';
    products.forEach(createProductCard);
  }

  fetch('https://fakestoreapi.com/products')
    .then((response) => response.json())
    .then((products) => {
      displayProducts(products);
      cart = JSON.parse(localStorage.getItem('cart')) || { items: [] };
      updateCartSummary();
    })
    .catch((error) => console.error('Error fetching products:', error));

  displayUserInfo();
  cartSummary.addEventListener('click', displayCart);
});
