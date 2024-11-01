const btnProducts = document.getElementById("fetch");

btnProducts.addEventListener("click", async function (event) {
  event.preventDefault();
  fetch("/api/v1/products")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((products) => {
      console.log(products);
      const productsDiv = document.getElementById("products-container");
      const obj = JSON.stringify(products, null, 2);
      productsDiv.innerText = obj;
    })
    .catch((error) => console.error("Error fetching products:", error));
});
