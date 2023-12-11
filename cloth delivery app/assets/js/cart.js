document.addEventListener('DOMContentLoaded', function () {
    const cart = loadCart();
    const cartItemsContainer = document.getElementById('cart-items-container');
    let totalCartPrice = 0;

    cart.items.forEach(item => {
        const cartItemElement = createCartItemElement(item);
        totalCartPrice += item.price * item.quantity;

        const removeButton = createRemoveButton(item);
        cartItemElement.appendChild(removeButton);
        cartItemsContainer.appendChild(cartItemElement);
    });

    const totalCartPriceElement = createTotalCartPriceElement(totalCartPrice);
    cartItemsContainer.appendChild(totalCartPriceElement);

    updateCartSummary();

    function loadCart() {
        return JSON.parse(localStorage.getItem('cart')) || { items: [], total: 0 };
    }

    function createCartItemElement(item) {
        const cartItemElement = document.createElement('div');
        cartItemElement.innerHTML = `
            <div>
                <img src="${item.image}" alt="${item.title}" style="max-width: 50px; max-height: 50px; margin-right: 10px;">
                <span>${item.title} - ${new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                }).format(item.price)} x ${item.quantity}</span>
                <span>Total: ${new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                }).format(item.price * item.quantity)}</span>
            </div>
        `;
        return cartItemElement;
    }

    function createRemoveButton(item) {
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
            cart.total -= item.price * item.quantity;
            cart.items = cart.items.filter(i => i.id !== item.id);
            saveCartAndDisplay();
        });
        return removeButton;
    }

    function createTotalCartPriceElement(totalPrice) {
        const totalCartPriceElement = document.createElement('div');
        totalCartPriceElement.textContent = `Total Cart Price: $${totalPrice.toFixed(2)}`;
        return totalCartPriceElement;
    }

    function updateCartSummary() {
        const cartSummary = document.getElementById('cart-summary');
        if (cartSummary) {
            cartSummary.textContent = `Cart: $${cart.total.toFixed(2)} (${cart.items.length} items)`;
        } else {
            console.error('Cart summary element not found.');
        }
    }

    function saveCartAndDisplay() {
        cart.total = totalCartPrice;
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    }

    function displayCart() {
        window.location.reload();
    }

    function clearCart() {
        cart.total = 0;
        cart.items = [];
        saveCartAndDisplay();
    }
});
