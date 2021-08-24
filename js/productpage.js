let params = new URL(document.location).searchParams;
let id = params.get("id");

const productImg = document.querySelector(".item-card__img__cam");
const productTitle = document.querySelector(".item-card__info__title");
const productDescription = document.querySelector(".item-card__info__description");
const productPrice = document.querySelector(".item-card__info__price");
const productModel =  document.querySelector("#model-select");
const productNum = document.querySelector("#camnum")
const addBtn = document.querySelector(".item-card__info__button");


main();

function main() {
    getItems();
    addToBasket();
}

function getItems() {
    fetch(`http://localhost:5500/api/cameras/${id}`)
        .then(function (response) {
            return response.json();
        })
        .catch((error) => {
            let ItemsContainer = document.querySelector(".item-card");
            ItemsContainer.innerHTML = "Une erreur semble survenir, veuillez attendre quelques instant et réessayer, <br> si le problème persite contacter nous.";
            ItemsContainer.style.textAlign = "center";
            ItemsContainer.style.padding = "10px";
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

function addToBasket() {
    
    addBtn.addEventListener("click", () => {
        if (productNum.value > 0 && productNum.value < 9) {
// Création du produit ajouté au panier
let productAdded = {
    name: productTitle.innerHTML,
    description: productDescription.innerHTML,
    price: parseFloat(productPrice.innerHTML),
    _id: id,
};

// Gestion du localstorage

let productinbasket = [];

productinbasket.push(productAdded);
localStorage.setItem("products", JSON.stringify(productAdded));
        }    
    })
}
