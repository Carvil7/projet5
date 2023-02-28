//index

// Contact de l'API , appel des fonctions pour l'ajout des éléments dans le DOM
async function init() {
  try {
    // on récupère les données de l'API
    const response = await fetch('http://localhost:3000/api/products');
    // on transforme les données en objet JSON
    const data = await response.json();
    // on log l'objet dans la console du navigateur pour vérifier les données
    console.log(data);
    
    // on récupère la section avec id = "items"
    const sectionItems = document.getElementById('items');

    // on parcours les data
    for (let i = 0; i < data.length; i++) {
      // info du produit
      const productData = data[i];

      // on créé un élément <a>
      const aElement = document.createElement('a');
      aElement.setAttribute('href', 'product.html?id='+productData._id);
      
      // on créé un élément <img>
      const imgElement = document.createElement('img');
      imgElement.setAttribute('src', productData.imageUrl);
      
      // on créé un élément <h3>
      const h3Element = document.createElement('h3');
      h3Element.innerHTML = productData.name;
      
      // on créé un élément <p>
      const pElement = document.createElement('p');
      pElement.innerHTML = productData.description;

      // on créé un élément <article>
      const articleElement = document.createElement('article');

      // on ajoute dans <article> : img, h3 et p
      articleElement.appendChild(imgElement);
      articleElement.appendChild(h3Element);
      articleElement.appendChild(pElement);
      // on ajoute l'article dans le <a>
      aElement.appendChild(articleElement);
      // on ajoute le <a> dans sectionItems
      sectionItems.appendChild(aElement);
    }
  } catch (error) {
    alert(`Serveur indisponible : ' ${error}`);
  }
}

init();