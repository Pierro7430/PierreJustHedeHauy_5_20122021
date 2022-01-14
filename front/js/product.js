//recupération de la chaîne de requête dans l'url
let queryString_url_id = window.location.search;

//extraire uniquement l'id sans le '?'
let idProduct = queryString_url_id.slice(1);



//Déclaration des variables associées au HTML 
let containerImg = document.getElementsByClassName("item__img")[0];
let selectColors = document.getElementById("colors");
let btnAddCart = document.getElementById("addToCart");



//Ma fontion qui a partir des Data de l'API va pouvoir insérer les bonnes valeurs
function productSheet(product) {

    //-------------------------------FICHE PRODUIT-------------------------

    //déclaration de la variable pour une nouvelle balise img
    let productImg = document.createElement("img");
    //ajout de l'url source image
    productImg.src = product.imageUrl;
    //ajout de l'alt de l'image
    productImg.alt = product.altTxt;
    //création dans le html de la balise avec tous les éléments de la variable
    containerImg.appendChild(productImg);


    //déclaration de la variable pour la balise title
    let productTitle = document.getElementById("title");
    //changement du texte
    productTitle.innerText = product.name;


    //déclaration de la variable pour la div du prix
    let productPrice = document.getElementById("price");
    //changement du texte
    productPrice.innerText = product.price;


    //déclaration de la variable pour la div de la description
    let productDescription = document.getElementById("description");
    //changement du texte
    productDescription.innerText = product.description;

    //nouvelle fontion pour ajouter les options couleurs dans le select
    //en fonction du nombre d'élément dans le le tableau colors, ma fonction ajoute une balise option
    for(let i= 0; i < product.colors.length; i++) {
        //déclaration de la variable pour une nouvelle balise option
        let colorsOption = document.createElement("option");
        //changement du texte
        colorsOption.innerText = product.colors[i];
        //ajout de l'attribut valeur
        colorsOption.value = product.colors[i];
        //création dans le html de la balise avec tous les éléments de la variable
        selectColors.appendChild(colorsOption);
    }



    //-------------------------------AJOUTER AU PANIER-------------------------
    

    //Ecouter le bouton panier
    btnAddCart.addEventListener("click", (test)=>{
        //empêche le comportement par défaut du bouton (ici rafraichissement de la page)
        test.preventDefault();


        
        //déclaration de la variable qui contient le choix de l'utilisateur pour la couleur
        let colorChoice = selectColors.value;

        //vérificatiion que l'utilisateur a bien chsoisi une couleur
        if (colorChoice == "")
        {
            alert("Veuillez choisir une couleur pour votre canapé");
            return false;
        }



        //déclaration de la variable qui contient le choix de l'utilisateur pour le nombre de produit
        let quantityProduct = document.getElementById("quantity");
        let quantityProductChosen = quantityProduct.value;

        //ajout d'une regex qui oblige l'utilisateur à choisir une qyuantité entre 1 et 100;
        let regExQuantity = /^[1-9][0-9]?$|^100$/;


        //vérificatiion du regex sur la value quantité
        if (regExQuantity.test(quantityProductChosen))
        {
            console.log("la quantité est valide")
        }
        else
        {
            alert("Veuillez choisir une quantité entre 1 et 100");
            return false;
        }


     

        //Récupération des informations du produit dans un objet
        let infoProduct = {
            id_product: idProduct,
            name_product: product.name,
            color_product: colorChoice,
            price_product: product.price,
            img_url: product.imageUrl,
            alt_txt: product.altTxt,
        }

        //On groupe la fiche produit avec la quantité selectionné dans un objet
        let selectedProduct = {
            quantity_product: parseInt(quantityProductChosen),
            info_product: infoProduct,
        }

        //On crée un nouvelID en fonction de l'ID du produit et de sa couleur
        let idColorProduct = idProduct + "_" + colorChoice;


        //-------------------------------ENVOIE DANS LE LOCAL STORAGE-------------------------


        //Si le local storage est vide, alors on peut créer et envoyer la map dans le local storage
        if(localStorage.getItem("cart") === null) {
            let productCart = new Map();
            productCart.set(idColorProduct, selectedProduct);
            localStorage.cart = JSON.stringify(Array.from(productCart.entries()));
            console.log(productCart);

        //Sinon on récupère la map déjà présente dans le local storage
        }else{
            productCart = new Map(JSON.parse(localStorage.cart));

            //Si la key est déjà existante dans la map, on modifie les quantités et on renvoie la map dans le local storage
            if(productCart.has(idColorProduct)){

                //on récupère la propriété quantité
                let quantityCurrent = productCart.get(idColorProduct).quantity_product;

                //on l'additione à la nouvelle
                let quantityNew = quantityCurrent + parseInt(quantityProductChosen);

                //on mets à jour l'objet avec la nouvelle quantité
                selectedProduct = {
                    quantity_product: quantityNew,
                    info_product: infoProduct,
                }

                //on modifie la key
                productCart.set(idColorProduct, selectedProduct);

                //on renvoie la map dans le local storage
                localStorage.cart = JSON.stringify(Array.from(productCart.entries()));
            }

            //Sinon on ajoute la nouvelle key et on renvoie la map dans le local storage
            else{
                productCart.set(idColorProduct, selectedProduct);
                localStorage.cart = JSON.stringify(Array.from(productCart.entries()));
            }
            
        }

        //Afficher le produit et les quantités ajoutés dans le panier
        window.alert(quantityProductChosen + " " + product.name + " couleur " + colorChoice + " a bien été ajouté au panier");
        
    })   

}




fetch("http://localhost:3000/api/products/" + idProduct)
     .then(reponse => reponse.json())
     .then (data => productSheet(data))





    //  Si nouvel objet 
    //  si pas de tableau créé, alors créé un tableau puis ajouter l'objet
    //  si dejà un tableau, alors ajouter l'objet  dans le tableau
    //  si dejà un tableau et que l'objet similaire existe, alors additioner les quantités
