let basket = document.querySelector(".basket");
let copyOfLS = JSON.parse(localStorage.getItem("product"));

main();

function main () {
    getFromBasket();
    totalInBasket();
    toEmptyBasket();
    checkFormAndPost();
}


function getFromBasket() {

let emptyBasket = document.querySelector(".basket__empty");

if (localStorage.getItem("product")) {
        emptyBasket.style.display = "none";
}

for (let produit in copyOfLS) {
   
    // let productImg = document.createElement("div");
    // basket.appendChild(productImg);
    // productImg.classList.add("basket__img");

    // let productPicture = document.createElement("img");
    // productImg.appendChild(productPicture);
    // productPicture.classList.add("basket__img__picture");
    // productPicture.src = copyOfLS[produit].img;

    let productInfo = document.createElement("div");
    basket.appendChild(productInfo);
    productInfo.classList.add("basket__info");

    let productName = document.createElement("h2");
    productInfo.appendChild(productName);
    productName.classList.add("basket__info__title");
    productName.innerHTML = copyOfLS[produit].name;

    // let productDescription = document.createElement("p");
    // productInfo.appendChild(productDescription);
    // productDescription.classList.add("basket__info__description");
    // productDescription.innerHTML = copyOfLS[produit].description;

    let productPrice = document.createElement("div");
    productInfo.appendChild(productPrice);
    productPrice.classList.add("basket__info__price");
    productPrice.innerHTML = new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",}).format(copyOfLS[produit].price);
    }
}

function totalInBasket () {
    let arrayOfPrice = [];
    let totalPrice = document.querySelector(".total__price");

    for (let price in copyOfLS) {
        arrayOfPrice.push(copyOfLS[price].price);
    }

    arrayOfPrice = arrayOfPrice.filter((el) => {
        return el != undefined;
    });

    
    arrayOfPrice = arrayOfPrice.map((x) => parseFloat(x));

    const reducer = (acc, curentVal) => acc + curentVal;
    arrayOfPrice = arrayOfPrice.reduce(reducer);

    totalPrice.innerText = `Total panier : ${(arrayOfPrice = new Intl.NumberFormat( "fr-FR", {
        style: "currency",
        currency: "EUR",
    }).format(arrayOfPrice))}`;
}

function toEmptyBasket() {
    const buttonEmpty = document.querySelector(".delet-basket");
    buttonEmpty.addEventListener("click", () => {
        localStorage.clear();
        location.reload(true);
    });
}

function checkFormAndPost() {

    const submit = document.querySelector(".form__button");
    let error = document.querySelector(".form__error");
    let firstName = document.querySelector("#firstName");
    let lastName = document.querySelector("#lastName");
    let address = document.querySelector("#address");
    let city = document.querySelector("#city");
    let email = document.querySelector("#email");

    submit.addEventListener("click", (e) => {
        if (
            !firstName.value ||
            !lastName.value ||
            !address.value ||
            !city.value ||
            !email.value
         ) {
            error.innerHTML = "Vous devez renseigner tous les champs !";
            e.preventDefault(); }

            else {
                let productsBought = [];
                productsBought.push(copyOfLS);

                const order = {
                    contact: {
                      firstName: firstName.value,
                      lastName: lastName.value,
                      city: city.value,
                      address: address.value,
                      email: email.value
                    },
                    products: productsBought,
                  };

                const options = {
                    method: "POST",
                    body: JSON.stringify(order),
                    headers: { "Content-Type": "application/json" },
                  };

                let priceConfirmation = document.querySelector(".total__price").innerText;
                priceConfirmation = priceConfirmation.split(" :");

                fetch("http://localhost:3000/api/teddies/order", options)
                .then((response) => response.json())
                .then((data) => {
                    localStorage.clear();
                    console.log(data)
                    localStorage.setItem("total", priceConfirmation[1]);
                    localStorage.setItem("orderId", data.orderId);

                    document.location.href = "thankspage.html";
                })
                .catch((err) => {
                    alert("Il y a une erreur : " + err);
                });
            }
    });
}