main();

function main() {
    getItems();
}

// récupere les caméras depuis l'API
function getItems() {
    fetch("http://localhost:5500/api/cameras")
        .then( function (response){
            return response.json();
        })
        .catch((error) => {
            let ItemsContainer = document.querySelector(".items-container");
            ItemsContainer.innerHTML = "Une erreur semble survenir, veuillez attendre quelques instant et réesseyer, <br> si le problème persite contacter nous.";
        })

// répartie les données des produits dans le DOM
        .then(function(resultAPI) {
            const items = resultAPI;
            console.log(items);
            for (let item in items) {
                let itemCard = document.createElement("div");
                document.querySelector(".items-container").appendChild(itemCard);
                itemCard.classList.add("card");

                let itemLink = document.createElement("a");
                itemCard.appendChild(itemLink);
                itemLink.href = `productpage.html?id=${resultAPI[item]._id}`;
                itemLink.classList.add("card__link");

                let itemImgDiv = document.createElement("div");
                itemLink.appendChild(itemImgDiv);
                itemImgDiv.classList.add("card__link__img");

                let itemImg = document.createElement("img");
                itemImgDiv.appendChild(itemImg);
                itemImg.classList.add("card__link__img__item");
                itemImg.src = resultAPI[item].imageUrl;

                let itemInfoDiv = document.createElement("div");
                itemLink.appendChild(itemInfoDiv);
                itemInfoDiv.classList.add("card__link__description");

                let itemTitle = document.createElement("h2");
                itemInfoDiv.appendChild(itemTitle);
                itemTitle.classList.add("card__link__description__title");
                itemTitle.innerHTML = resultAPI[item].name;

                let itemPrice = document.createElement("div");
                itemInfoDiv.appendChild(itemPrice);
                itemPrice.classList.add("card__link__description__price");
                // formatage du prix
                resultAPI[item].price = resultAPI[item].price / 100;
                itemPrice.innerHTML = new Intl.NumberFormat("fr-FR", {
                    style: "currency",
                    currency: "EUR",
                }).format(resultAPI[item].price);

                let itemDescription = document.createElement("p");
                itemInfoDiv.appendChild(itemDescription);
                itemDescription.classList.add("card__link__description__description");
                itemDescription.innerHTML = resultAPI[item].description;
                
            }
        });
}











