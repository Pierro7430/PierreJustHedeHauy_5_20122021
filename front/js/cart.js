//----------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------PANIER----------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------


//-----------------------------------------------VARIABLES NECESSAIRES--------------------------------------------------

// Déclaration de variables associées au HTML
let item = document.getElementById('cart__items');
let btnOrder = document.getElementById('order');
let quantityTotal = document.getElementById('totalQuantity');
let priceTotal = document.getElementById('totalPrice')

//----------------------------------------------------------------------------------------------------------------------




//----------------------------------------------AU CHARGEMENT DE LA PAGE------------------------------------------------

// La fonction se lance au chargement de la page
checkCart();

// La fonction vérifie le contenu du Local Storage
function checkCart() {

    // Si la key 'cart' n'existe pas
    if (localStorage.getItem('cart') === null) {

        // Le prix total est donc nul et on l'affiche dans le HTML
        priceTotal.innerText = 0;
        // La quantité totale est donc nulle et on l'affiche dans le HTML
        quantityTotal.innerText = 0;
        // On affiche une alerte indiquant que la panier est vide
        alert('le panier est vide');

    // Si la key 'cart' existe
    } if (localStorage.getItem('cart') != null) {

        // La fonction affiche le panier
        createCart();
        // La fonction affiche le total du prix et de la quantité
        createTotal();

    }

    // Dans tous les cas on désactive le bouton 'commander'
    disableBtnOrder()
    
}

//----------------------------------------------------------------------------------------------------------------------




//-------------------------------------------------AFFICHAGE DU PANIER--------------------------------------------------

// Fonction qui affiche les éléments dans le panier
function createCart() {

    // En fonction du nombre d'élément dans le Local Storage, la fonction effectue les tâches suivantes
    for (const [key, value] of getCart().entries()) {

        // Déclaration de la variable qui affiche les produits grâce à la fonction createCartItem(value)
        let cartItem = createCartItem(value);

        //--------------------------------------SUPPRESSION DES ITEMS DU PANIER-----------------------------------------
        
        // Déclaration de la variable qui va permettre de supprimer un produit
        let btnDelete = cartItem.querySelector('.cart__item__content__settings__delete');

        // Lors du clic sur la div 'btnDelete'
        btnDelete.onclick = function() { 

            // Fonction qui supprime la key associée dans le Local Storage
            removeArticleFromCart(key, cartItem);
            
        }

        //--------------------------------------------------------------------------------------------------------------




        //--------------------------------------MODIFICATION DES ITEMS DU PANIER----------------------------------------

        // Déclaration de la variable qui va permettre de modifier les quantités d'un produit
        let inputQuantity = cartItem.querySelector('.itemQuantity');
        // Déclaration de la variable qui va permettre d'afficher dans le HTML les quantités sélectionnées. PreviousSibling cible la div 'frere' qui précède
        let textQuantity = inputQuantity.previousSibling;
        
        // Lors de la modification de l'input 'inputQuantity'
        inputQuantity.addEventListener('input', function() {

            // Fonction qui les quantités pour chaque key unique
            modifyArticleFromCart(value, inputQuantity, textQuantity, key)
            
        })

        //--------------------------------------------------------------------------------------------------------------

    }

}


// Fonction qui récupère les informations dans le Local Storage
function getCart() {
    // Déclaration de la variable qui contient la map avec toutes les information du panier dans le local storage
    let productRegisterLocalStorage = new Map(JSON.parse(localStorage.cart));
    // La fonction retourne la variable
    return productRegisterLocalStorage;
}


