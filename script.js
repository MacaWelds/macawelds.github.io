document.addEventListener('DOMContentLoaded', function () {
  var menuItems = document.querySelectorAll('.menu > li');
  for (var i = 0; i < menuItems.length; i++) {
    menuItems[i].addEventListener('mouseover', function () {
      var subMenu = this.querySelector('ul');
      if (subMenu) {
        subMenu.style.display = 'block';
      }
    });
    menuItems[i].addEventListener('mouseout', function () {
      var subMenu = this.querySelector('ul');
      if (subMenu) {
        subMenu.style.display = 'none';
      }
    });
  }


  var orderDetails = [];

  function updateCart() {
    var cartItemsContainer = document.querySelector('.cart-items');
    var totalPrice = 0;
    cartItemsContainer.innerHTML = '';

    for (var i = 0; i < orderDetails.length; i++) {
      var item = orderDetails[i];
      cartItemsContainer.innerHTML += `
        <div>
          <span>${item.quantity}x ${item.name} - ${item.color} - $${item.price}</span>
          <button class="change-quantity" data-index="${i}">Change Quantity</button>
          ${item.changeColor ? `<button class="change-color" data-index="${i}">Change Color</button>` : ''}
          <button class="remove-item" data-index="${i}">Remove</button>
        </div>
      `;
      totalPrice += item.quantity * item.price;
    }

    cartItemsContainer.innerHTML += '<p class="cart-total">Total: $' + totalPrice.toFixed(2) + '</p>';
  }

  function copyOrderToClipboard() {
    var orderText = '';
    var totalPrice = 0;

    for (var i = 0; i < orderDetails.length; i++) {
      var item = orderDetails[i];
      orderText += item.quantity + 'x (' + item.color + ')' + item.name + ' - $' + item.price.toFixed(2) + '\n';
      totalPrice += item.quantity * item.price;
    }

    orderText += 'Total: $' + totalPrice.toFixed(2);
    navigator.clipboard.writeText(orderText).then(function () {
      alert('Order details copied to clipboard! \n \n  Please click Email link and paste your order ready to send. \n  Ctrl + V to paste. \n Click and hold in Text area if ordering from Cell Phone.');
    }, function (error) {
      console.error('Unable to copy order details:  \n Please Refresh the page and try again.', error);
    });
  }

  function changeQuantity(index, newQuantity) {
    orderDetails[index].quantity = newQuantity;
    updateCart();
    saveCartToLocalStorage();
  }

  function changeColor(index, newColor) {
    orderDetails[index].color = newColor;
    updateCart();
    saveCartToLocalStorage();
  }

  function removeItem(index) {
    orderDetails.splice(index, 1);
    updateCart();
    saveCartToLocalStorage();
  }

  function saveCartToLocalStorage() {
    localStorage.setItem('orderDetails', JSON.stringify(orderDetails));
  }

  function loadCartFromLocalStorage() {
    var savedOrderDetails = localStorage.getItem('orderDetails');
    if (savedOrderDetails) {
      orderDetails = JSON.parse(savedOrderDetails);
      updateCart();
    }
  }

  var addToCartButtons = document.querySelectorAll('.add-to-cart-button');
  var floatingCart = document.querySelector('.floating-cart');
  var placeOrderButton = document.querySelector('.place-order-button');

  for (var i = 0; i < addToCartButtons.length; i++) {
    addToCartButtons[i].addEventListener('click', function () {
      var thumbnail = this.closest('.thumbnail');
      var name = thumbnail.querySelector('.details p:first-child').textContent;
      var price = parseFloat(thumbnail.querySelector('.price').textContent.replace('$', ''));
      var quantity = parseInt(thumbnail.querySelector('.quantity-box').value);

      var colorSelect = thumbnail.querySelector('#color-select');
      var color = colorSelect ? colorSelect.value : '';

      orderDetails.push({
        name: name,
        price: price,
        quantity: quantity,
        color: color
      });

      updateCart();
      floatingCart.style.display = 'block';
      saveCartToLocalStorage();
    });
  }

  placeOrderButton.addEventListener('click', function () {
    copyOrderToClipboard();
  });

  var cartItemsContainer = document.querySelector('.cart-items');
  cartItemsContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('change-quantity')) {
      var index = event.target.dataset.index;
      var newQuantity = parseInt(prompt('Enter the new quantity:'));
      if (!isNaN(newQuantity)) {
        changeQuantity(index, newQuantity);
      }
    } else if (event.target.classList.contains('remove-item')) {
      var index = event.target.dataset.index;
      removeItem(index);
    } else if (event.target.classList.contains("change-color")) {
      var currentItemIndex = parseInt(event.target.dataset.index);
      var newColor = prompt("Enter the new color:");
      if (newColor) {
        orderDetails[currentItemIndex].color = newColor;
        updateCart();
        saveCartToLocalStorage();
      }
    }
  });

  // Load cart data from local storage when the page loads
  loadCartFromLocalStorage();
});
