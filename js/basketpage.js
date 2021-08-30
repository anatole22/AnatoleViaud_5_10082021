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

for (let products in copyOfLS) {
   
    let productImg = document.createElement("div");
    basket.appendChild(productImg);
    productImg.classList.add("basket__img");

    let productPicture = document.createElement("img");
    productImg.appendChild(productPicture);
    productPicture.classList.add("basket__img__picture");
    productPicture.src = copyOfLS[products].img;

    let productInfo = document.createElement("div");
    basket.appendChild(productInfo);
    productInfo.classList.add("basket__info");

    let productName = document.createElement("h2");
    productInfo.appendChild(productName);
    productName.classList.add("basket__info__title");
    productName.innerHTML = copyOfLS[products].name;

    let productDescription = document.createElement("p");
    productInfo.appendChild(productDescription);
    productDescription.classList.add("basket__info__description");
    productDescription.innerHTML = copyOfLS[products].description;

    let productPrice = document.createElement("div");
    productInfo.appendChild(productPrice);
    productPrice.classList.add("basket__info__price");
    productPrice.innerHTML = new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",}).format(copyOfLS[products].price);
    }
}

function totalInBasket () {
    let arrayOfPrice = [];
    let totalPrice = document.querySelector(".total__price");

    for (let price in copyOfLS) {
        arrayOfPrice.push(copyOfLS[price].price);
    }

    arrayOfPrice = arrayOfPrice.filter((el) => {
        return el !=undefined;
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
    let error = document.querySelector(".form__error")
    let inputFirstName = document.querySelector("#firstname");
    let inputLastName = document.querySelector("#lastname");
    let inputAddress = document.querySelector("#adress");
    let inputCity = document.querySelector("#city");
    let inputEmail = document.querySelector("#mail");

    submit.addEventListener("click", (e) => {
        if (
            !inputFirstName.value ||
            !inputLastName.value ||
            !inputAddress.value ||
            !inputCity.value ||
            !inputEmail.value
         ) {
            error.innerHTML = "Vous devez renseigner tous les champs !";
            e.preventDefault(); }

            else {
                let productsBought = [];
                productsBought.push(copyOfLS);

                const order = {
                    contact : {
                        firstName : inputFirstName.value,
                        lastName : inputLastName.value,
                        address : inputAddress.value,
                        city : inputCity.value,
                        email : inputEmail.value
                    },
                    products: productsBought,
                };

                const option = {
                    method: "POST",
                    body: JSON.stringify(order),
                    Headers: { "content-Type": "application/json" },
                };

                let priceConfirmation = document.querySelector(".total__price").innerText;
                priceConfirmation = priceConfirmation.split(" :");

                fetch("http://localhost:5500/api/cameras/order", option)
                .then((response) => response.json())
                .then((cameras) => {
                    localStorage.clear();
                    console.log(cameras);
                    localStorage.setItem("orderId", cameras.orderId);
                    localStorage.setItem("total", priceConfirmation[1]);

                    document.location.href = "thankspage.html";
                })
                .catch((err) => {
                    alert("Il y a une erreur : " + err);
                });
            }
    });
}