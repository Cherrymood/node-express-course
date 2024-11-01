import express from "express";
import data from "./data.js";

const app = express();
const port = 3000;

//middleware
app.use(express.static("./public"));

app.get("/api/v1/test", (req, res) => {
  res.json({ message: "It worked!" });
});

app.get(`/api/v1/products`, (req, res) => {
  res.json(data.products);
});

app.get(`/api/v1/products/:productID`, (req, res) => {
  const idProduct = parseInt(req.params.productID);

  const product = data.products.find((item) => item.id == idProduct);

  if (!product) {
    res.json("That product was not found.");
  } else {
    res.json(product);
  }
});

app.get("/api/v1/query", (req, res) => {
  const { search, limit, price } = req.query;
  console.log(search, limit);

  let searchProducts = data.products;

  if (search) {
    searchProducts = searchProducts.filter((product) =>
      product.name.toLowerCase().startsWith(search.toLowerCase())
    );
    if (!searchProducts) {
      res.json("There is no such product");
    }
  }

  if (price) {
    searchProducts = searchProducts.filter((product) => product.price < price);
    if (!searchProducts) {
      res.json("There is no such product");
    }
  }

  if (limit) {
    searchProducts = searchProducts.slice(0, parseInt(limit));
  }

  res.json(searchProducts);
});

// app.post();

app.all("*", (req, res) => {
  console.log("404 Error - Page Not Found");
  res.status(404).send("404 Error - Page Not Found");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
