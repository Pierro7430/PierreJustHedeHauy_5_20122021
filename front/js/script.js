//----------------------------------------AFFICHAGE DES ELEMENTS DANS LE HTML-------------------------------------------

// Fonction qui à partir des Data de l'API va pouvoir insérer les bonnes valeurs et afficher les éléments dans le HTML
function addProducts(products) {

    // En fonction du nombre d'élément dans le le tableau products, ma fonction effectue les tâches suivantes
    for(let i= 0; i < products.length; i++) {

        // Déclaration de la variable associé au HTML
        let items = document.getElementById('items');
        // Déclaration de la variable qui va créer une balise <a>
        let productLink = document.createElement('a');
        // Ajout du href avec l'url de la page produit. L'ajout du '?' à la fin permet d'ajouter à la suite l'ID du produit correspondant (methode GET)
        productLink.href = './product.html?' + "idProduct=" + products[i]._id;
        // Création de la balise dans le HTML
        items.appendChild(productLink);


        // Déclaration de la variable qui va créer une balise <article>
        let productArticle = document.createElement('article');
        // Création de la balise dans le HTML
        productLink.appendChild(productArticle);


        // Déclaration de la variable qui va créer une balise <img>
        let productImg = document.createElement('img');
        // Ajout de la source de l'image correspondante au produit
        productImg.src = products[i].imageUrl;
        // Ajout de l'alt de l'image correspondante au produit
        productImg.alt = products[i].altTxt;
        // Création de la balise dans le HTML
        productArticle.appendChild(productImg);


        // Déclaration de la variable qui va créer une balise <h3>
        let productTitle = document.createElement('h3');
        // Ajout d'une classe à la balise
        productTitle.classList.add('productName');
        // Ajout d'un texte, ici le nom du produit correspondant
        productTitle.innerText = products[i].name;
        // Création de la balise dans le HTML
        productArticle.appendChild(productTitle);


        // Déclaration de la variable qui va créer une balise <p>
        let productDescription = document.createElement('p');
        // Ajout d'une classe à la balise
        productDescription.classList.add('productDescription');
        // Ajout du texte correspondant au produit
        productDescription.innerText = products[i].description;
        // Création de la balise dans le HTML
        productArticle.appendChild(productDescription);

    }
}

//----------------------------------------AFFICHAGE DES ELEMENTS DANS LE HTML-------------------------------------------




//-----------------------------------------------AU CHARGEMENT DE LA PAGE-----------------------------------------------

// Récupération des data de l'API
function init() {
    fetch('http://localhost:3000/api/products', {
        method: 'GET',
        headers: {'Content-type': 'application/json;charset=UTF-8'}
    })
    .then(response => response.json())
    .then(data => addProducts(data))
    .catch(error => alert('Impossible de récupérer les datas de l\'API'));
}

// Au chargement de la page, lancement de la fonction init
init();

//-----------------------------------------------AU CHARGEMENT DE LA PAGE-----------------------------------------------