// Fonction qui affiche tous les éléments nécessaires dans le HTML à chaque produit du panier
function createCartItem(value) {
    
    let itemArticle = createTagHTML(item, 'article', 'cart__item', value);
    itemArticle.dataset.id = value.info_product.id_product;
    itemArticle.dataset.color = value.info_product.color_product;

    let containerImg = createTagHTML(itemArticle, 'div', 'cart__item__img', value);

    let itemImg = createTagHTML(containerImg, 'img', null, value);

    let containerData = createTagHTML(itemArticle, 'div', 'cart__item__content', value);

    let containerDataDescription = createTagHTML(containerData, 'div', 'cart__item__content__description', value);

    let itemName = createTagHTML(containerDataDescription, 'h2', null, value);
    itemName.innerText = 'Nom : ' + value.info_product.name_product;

    let itemColor = createTagHTML(containerDataDescription, 'p', null, value);
    itemColor.innerText = 'Couleur : ' + value.info_product.color_product;

    let itemPrice = createTagHTML(containerDataDescription, 'p', null, value);
    itemPrice.innerText = 'Prix : ' + value.info_product.price_product + ' €';

    let containerSettings = createTagHTML(containerData, 'div', 'cart__item__content__settings', value);

    let containerSettingsQuantity = createTagHTML(containerSettings, 'div', 'cart__item__content__settings__quantity', value);

    let itemQuantity = createTagHTML(containerSettingsQuantity, 'p', null, value);
    itemQuantity.innerText = 'Quantité : ' + value.quantity_product;

    let inputItemQuantity = createTagHTML(containerSettingsQuantity, 'input', 'itemQuantity', value);
    inputItemQuantity.innerText = value.quantity_product;

    let containerSettingsDelete = createTagHTML(containerSettings, 'div', 'cart__item__content__settings__delete', value);

    let itemDelete = createTagHTML(containerSettingsDelete, 'p', 'deleteItem', value);
    itemDelete.innerText = 'supprimer';

    // La fonction retourne la variable contenant chaque nouveau produit affiché dans le HTML
    return itemArticle;

}


// Fonction qui permet de créer les différentes divs dans le HTML avec les bons paramètres
function createTagHTML(locationInHTML, tagHTML, classHTML, data) {

    // Déclaration de la variable qui va créer une balise
    element = document.createElement(tagHTML);

    // Si cette balise est une balise <img>, ajout des ces attributs
    if (tagHTML === 'img') {
        element.src = data.info_product.img_url;
        element.alt = data.info_product.alt_txt;
    }

    // Si cette balise est une balise <input>, ajout des ces attributs
    if (tagHTML === 'input') {
        element.value = data.quantity_product;
        element.type = 'number';
        element.name = 'itemQuantity';
        element.setAttribute('min', 1);
        element.setAttribute('max', 100);
    }

    // Si il y a un paramètre classHTML, la classe est ajoutée
    if (classHTML) {
        element.classList.add(classHTML);
    }

    // Emplacement dans le HTML de la création de la div
    locationInHTML.appendChild(element);

    // Retourne la variable car nécessaire ensuite pour créer une div fille
    return element;
    
}

//----------------------------------------------------------------------------------------------------------------------




//------------------------------------------DESACTIVATION DU BOUTON COMMANDER-------------------------------------------

// Fonction qui désactive le bouton 'commander'
function disableBtnOrder() {
    // Désactive le btn dans le HTML
    btnOrder.disabled = true;
    // Modification des couleurs et background du btn pour le rendre désactivé visuellement
    btnOrder.style.backgroundColor = '#939393';
    // Désactive tous les effets propres au btn dans le css
    btnOrder.style.pointerEvents = 'none';
}

//----------------------------------------------------------------------------------------------------------------------




//-------------------------------------------SUPPRESSION DES ITEMS DU PANIER--------------------------------------------

// Fonction qui supprime un produit du panier
function removeArticleFromCart(key, itemHTML) {

    // Déclaration de la variable contant les informations du panier
    let myCart = getCart();
    // Suppression de la key asssocié à l'item supprimé
    myCart.delete(key);

    // Si le panier est vide
    if (myCart.size == 0) {

        // La fonction supprime le panier
        deleteCart();

    // Dans le cas contraire
    } else {

        // Suppression du produit dans le HTML
        itemHTML.remove();
        // La fonction renvoie la map avec les keys restantes dans le Local Storage
        setCart(myCart);
        // La fonction recalcule le total du prix et des quantités
        createTotal();

    }
}


