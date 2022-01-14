//recupération de la chaîne de requête dans l'url
let queryString_url_order = window.location.search;

//extraire uniquement l'id sans le '?'
let numberOrder = queryString_url_order.slice(1);

let idOrder = document.getElementById("orderId");
idOrder.innerText = numberOrder;
