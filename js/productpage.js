let params = new URL(document.location).searchParams;
let id = params.get("id");

const productImg = document.querySelector(".item-card__img__cam");
const productTitle = document.querySelector(".item-card__info__title");
const productDescription = document.querySelector(".item-card__info__description");
const productPrice = document.querySelector(".item-card__info__price");
const productModel =  document.querySelector("#model-select");


main();

function main() {
    getItems();
}

function getItems() {
    fetch(`http://localhost:5500/api/cameras/${id}`)
        .then(function (response) {
            return response.json();
        })
        .catch((error) => {
            let ItemsContainer = document.querySelector(".item-card");
            ItemsContainer.innerHTML = "Une erreur semble survenir, veuillez attendre quelques instant et réesseyer, <br> si le problème persite contacter nous.";
        })

        // répartie les données du produit dans le DOM
        
        .then(function(resultAPI)  {
            article = resultAPI;
            productImg.src = article.imageUrl;
            productTitle.innerHTML = article.name;
            productDescription.innerText = article.description;

            // formatage du prix
            article.price = article.price / 100;
            productPrice.innerText = new Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "EUR",
            }).format(article.price);

            let modelSelect = document.getElementById("model-select");
            for (let i = 0; i < article.lenses.length; i++) {
                let option = document.createElement("option");
                option.innerText = article.lenses[i];
                option.value = article.lenses[i];
                modelSelect.appendChild(option);
            }
        });
}