async function init() {
    // récupéré l'url actuelle sous forme de string
    const currentUrl = window.location.href;
    // on créé un objet URL à partir de currentUrl
    const url = new URL(currentUrl);
    // récupération de l'id du produit à partir de l'url actuelle pour pouvoir appeler l'API
    const id = url.searchParams.get('id');

    // on récupère les données de l'API
    const response = await fetch('http://localhost:3000/api/products/'+id);
    // on transforme les données en objet JSON
    const productData = await response.json();
    // on log l'objet dans la console du navigateur pour vérifier les données
    console.log(productData);
    console.log(getBasket());

    //image du produit 
    const imgElement = document.createElement("img");
    imgElement.setAttribute("src", productData.imageUrl);
    const imgContainer = document.getElementById("image");
    imgContainer.appendChild(imgElement);
    
    // title
    const titleElement = document.getElementById("title");
    titleElement.innerHTML = productData.name;

    // price
    const priceElement = document.getElementById("price");
    priceElement.innerHTML = productData.price;

    // description
    const descriptionElement = document.getElementById("description");
    descriptionElement.innerHTML = productData.description;

    // colors
    const colorsElement = document.getElementById("colors");
    productData.colors.forEach(color => {
        const optionElement = document.createElement("option");
        optionElement.setAttribute("value", color);
        optionElement.innerHTML = color;
        colorsElement.appendChild(optionElement);
    });

    // ajouter un eventListener (onClick) sur le bouton "Ajouter au panier"
    const addToCartButton = document.getElementById("addToCart");
    addToCartButton.addEventListener('click', function(){ 
        const basket = getBasket();
        const quantityInput = document.getElementById("quantity");
        const colorSelect = document.getElementById("colors");

        const newItem = {
            productId: productData._id,
            quantity: parseInt(quantityInput.value),
            color: colorSelect.value
        };

        let existingItemIndex = -1;
        const existingItem = basket.find((item, index) => {
            existingItemIndex = index;
            if (item._id === newItem._id && item.color === item.color) {
                return true; 
            }
            return false;
        });

        if (existingItem !== undefined) {
            newItem.quantity += existingItem.quantity;
            basket[existingItemIndex] = newItem;
        } else {
            basket.push(newItem);
        }

        console.log(basket);
        saveBasket(basket);
    });


    // dans le onclick, récupérer le panier avec getBasket, puis ajouter dans le tableau le produit correspondant, et enfin sauvegarder le panier avec saveBasket


    // prendre en compte également la quantité renseignée dans l'input "quantity" (getElementById pour récupérer l'élément et connaitre la valeur saisie)
   

    // ...
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

init();
