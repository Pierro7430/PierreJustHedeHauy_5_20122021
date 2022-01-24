//Récupération de la chaîne de requête dans l'url
let queryString_url_order = window.location.search;

//Extraire uniquement l'id sans le '?'
let numberOrder = queryString_url_order.slice(1);

//Déclaration de la variable associée au HTML
let idOrder = document.getElementById("orderId");

//Afficher le numéro de commande dans le HTML
idOrder.innerText = numberOrder;