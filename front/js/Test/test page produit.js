function checkQuantity() {
    if (quantityProductChosen === null) {
        alert("Vous n'avez pas choisi de quantité");
        return false;

        
    }else if (quantityProductChosen < 0  && quantityProductChosen > 100){
        alert("Vous devez choisir une quantité entre 1 et 100");
        return false;
    }
    
    else {
        return true;
    }
}