
//déclaration de la variable qui contient les key et value dans le local storage
//on convertit le JSON en format JS
let productRegisterLocalStorage = JSON.parse(localStorage.getItem("productCart"));

console.log(productRegisterLocalStorage);

//si le local storage est vide
if (productRegisterLocalStorage === null) {
    alert("le panier est vide");

//si il y a 1 ou des élements dans le local storage
} else {
    createCart();
    createTotal();
}



//---------------------------------------AJOUT DES ELEMENTS DANS LE HTML---------------------------------------------

function createCart() {
    //en fonction du nombre d'élément dans le le tableau productRegisterLocalStorage, ma fonction effectue les tâches suivantes
    for(let i= 0; i < productRegisterLocalStorage.length; i++) {


        //on crée une balise article qui contiendra toutes les informations dynamiques du produit
        let itemArticle = document.createElement("article");
        //on ajoute une classe à la balise
        itemArticle.classList.add("cart__item");
        //on donne l'ID correspondant au produit choisi
        itemArticle.dataset.id = productRegisterLocalStorage[i].id_product;
        //on donne la couleur correspondant au produit choisi
        itemArticle.dataset.color = productRegisterLocalStorage[i].color_product;
        //Déclaration de la variable associée au HTML 
        let item = document.getElementById("cart__items");
        //on ajoute la balise dans le HTML
        item.appendChild(itemArticle);


            //on crée une balise div qui contient l'image du produit
            let containerImg = document.createElement("div");
            //on ajoute une classe à la balise
            containerImg.classList.add("cart__item__img");
            //on ajoute la balise dans le HTML
            itemArticle.appendChild(containerImg);


                //on crée une balise img pour l'image du produit
                let itemImg = document.createElement("img");
                //on donne la source de l'image correspondante au produit
                itemImg.src = productRegisterLocalStorage[i].img_url;
                //on donne l'alt de l'image correspondante au produit
                itemImg.alt = productRegisterLocalStorage[i].alt_txt;
                //on ajoute la balise dans le HTML
                containerImg.appendChild(itemImg);



            //on crée une balise div qui contient les informations du produit
            let containerData = document.createElement("div");
            //on ajoute une classe à la balise
            containerData.classList.add("cart__item__content");
            //on ajoute la balise dans le HTML
            itemArticle.appendChild(containerData);


                //on crée une balise div qui contient le nom, la couleur et le prix
                let containerDataDescription = document.createElement("div");
                //on ajoute une classe à la balise
                containerDataDescription.classList.add("cart__item__content__description");
                //on ajoute la balise dans le HTML
                containerData.appendChild(containerDataDescription);


                    //on crée une balise h2 pour le nom
                    let itemName = document.createElement("h2");
                    //on donne le nom correspondant au produit
                    itemName.innerText = productRegisterLocalStorage[i].name_product;
                    //on ajoute la balise dans le HTML
                    containerDataDescription.appendChild(itemName);

                    //on crée une balise p pour la couleur
                    let itemColor = document.createElement("p");
                    //on donne le nom correspondant au produit
                    itemColor.innerText = productRegisterLocalStorage[i].color_product;
                    //on ajoute la balise dans le HTML
                    containerDataDescription.appendChild(itemColor);

                    //on crée une balise p pour le prix
                    let itemPrice = document.createElement("p");
                    //on donne le nom correspondant au produit
                    itemPrice.innerText = productRegisterLocalStorage[i].price_product + "€";
                    //on ajoute la balise dans le HTML
                    containerDataDescription.appendChild(itemPrice);



            //on crée une balise div qui contient des infos complémentaires
            let containerSettings = document.createElement("div");
            //on ajoute une classe à la balise
            containerSettings.classList.add("cart__item__content__settings");
            //on ajoute la balise dans le HTML
            containerData.appendChild(containerSettings);


                //on crée une balise div qui contient les quantités
                let containerSettingsQuantity = document.createElement("div");
                //on ajoute une classe à la balise
                containerSettingsQuantity.classList.add("cart__item__content__settings__quantity");
                //on ajoute la balise dans le HTML
                containerSettings.appendChild(containerSettingsQuantity);


                    //on crée une balise p qui écrit les quantités
                    let itemQuantity = document.createElement("p");
                    //on donne les quantités choisis
                    itemQuantity.innerText = productRegisterLocalStorage[i].quantity_product;
                    //on ajoute la balise dans le HTML
                    containerSettingsQuantity.appendChild(itemQuantity);

                    //on crée une balise input qui écrit les quantités
                    let inputItemQuantity = document.createElement("input");
                    //on ajoute une classe à la balise
                    inputItemQuantity.classList.add("itemQuantity");
                    //on met les quantités choisis dans la value
                    inputItemQuantity.value = productRegisterLocalStorage[i].quantity_product;
                    //on met les quantités choisis dans la value
                    inputItemQuantity.type = "number";
                    //on met les quantités choisis dans la value
                    inputItemQuantity.name = "itemQuantity";
                    
                    //on ajoute la balise dans le HTML
                    containerSettingsQuantity.appendChild(inputItemQuantity);



                //on crée une balise div qui contient l'élement pour supprimer les items
                let containerSettingsDelete = document.createElement("div");
                //on ajoute une classe à la balise
                containerSettingsDelete.classList.add("cart__item__content__settings__delete");
                //on ajoute la balise dans le HTML
                containerSettings.appendChild(containerSettingsDelete);

                    //on crée une balise p de la div supprimer
                    let itemDelete = document.createElement("p");
                    //on ajoute une classe à la balise
                    itemDelete.classList.add("deleteItem");
                    //on met le texte
                    itemDelete.innerText = "Supprimer";
                    //on ajoute la balise dans le HTML
                    containerSettingsDelete.appendChild(itemDelete);



        //---------------------------------------MODIFICATION DES ITEMS DU PANIER---------------------------------------------
        
        
        //Ecouter l'input
        inputItemQuantity.addEventListener("change", (changeQuantity) => {
            //modification de l'objet dans le tableau
            productRegisterLocalStorage[i].quantity_product = inputItemQuantity.value;
            //On renvoie les produits dans le local storage
            localStorage.setItem("item", JSON.stringify(productRegisterLocalStorage));
            //on actualise la page
            window.location.href = "./cart.html";
        })


            
        //---------------------------------------SUPPRESSION DES ITEMS DU PANIER---------------------------------------------

        //à partir des éléments ajoutés précédemment au HTML, on a les fontions suivantes :                
        //au clic sur l'input qui gère les quantités

            //Ecouter le bouton delete
            itemDelete.addEventListener("click", (erase) => {
                //suppression de l'objet dans le tableau
                productRegisterLocalStorage.splice(productRegisterLocalStorage[i], 1);
                //On renvoie les produits dans le local storage
                localStorage.setItem("item", JSON.stringify(productRegisterLocalStorage));
                //on actualise la page
                window.location.href = "./cart.html";
        })       
    }
}





