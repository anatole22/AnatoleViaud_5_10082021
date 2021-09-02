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
    checkIf404();
}

function checkIf404() {
    window.addEventListener("error", (e) => {
        let container = document.querySelector(".item-card");
        container.innerHTML = `<p>Cette page n'existe pas. <a class="back-to-home" href="index.html">Retourner dans la boutique</a></p>`;
        let backToHomeLink = document.querySelector(".back-to-home");
      },
      true
    );
  }

function getItems() {
    fetch(`http://localhost:3000/api/cameras/${id}`)
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
    const confirmation = document.querySelector(".nav__link__indicator")
    const textConfirmation = document.querySelector(".text-indicator")
    
    addBtn.addEventListener("click", () => {
        if (productNum.value > 0 && productNum.value < 100) {
// Création du produit ajouté au panier
let productAdded = {
    // img: productImg.src,
    name: productTitle.innerHTML,
    // description: productDescription.innerHTML,
    price: article.price,
    _id: id,
};

// Gestion du localstorage

let productinbasket = [];

if (localStorage.getItem("products") !== null){
    productinbasket = JSON.parse(localStorage.getItem("products"));
}

productinbasket.push(productAdded);
localStorage.setItem("products", JSON.stringify(productinbasket));

confirmation.style.visibility ="visible";
textConfirmation.innerHTML = `Vous avez ajouté un nouveau produit à votre panier !`;
setTimeout("location.reload(true);", 4000);
        }    
    })
}
