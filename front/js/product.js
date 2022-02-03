//-------------------------------------------------VARIABLES GLOBALES---------------------------------------------------

// Récupération de keys et paramètres dans l'url
let paramsString = window.location.search;
let searchParams = new URLSearchParams(paramsString);

// Récupération de la value de la key idProduct avec la méthode GET (interface URLSearchParams)
let idProduct = searchParams.get("idProduct");


// Déclaration des variables associées au HTML 
let containerImg = document.getElementsByClassName('item__img')[0];
let selectColors = document.getElementById('colors');
let btnAddCart = document.getElementById('addToCart');
let quantityProduct = document.getElementById('quantity');

let infoProduct = {};

//-------------------------------------------------VARIABLES GLOBALES---------------------------------------------------




//--------------------------------------ENVOIE DES PRODUITS DANS LE LOCAL STORAGE---------------------------------------

// Fonction qui met à jour la key et la value de la map avant de l'envoyer dans le Local Storage
function updateMap(myMap, myKey, myValue, myQuantity, myColor) {

     // Ajout de la key et de la value dans la map
     myMap.set(myKey, myValue);
     // Envoie de la map dans le Local Storage
     localStorage.cart = JSON.stringify(Array.from(myMap.entries()));
     // Afficher le produit et les quantités ajoutés dans le panier
     window.alert(myQuantity + ' ' + infoProduct.name_product + ' de couleur ' + myColor + ' a bien été ajouté au panier');
     
}


// Fonction qui envoie les produits dans le local storage
function sendProductLocalStorage() {
    
    // Déclaration de la variable qui contient le choix de l'utilisateur pour la couleur
    let colorChoice = selectColors.value;

    // Ajout de cette propriété dans l'objet infoProduct
    infoProduct.color_product = colorChoice;

    // Ajout de l'id dans l'objet infoProduct
    infoProduct.id_product = idProduct;

    // Déclaration de la variable qui contient le choix de l'utilisateur pour la quantité
    let quantityProductChosen = quantityProduct.value;
    
    // On groupe la fiche produit avec la quantité selectionné dans l'obejt selectedProduct
    let selectedProduct = {
        quantity_product: parseInt(quantityProductChosen),
        info_product: infoProduct,
    }

    // On crée un nouvel ID en fonction de l'ID du produit et de sa couleur
    let idColorProduct = idProduct + '_' + colorChoice;


    // Si le Local Storage ne possède pas une key 'cart' 
    if(localStorage.getItem('cart') === null) {

        // Création d'une nouvelle map productCart
        let productCart = new Map();
        // Ajout de la key et de la value dans la map et envoie dans le Local Storage
        updateMap(productCart, idColorProduct, selectedProduct, quantityProductChosen, colorChoice);

    } 

    // Si le Local Storage possède déjà une key nommé 'cart'
    else {

        // Récupèration de la map déjà présente dans le local storage
        productCart = new Map(JSON.parse(localStorage.cart));

        // Si la key 'idColorProduc' est déjà existante dans la map
        if(productCart.has(idColorProduct)) {

            // Récupération de la propriété quantité
            let quantityCurrent = productCart.get(idColorProduct).quantity_product;
            // Somme de la quantité ancienne avec la nouvelle
            let quantityNew = quantityCurrent + parseInt(quantityProductChosen);

            // Si le total est supérieur à 100
            if (quantityNew > 100) {
                // Message d'alerte
                alert('Attention, vous avez déjà' + ' ' + quantityCurrent + ' ' + infoProduct.name_product +' de couleur ' + colorChoice +' dans le panier. Vous ne pouvez pas avoir une quantité total supérieur à 100 d\'un même produit. Vous pouvez ajouter maximum' + ' ' + (100 - quantityCurrent) + ' ' + infoProduct.name_product + ' de couleur ' + colorChoice + '.'); 
            }

            // Si le total est inférieur à 100
            else {
                // Maj de l'objet avec la nouvelle quantité
                selectedProduct = {
                    quantity_product: quantityNew,
                    info_product: infoProduct,
                }
                // Maj de la map et envoie dans le Local Storage
                updateMap(productCart, idColorProduct, selectedProduct, quantityProductChosen, colorChoice);
            }
        }

        // Si la key 'idColorProduct' n'est pas déjà existente dans la map
        else {
            // Ajout de la key dans la map avec sa value et envoie dans le Local Storage
            updateMap(productCart, idColorProduct, selectedProduct, quantityProductChosen, colorChoice);
        }

    }

    // Et dans tous les cas, remettre par défaut les valeurs des input/select
    selectColors.selectedIndex = 0;
    quantityProduct.value = 0;

}


// Lors du clic sur le bouton 'Ajouter au panier'
btnAddCart.addEventListener('click', (event)=>{
    
    // Empêcher le comportement par défaut du bouton (rafraichissement de la page)
    event.preventDefault();
    // Lancement de la fonction qui envoie les produits dans le Local Storage
    sendProductLocalStorage();     
    
})   