//-------------------------------------------------TOTAL PANIER------------------------------------------------------




function createTotal() {

    //on crée un tableau pour les quantités
    let arrayQuantity = [0];

    //on crée un tableau pour les prix
    let arrayPrice = [0];

    let quantityTotal = document.getElementById("totalQuantity");
    let priceTotal = document.getElementById("totalPrice")


    //en fonction du nombre d'élément dans le le tableau productRegisterLocalStorage, ma fonction effectue les tâches suivantes
    for(let i= 0; i < productRegisterLocalStorage.length; i++) {

        //parseInt permet de transformer une string en number
        let quantityCanape = parseInt(productRegisterLocalStorage[i].quantity_product);
        //on fait le calcul
        let priceCanape = quantityCanape * productRegisterLocalStorage[i].price_product;
        //on push le nombre de canapés dans le tableau correspondant
        arrayQuantity.push(quantityCanape);
        //on le prix des canapés dans le tableau correspondant
        arrayPrice.push(priceCanape);

    }

    //on fait le total des quantités
    let reducerQuantity = (previousValue, currentValue) => previousValue + currentValue;
    //on affiche le total dans le HTML
    quantityTotal.innerText = arrayQuantity.reduce(reducerQuantity);

    //on fait le total des prix
    let reducerPrice = (previousValue, currentValue) => previousValue + currentValue;
    //on affiche le total dans le HTML
    priceTotal.innerText = arrayPrice.reduce(reducerPrice);
}





