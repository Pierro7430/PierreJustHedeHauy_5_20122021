//fontion qui a partir des Data de l'API va pouvoir insérer les bonnes valeurs
function addProducts(products) {
    //en fonction du nombre d'élément dans le le tableau products, ma fonction effectue les tâches suivantes
    for(let i= 0; i < products.length; i++)
        {
            //on crée une balise a 
            let productLink = document.createElement("a");
            //on lui ajoute le href avec l'url de la page produit et son id correspondant
            productLink.href = "./product.html?" + products[i]._id;
            //Déclaration de la variable associée au HTML 
            let items = document.getElementById("items");
            //on ajoute la balise dans le HTML
            items.appendChild(productLink);

            //on crée une balise article
            let productArticle = document.createElement("article");
            //on ajoute la balise dans le HTML
            productLink.appendChild(productArticle);

            //on crée une balise img
            let productImg = document.createElement("img");
            //on donne la source de l'image correspondante au produit
            productImg.src = products[i].imageUrl;
            //on donne l'alt de l'image correspondante au produit
            productImg.alt = products[i].altTxt;
            //on ajoute la balise dans le HTML
            productArticle.appendChild(productImg);

            //on crée une balise h3
            let productTitle = document.createElement("h3");
            //on ajoute une classe à la balise
            productTitle.classList.add('productName');
            //on met le texte correspondant au produit
            productTitle.innerText = products[i].name;
            //on ajoute la balise dans le HTML
            productArticle.appendChild(productTitle);

            //on crée une balise p
            let productDescription = document.createElement("p");
            //on ajoute une classe à la balise
            productDescription.classList.add('productDescription');
            //on met le texte correspondant au produit
            productDescription.innerText = products[i].description;
            //on ajoute la balise dans le HTML
            productArticle.appendChild(productDescription);

        }
}

//récupération des data de l'API
fetch("http://localhost:3000/api/products")
    .then(response => response.json())
    .then (data => addProducts(data))


    