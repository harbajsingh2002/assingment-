  document.addEventListener('DOMContentLoaded', function () {
    const productDetailContainer = document.getElementById('product-detail-container');
    const productDetailImage = document.getElementById('product-detail-image');
    const productDetailTitle = document.getElementById('product-detail-title');
    const productDetailPrice = document.getElementById('product-detail-price');
    const addToCartDetailButton = document.getElementById('add-to-cart-detail');
    let cart = JSON.parse(localStorage.getItem('cart')) || { total: 0, items: [] };
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then((response) => response.json())
      .then((product) => {
        productDetailImage.src = product.image;
        productDetailTitle.textContent = product.title;
        productDetailPrice.textContent = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(product.price);
        addToCartDetailButton.addEventListener('click', () => {
          addToCart(product);
        });
      })
      .catch((error) => console.error('Error fetching product details:', error));
    function addToCart(product) {
      const existingProduct = cart.items.find((item) => item.id === product.id);
      if (existingProduct) {
        if (existingProduct.quantity < 10) {
          existingProduct.quantity += 1;
          cart.total += product.price;
        } else {
          alert('Maximum quantity reached (10 items).');
        }
      } else {
        product.quantity = 1;
        cart.total += product.price;
        cart.items.push(product);
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      alert('Product added to the cart!');
    }
  });
