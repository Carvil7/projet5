//page panier

//afficher la liste des produits qui sont dans le panier et récuperer le panier à partir du local storage 

const productDataMap = [];
const basket = getBasket();
const cartItems = document.getElementById('cart__items');

basket.forEach(async (product) => {
    const response = await fetch('http://localhost:3000/api/products/'+product.productId);
    // on transforme les données en objet JSON
    const productApiData = await response.json();
    // stockage du prix pour le produit dans productPriceMap
    productDataMap[productApiData._id] = productApiData;

    // create article element
    const articleElement = document.createElement('article');
    articleElement.setAttribute('class', 'cart__item');
    articleElement.setAttribute('data-id', product.productId);
    articleElement.setAttribute('data-color', product.color);
    
    // image
    const imgContainer = document.createElement('div');
    imgContainer.setAttribute('class', 'cart__item__img');
    const img = document.createElement('img');
    img.setAttribute('src', productApiData.imageUrl);
    imgContainer.appendChild(img);
    // append image to article
    articleElement.appendChild(imgContainer);
    
    // content description ----------------------------------------------------    
    // title
    const h2Element = document.createElement ('h2');
    h2Element.innerHTML = productApiData.name;
    // price
    const priceElement = document.createElement ('p');
    priceElement.innerHTML = productApiData.price + '€';
    // color
    const colorElement = document.createElement ('p');
    colorElement.innerHTML = product.color;
    // append elements
    const itemDescription = document.createElement ('div');
    itemDescription.setAttribute('class', 'cart__item__content__description');
    itemDescription.appendChild(h2Element);
    itemDescription.appendChild(priceElement);
    itemDescription.appendChild(colorElement);
   
    
    // content settings -------------------------------------------------------
    // quantity
    const itemSettingsQuantity = document.createElement ('div');
    itemSettingsQuantity.setAttribute('class', 'cart__item__content__settings__quantity');
    const quantityParagraph = document.createElement ('p');
    quantityParagraph.innerHTML = 'Qté : ';
    const quantityInput = document.createElement('input');
    quantityInput.setAttribute('type', 'number');
    quantityInput.setAttribute('class', 'itemQuantity');
    quantityInput.setAttribute('name', 'itemQuantity');
    quantityInput.setAttribute('min', '1');
    quantityInput.setAttribute('max', '100');
    quantityInput.setAttribute('value', product.quantity);
    itemSettingsQuantity.appendChild(quantityParagraph);
    itemSettingsQuantity.appendChild(quantityInput);

    // gérer la modification
    quantityInput.addEventListener('change', function(event) {
        const element = event.target;
        const cartItem = element.closest('.cart__item');
        const productId = cartItem.dataset.id;
        const productColor = cartItem.dataset.color;
        const basket = getBasket().map(item => {
            if (item.productId === productId && item.color === productColor) {
                return {
                    ...item,
                    quantity: parseInt(element.value)
                };
            }

            return item;
        });

        saveBasket(basket);
        updateDisplay();
    });

    // delete
    const itemSettingsDelete = document.createElement ('div');
    itemSettingsDelete.setAttribute('class', 'cart__item__content__settings__delete');
    const deleteElement = document.createElement('p');
    deleteElement.setAttribute('class', 'deleteItem');
    deleteElement.innerHTML = 'supprimer';
    
    // gérer la suppression
    deleteElement.addEventListener('click', function(event) {
        const element = event.target;
        const cartItem = element.closest('.cart__item');
        const productId = cartItem.dataset.id;
        const productColor = cartItem.dataset.color;

        const basket = getBasket().filter(item => (
            item.productId !== productId 
            || (item.productId === productId && item.color !== productColor))
        );
        saveBasket(basket);
        window.location.reload();
    });

    itemSettingsDelete.appendChild(deleteElement);

    // append to settings
    const itemSettings = document.createElement ('div');
    itemSettings.setAttribute('class', 'cart__item__content__settings');
    itemSettings.appendChild(itemSettingsQuantity);
    itemSettings.appendChild(itemSettingsDelete);

    // append to item content
    const itemContent = document.createElement ('div');
    itemContent.setAttribute('class', 'cart__item__content');
    itemContent.appendChild(itemDescription);
    itemContent.appendChild(itemSettings);
    articleElement.appendChild(itemContent);

    // append to div.cart_items
    cartItems.appendChild(articleElement);
});

updateDisplay();


//affichage du prix total et de la quantité 
//récupérer les éléments HTML 
function updateDisplay() {
    const basket = getBasket();
    let totalQuantity = 0;
    let totalPrice = 0;

    basket.forEach(item => {
        totalQuantity += item.quantity;
        //console.log(item.productId, productDataMap, productDataMap[item.productId]);
       // A CORRIGER totalPrice += item.quantity * productDataMap[item.productId].price;
    });

    // get les element html par leur id ou class (pour la quantité de produit et le prix total)
    const totalQuantityElement = document.getElementById('totalQuantity'); 
    totalQuantityElement.innerHTML= totalQuantity;

    const totalPriceElement = document.getElementById('totalPrice');
    totalPriceElement.innerHTML = totalPrice;
}



// initialisation panier
function getBasket() {
    let basket = localStorage.getItem('basket');
  
    if (basket !== null) {
      return JSON.parse(basket);
    }
  
    return [];
}

// sauvegarder le produit dans le panier de l'API au format JSON
function saveBasket(basket) {
    localStorage.setItem('basket', JSON.stringify(basket));
}