//--------------------------------------ENVOIE DES PRODUITS DANS LE LOCAL STORAGE---------------------------------------




//---------------------------------VERIFICATION DU FORM ET ACTIVATION DU BOUTON PANIER----------------------------------

// Fonction qui active le bouton panier
function activeBtnAddCart() {
    btnAddCart.disabled = false;
    btnAddCart.style.color = '';
    btnAddCart.style.backgroundColor = '';
    btnAddCart.style.pointerEvents = 'auto';
}


// Vérification que le form est correctement remplie afin d'activer le bouton panier
[selectColors, quantityProduct].forEach(function(element) {

    // Pour chacun des <input> on vérifie les valeurs remplies
    element.addEventListener('input', function() {

        // Si le choix des couleurs est fait
        if (selectColors.value) {
            // Et que la quantité choisie est entre 1 et 100, alors on active le bouton ajout au panier
            if (quantityProduct.value > 0 && quantityProduct.value <= 100) {
                activeBtnAddCart();
            }

        // Si le choix de la quantité choisie est entre 1 et 100
        } if (quantityProduct.value > 0 && quantityProduct.value <= 100 ) {
            // Et que le choix des couleurs est fait, alors on active le bouton ajout au panier
            if (selectColors.value) {
                activeBtnAddCart();
            }       
            
        // Si le choix de la quantité choisie est < 1 OU > 100 OU que la couleur n'est pas choisie, on désactive le bouton panier
        } if ((selectColors.value == 0 || quantityProduct.value < 1 || quantityProduct.value > 100)) {
            disableBtnAddCart();
        } 

    })
    
})

//---------------------------------VERIFICATION DU FORM ET ACTIVATION DU BOUTON PANIER----------------------------------




//----------------------------------------------------FICHE PRODUIT-----------------------------------------------------

// Fonction qui désactive le bouton panier
function disableBtnAddCart() {
    btnAddCart.disabled = true;
    btnAddCart.style.color = '#181818';
    btnAddCart.style.backgroundColor = '#939393';
    btnAddCart.style.pointerEvents = 'none';
}


// Fontion pour ajouter les options couleurs dans le select. En fonction du nombre d'élément dans le tableau colors, ma fonction ajoute une balise option
function createColorOption(data) {
    
    for(let i= 0; i < data.colors.length; i++) {
        // Déclaration de la variable qui va créer une balise <option>
        let colorsOption = document.createElement('option');
        // Ajout du texte
        colorsOption.innerText = data.colors[i];
        // Ajout de l'attribut valeur
        colorsOption.value = data.colors[i];
        // Création de la balise dans le HTML
        selectColors.appendChild(colorsOption);
    }
}


// Fonction qui crée les élements dans le HTML
function createElement(data) {

    // Déclaration de la variable qui va créer une balise <img>
    let productImg = document.createElement('img');
    // Ajout de la source de l'image correspondante au produit
    productImg.src = data.imageUrl;
    // Ajout de l'alt de l'image correspondante au produit
    productImg.alt = data.altTxt;
    // Création de la balise dans le HTML
    containerImg.appendChild(productImg);


    // Déclaration de la variable associé au HTML
    let productTitle = document.getElementById('title');
    // Ajout du texte, ici le nom du produit
    productTitle.innerText = data.name;


    // Déclaration de la variable associé au HTML
    let productPrice = document.getElementById('price');
    // Ajout du texte, ici le prix du produit
    productPrice.innerText = data.price;


    // Déclaration de la variable associé au HTML
    let productDescription = document.getElementById('description');
    // Ajout du texte, ici la descritption du produit
    productDescription.innerText = data.description;


    // Fonction qui crée les options de couleurs dans le select
    createColorOption(data);


    // Récupération des infos produits dans l'objet infoProduct
    infoProduct = {
        name_product: data.name,
        img_url: data.imageUrl,
        alt_txt: data.altTxt,
    }
   
}


// Fonction qui a partir des Data de l'API va pouvoir insérer les bonnes valeurs
function productSheet(product) {

    //  Création des élements dans le HTML
    createElement(product);
    //  Désactivation du bouton ajout au panier
    disableBtnAddCart();

}

//----------------------------------------------------FICHE PRODUIT-----------------------------------------------------




//-----------------------------------------------AU CHARGEMENT DE LA PAGE-----------------------------------------------

// Au chargement de la page, on va chercher les informations de l'API et on lance la fonction productSheet()
function init() {
    fetch('http://localhost:3000/api/products/' + idProduct, {
        method: 'GET',
        headers: {'Content-type': 'application/json;charset=UTF-8'}
    })
    .then(response => response.json())
    .then (data => productSheet(data))
    .catch(error => alert('Impossible de récupérer les datas de l\'API'));
}

// Au chargement de la page, lancement de la fonction init
init();

//-----------------------------------------------AU CHARGEMENT DE LA PAGE-----------------------------------------------