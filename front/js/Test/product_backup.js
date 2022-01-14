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
        test.preventDefault();

        //déclaration de la variable qui contient le choix de l'utilisateur pour la couleur
        let colorChoice = selectColors.value;

        //déclaration de la variable qui contient le choix de l'utilisateur pour le nombre de produit
        let quantityProduct = document.getElementById("quantity");
        let quantityProductChosen = quantityProduct.value;

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

        let productCart = new Map();
        productCart.set(idColorProduct, selectedProduct);

        
        
    
        //-------------------------------LOCAL STORAGE-------------------------

        // déclaration de la variable qui contient les key et value dans le local storage
        // on convertit le JSON en format JS
        let productRegisterLocalStorage = JSON.parse(localStorage.getItem("productCart"));
        console.log(productRegisterLocalStorage);
        
        // fonction qui ajoute un produit dans le local storage
        let addProductRegisterLocalStorage = () => {
            // ajout des value choisis par l'utilisateur dans le tableau de l'objet
            productRegisterLocalStorage.push(...productCart);

            // envoie de la key "item" dans le local storage et transformation du JS en JSON
            localStorage.productCart = JSON.stringify(productRegisterLocalStorage)
        };



        //si il y a des produits enregistrés dans le local storage
        if (productRegisterLocalStorage){
            //on lance la fonction qui ajoute les value dans le tableau
            addProductRegisterLocalStorage();
        }

        //si il n'y a pas de produits enregistrés dans le local storage
        else{
            //on crée d'abord le tableau, puis lance la fonction qui ajoute les value dans le tableau
            productRegisterLocalStorage = [];
            addProductRegisterLocalStorage();
        }







        

    //     la clé existe t elle deja dans ma map ?
    //     quantity = map.get("1_red")
    //     quantity = quantity + 2
    //     map.set("1_red", quantity)
    //   sinon :
    //     map.set("1_red", 2)



        // if (map.has(idColorProduct)){
        //    selectedProduct = map.get(idColorProduct)
        //    console.log (selectedProduct);


        // } else {
        //     map.set(idColorProduct, selectedProduct)
        // }

        // //-------------------------------LOCAL STORAGE-------------------------

        // // déclaration de la variable qui contient les key et value dans le local storage
        // // on convertit le JSON en format JS
        // let productRegisterLocalStorage = JSON.parse(localStorage.getItem("product"));

        
        // // fonction qui ajoute un produit dans le local storage
        // let addProductRegisterLocalStorage = () => {
        //     // ajout des value choisis par l'utilisateur dans le tableau de l'objet
        //     productRegisterLocalStorage.push(map);

        //     // envoie de la key "item" dans le local storage et transformation du JS en JSON
        //     localStorage.setItem("product", JSON.stringify(map))
        // };



        // //si il y a des produits enregistrés dans le local storage
        // if (productRegisterLocalStorage){
        //     //on lance la fonction qui ajoute les value dans le tableau
        //     addProductRegisterLocalStorage();
        // }

        // // else if (selectedProduct.id_product && selectedProduct.color_product){
            
        // // }

        // //si il n'y a pas de produits enregistrés dans le local storage
        // else{
        //     //on crée d'abord le tableau, puis lance la fonction qui ajoute les value dans le tableau
        //     productRegisterLocalStorage = [];
        //     addProductRegisterLocalStorage();
        // }
        window.alert(quantityProductChosen + " " + product.name + " couleur " + colorChoice + " a bien été ajouté au panier");


        

        

        
    })   



    
   //--------------------------------------------------------------------
}




fetch("http://localhost:3000/api/products/" + idProduct)
     .then(reponse => reponse.json())
     .then (data => productSheet(data))





    //  Si nouvel objet 
    //  si pas de tableau créé, alors créé un tableau puis ajouter l'objet
    //  si dejà un tableau, alors ajouter l'objet  dans le tableau
    //  si dejà un tableau et que l'objet similaire existe, alors additioner les quantités