//-------------------------------------------------FORMULAIRE------------------------------------------------------

let btnOrder = document.getElementById("order");

btnOrder.addEventListener("click", (order) => {
    //on désactive le comportement par défaut (actualisation)
    order.preventDefault();

    //déclaration des variables contenant les informations clients
    let firstName = document.getElementById("firstName");
    let firstNameCustomer = firstName.value;
    

    let lastName = document.getElementById("lastName");
    let lastNameCustomer = lastName.value;

    let address = document.getElementById("address");
    let addressCustomer = address.value;

    let city = document.getElementById("city");
    let cityCustomer = city.value;

    let mail = document.getElementById("email");
    let mailCustomer = mail.value;

    //Récupération des valeurs de la fiche client dans un objet
    let customerInformations = {
        first_name: firstNameCustomer,
        last_name: lastNameCustomer,
        address: addressCustomer,
        city : cityCustomer,
        mail: mailCustomer,
    }


    //controle de la validité du formulaire
    let regExLetters = (value) => {
        return /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\-]{3,20}$/.test(value);
    }

    let regExLettersNumbers = (value) => {
        return /^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\-\s]{3,20}$/.test(value);
    }

    let regExMail = (value) => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
    }

    //controle de la validité du prénom
    function checkFirstName() {
        let msgErrorFirstName = document.getElementById("firstNameErrorMsg");

        if (regExLetters(firstNameCustomer)) {
            msgErrorFirstName.innerText = "";
            return true;

        } else {
            msgErrorFirstName.innerText = "Nom invalide : caractères non autorisés";
            return false;
        } 
    }

    //controle de la validité du nom
    function checkLastName() {
        let msgErrorLastName = document.getElementById("lastNameErrorMsg");

        if (regExLetters(lastNameCustomer)) {
            msgErrorLastName.innerText = "";
            return true;

        } else {
            msgErrorLastName.innerText = "Nom invalide : caractères non autorisés";
            return false;
        } 
    }

    //controle de la validité de l'adresse
    function checkAddress() {
        let msgErrorAddress = document.getElementById("addressErrorMsg");

        if (regExLettersNumbers(addressCustomer)) {
            msgErrorAddress.innerText = "";
            return true;

        } else {
            msgErrorAddress.innerText = "Adresse invalide : caractères non autorisés";
            return false;
        } 
    }

    //controle de la validité de la ville
    function checkCity() {
        let msgErrorCity = document.getElementById("cityErrorMsg");

        if (regExLetters(cityCustomer)) {
            msgErrorCity.innerText = "";
            return true;

        } else {
            msgErrorCity.innerText = "Ville invalide : caractères non autorisés";
            return false;
        } 
    }

    //controle de la validité de l'adresse mail
    function checkMail() {
        let msgErrorMail = document.getElementById("emailErrorMsg");

        if (regExMail(mailCustomer)) {
            msgErrorMail.innerText = "";
            return true;

        } else {
            msgErrorMail.innerText = "Mail invalide";
            return false;
        } 
    }


    //si la validité du formulaire est conforme, alors il est envoyé dans le local storage
    if(checkFirstName() && checkLastName() && checkAddress() && checkCity() && checkMail()) {
        //envoie de la key "item" dans le local storage et transformation du JS en JSON
        localStorage.setItem("info", JSON.stringify(customerInformations));
        let orderNumber = Date.now() + Math.random()
        window.location.href = "./confirmation.html?" + orderNumber;
        
    //sinon message d'alerte
    }else {
        alert("Veuillez remplir correctement tous les champs du formulaire");
    }

})   