// Fonction qui supprime la map contenant les infos du panier lorsque celui-ci est vide et qui agit en conséquence sur le HTML
function deleteCart() {
    // Supression de la key 'cart'
    localStorage.removeItem('cart');
    // Supression dans le HTML de la div contenant tout le panier
    item.remove();
    // Affichage du total du prix à 0
    priceTotal.innerText = 0;
    // Affichage du total des quantités à 0
    quantityTotal.innerText = 0;
    // On désactive le bouton commander au cas ou il était activé
    disableBtnOrder();
    // On affiche une alerte indiquant que la panier est vide
    alert('le panier est vide');
}


// Fonction qui permet de renvoyer la map contenant les informations du panier dans le Local Storage
function setCart(map_cart) {
    localStorage.cart = JSON.stringify(Array.from(map_cart.entries()));
}

//----------------------------------------------------------------------------------------------------------------------




//------------------------------------------MODIFICATION DES ITEMS DU PANIER--------------------------------------------

function modifyArticleFromCart(value, inputQuantity, textQuantity, key) {

    // Déclaration de la variable qui contient les informations du Local Storage
    let myCart = getCart();
    // La quantity_product est modifiée à l'instant où on modifie sur l'input la quantité
    value.quantity_product = inputQuantity.value;

    // Si la quantité est inférieur à 1 ou supérieur à 100
    if(inputQuantity.value < 1 || inputQuantity.value > 100) {

        // Message d'alerte indiquant de choisir une quantité entre 1 et 100
        alert('Veuillez choisir une quantité entre 1 et 100')

        // Dans le cas contraire
    } else {

        // Maj de l'affichage de la quantité
        textQuantity.innerText = 'Quantité : ' + value.quantity_product;
        // Maj de la value de la map
        myCart.set(key, value);
        // Renvoie de la map dans le local storage
        setCart(myCart);
        // Maj du total du panier
        createTotal(); 

    }

}

//----------------------------------------------------------------------------------------------------------------------




//----------------------------------------------------TOTAL PANIER-------------------------------------------------------

// Fonction qui permet de faire le total des quantités et du prix
function createTotal() {

    // Déclaration d'un tableau pour les quantités
    let arrayQuantity = [0];

    // Déclaration d'un tableau pour les prix
    let arrayPrice = [0];
        
    // En fonction du nombre d'élément dans mon panier, ma fonction effectue les tâches suivantes pour chaque key unique
    for (const [key, value] of getCart().entries()) {

        // Récupération du prix pour un item. ParseInt permet de transformer une string en number
        let quantityCanape = parseInt(value.quantity_product);
        // Calcul du prix en fonction du nombre d'item ayant la même key
        let priceCanape = quantityCanape * value.info_product.price_product;
        // Placement de la valeur de la quantité dans le tableau correspondant
        arrayQuantity.push(quantityCanape);
        // Placement de la valeur du prix dans le tableau correspondant
        arrayPrice.push(priceCanape);

    }

    // Somme des quantités du tableau
    let reducerQuantity = (previousValue, currentValue) => previousValue + currentValue;
    // Affichage du total dans le HTML
    quantityTotal.innerText = arrayQuantity.reduce(reducerQuantity);

    // Somme des prix du tableau
    let reducerPrice = (previousValue, currentValue) => previousValue + currentValue;
    // Affichage du total dans le HTML
    priceTotal.innerText = arrayPrice.reduce(reducerPrice);

}

//----------------------------------------------------------------------------------------------------------------------







//----------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------FORMULAIRE--------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------


//-----------------------------------------------VARIABLES NECESSAIRES--------------------------------------------------

// Déclaration des variables contenant les informations clients associés au formulaire du HTML
let inputFirstName = document.getElementById('firstName');
let firstNameCustomer = inputFirstName.value;
let msgErrorFirstName = document.getElementById('firstNameErrorMsg');

let inputLastName = document.getElementById('lastName');
let lastNameCustomer = inputLastName.value;
let msgErrorLastName = document.getElementById('lastNameErrorMsg');

let inputAddress = document.getElementById('address');
let addressCustomer = inputAddress.value;
let msgErrorAddress = document.getElementById('addressErrorMsg');

