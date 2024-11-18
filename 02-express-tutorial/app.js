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
  const productId = parseInt(req.params.productId);

  const product = data.products.find((item) => item.id == productId);

  res.status(404).json({ message: "That product was not found." });

  res.json(product);
});

app.get("/api/v1/query", (req, res) => {
  const { search, limit, price } = req.query;
  console.log(search, limit);

  let searchProducts = data.products;

  if (search) {
    searchProducts = searchProducts.filter((product) =>
      product.name.toLowerCase().startsWith(search.toLowerCase())
    );

    res.status(404).json({ message: "There is no such product" });
  }

  if (price) {
    searchProducts = searchProducts.filter((product) => product.price < price);

    res.status(404).json({ message: "That product was not found." });
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
