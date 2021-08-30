main();

function main() {
    displayOrder();
}

function displayOrder() {
    const totalOrder = document.querySelector(".total-order");
    const orderID = document.querySelector(".orderid")

    totalOrder.innerText = localStorage.getItem("total");
    orderID.innerText = localStorage.getItem("orderId");

    // localStorage.clear();
}