let inputCity = document.getElementById('city');
let cityCustomer = inputCity.value;
let msgErrorCity = document.getElementById('cityErrorMsg');

let inputMail = document.getElementById('email');
let mailCustomer = inputMail.value;
let msgErrorMail = document.getElementById('emailErrorMsg');

// Récupération des valeurs de la fiche client dans un objet
let inputForm = [inputFirstName, inputLastName, inputAddress, inputCity, inputMail];

//----------------------------------------------------------------------------------------------------------------------




//------------------------------------VERIFICATION DE LA VALIDITE DU FORMULAIRE-----------------------------------------
inputForm.forEach(function(element) {

    // A chaque intéraction sur les input, vérification de la validité du form avec la fonction checkForm()
    element.addEventListener('input', function() {

        let firstName = checkForm(regExLetters, msgErrorFirstName, inputFirstName, 'Prénom');
        let name = checkForm(regExLetters, msgErrorLastName, inputLastName, 'Nom');
        let address = checkForm(regExLettersAndNumbers, msgErrorAddress, inputAddress, 'Adresse');
        let city = checkForm(regExLetters, msgErrorCity, inputCity, 'Nom de ville');
        let email = checkForm(regExMail, emailErrorMsg, inputMail, 'Mail');

        // Si tous les champs sont valides ET que le panier n'est pas vide
        if (firstName && name && address && city && email && localStorage.getItem('cart') != null) {

            // Activation du bouton 'commander'
            activeBtnOrder();
            // Récupérations des informations du formualaire dans un objet
            return customerInformations = {
                first_name_customer: inputFirstName.value,
                last_name_customer: inputLastName.value,
                address_customer: inputAddress.value,
                city_customer: inputCity.value,
                mail_customer:  inputMail.value,
            }
        }

        // Dans le cas contraire
        else {
            // Désactivation du bouton 'commander'
            disableBtnOrder();
        }
          
    })
})


// Contrôle de la validité des champs
function checkForm(regex, msgError, input, label) {

    // Si c'est valide, pas de message d'erreur
    if (regex(input.value)) {
        msgError.innerText = '';
        return true;

    // Si c'est vide, pas de message d'erreur
    } else if (input.value === '') {
        msgError.innerText = '';
        return false;

    // Si c'est invalide, message d'erreur à l'emplacement du champs concerné
    } else {
        msgError.innerText = label + ' invalide : caractères non autorisés';
        return false;
    } 
}


// Contrôle de la validité du formulaire pour des champs n'utilisant que des lettres
let regExLetters = (value) => {
    return /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\-]{3,50}$/.test(value);
}

// Contrôle de la validité du formulaire pour des champs n'utilisant que des lettres ou des chiffres
let regExLettersAndNumbers = (value) => {
    return /^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\-\s]{3,50}$/.test(value);
}

// Contrôle de la validité du formulaire pour des champs n'utilisant que des adresses mail
let regExMail = (value) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
}

//----------------------------------------------------------------------------------------------------------------------




//-------------------------------------------ACTIVATION DU BOUTON COMMANDER---------------------------------------------

// Fonction qui active le bouton 'commander'
function activeBtnOrder() {
    btnOrder.disabled = false;
    btnOrder.style.color = '';
    btnOrder.style.backgroundColor = '';
    btnOrder.style.pointerEvents = 'auto';
}


// Au clic sur le bouton 'commander'
btnOrder.addEventListener('click', (order) => {

    // Désactivation comportement par défaut (actualisation)
    order.preventDefault();
    // Envoie de la key 'info' qui contient les infos du formulaire dans le local storage et transformation du JS en JSON
    localStorage.setItem('info', JSON.stringify(customerInformations));
    // Déclaration de la variable qui contient un numéro unique qui servira de numéro de commande
    let orderNumber = Date.now() + Math.random()
    // L'ajout du '?' à la fin permet d'ajouter à la suite le numéro de commande à l'URL (methode GET)
    window.location.href = './confirmation.html?' + orderNumber;  

})  

//----------------------------------------------------------------------------------------------------------------------