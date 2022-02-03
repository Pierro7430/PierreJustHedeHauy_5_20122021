// Récupération de keys et paramètres dans l'url
let paramsString = window.location.search;
let searchParams = new URLSearchParams(paramsString);

// Récupération de la value de la key orderIdNumber avec la méthode GET (interface URLSearchParams)
let numberOrder = searchParams.get('orderIdNumber');

// Déclaration de la variable associée au HTML
let orderId = document.getElementById('orderId');

// Afficher le numéro de commande dans le HTML
orderId.innerText = numberOrder;